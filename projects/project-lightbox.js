(function () {
  "use strict";

  const root = document.getElementById("project-lightbox");
  if (!root) return;

  const stage = root.querySelector("[data-lightbox-stage]");
  const pan = root.querySelector("[data-lightbox-pan]");
  const img = root.querySelector("[data-lightbox-img]");
  const videoEl = root.querySelector("[data-lightbox-video]");
  const captionEl = root.querySelector(".project-lightbox-caption");
  const dialog = root.querySelector(".project-lightbox-dialog");
  const zoomLabel = root.querySelector(".project-lightbox-zoom-pct");
  const zoomToolbar = root.querySelector("[data-lightbox-zoom-toolbar]");
  const btnPrev = root.querySelector("[data-gallery-prev]");
  const btnNext = root.querySelector("[data-gallery-next]");
  const counterEl = root.querySelector("[data-lightbox-counter]");

  const galleryRoot = document.querySelector("[data-project-gallery]");
  const galleryItems = galleryRoot
    ? Array.from(galleryRoot.querySelectorAll(".project-gallery-item"))
    : [];

  const ZOOM_MIN = 1;
  const ZOOM_MAX = 4;
  const ZOOM_STEP = 1.18;
  const WHEEL_SENS = 0.11;

  let scale = 1;
  let tx = 0;
  let ty = 0;
  let dragging = false;
  let dragId = null;
  let startX = 0;
  let startY = 0;
  let startTx = 0;
  let startTy = 0;

  let pinchStartDist = 0;
  let pinchStartScale = 1;

  let lastFocus = null;
  let isOpen = false;
  let useGallery = false;
  let galleryIndex = 0;

  function readItem(btn) {
    const type = btn.getAttribute("data-gallery-type") || "image";
    const src = btn.getAttribute("data-gallery-src") || "";
    const caption = btn.getAttribute("data-gallery-caption") || "";
    const alt = btn.getAttribute("data-gallery-alt") || "";
    const poster = btn.getAttribute("data-gallery-poster") || "";
    return { type, src, caption, alt, poster };
  }

  function pauseAndClearVideo() {
    if (!videoEl) return;
    try {
      videoEl.pause();
    } catch (_) {}
    videoEl.removeAttribute("src");
    videoEl.removeAttribute("poster");
    try {
      videoEl.load();
    } catch (_) {}
  }

  function isVideoMode() {
    return dialog && dialog.classList.contains("project-lightbox--video");
  }

  function fmtPct() {
    if (zoomLabel) zoomLabel.textContent = Math.round(scale * 100) + "%";
  }

  function applyTransform() {
    if (!pan || isVideoMode()) return;
    pan.style.transform =
      "translate(" + tx + "px," + ty + "px) scale(" + scale + ")";
    fmtPct();
    if (stage) {
      stage.classList.toggle("is-pannable", scale > 1.02);
    }
  }

  function resetView() {
    scale = 1;
    tx = 0;
    ty = 0;
    applyTransform();
  }

  function setZoom(next) {
    if (isVideoMode()) return;
    const clamped = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, next));
    if (clamped === scale) return;
    scale = clamped;
    if (scale <= 1.01) {
      tx = 0;
      ty = 0;
    }
    applyTransform();
  }

  function updateNavUi() {
    const n = galleryItems.length;
    const showNav = useGallery && n > 1;
    if (btnPrev) {
      btnPrev.hidden = !showNav;
      btnPrev.disabled = !showNav || galleryIndex <= 0;
    }
    if (btnNext) {
      btnNext.hidden = !showNav;
      btnNext.disabled = !showNav || galleryIndex >= n - 1;
    }
    if (counterEl) {
      if (showNav) {
        counterEl.hidden = false;
        counterEl.textContent = galleryIndex + 1 + " / " + n;
      } else {
        counterEl.hidden = true;
        counterEl.textContent = "";
      }
    }
  }

  function setCaptionAndAria(cap) {
    if (captionEl) {
      captionEl.textContent = cap;
      captionEl.hidden = !cap;
    }
    if (dialog) {
      if (cap) dialog.setAttribute("aria-describedby", "lightbox-caption");
      else dialog.removeAttribute("aria-describedby");
    }
  }

  function setStageAria(isVideo) {
    if (!stage) return;
    if (isVideo) {
      stage.setAttribute(
        "aria-label",
        "Video preview with playback controls"
      );
    } else {
      stage.setAttribute(
        "aria-label",
        "Image preview. Draggable when zoomed. Scroll wheel zooms."
      );
    }
  }

  function showSlide(index) {
    const btn = galleryItems[index];
    if (!btn || !img) return;
    const item = readItem(btn);
    pauseAndClearVideo();
    resetView();

    if (item.type === "video") {
      dialog.classList.add("project-lightbox--video");
      if (zoomToolbar) zoomToolbar.setAttribute("hidden", "");
      img.hidden = true;
      img.removeAttribute("src");
      img.alt = "";
      if (videoEl) {
        videoEl.hidden = false;
        if (item.poster) videoEl.setAttribute("poster", item.poster);
        else videoEl.removeAttribute("poster");
        videoEl.src = item.src;
        try {
          videoEl.load();
        } catch (_) {}
      }
      pan.style.transform = "translate(0px,0px) scale(1)";
      if (stage) stage.classList.remove("is-pannable", "is-dragging");
      setStageAria(true);
    } else {
      dialog.classList.remove("project-lightbox--video");
      if (zoomToolbar) zoomToolbar.removeAttribute("hidden");
      if (videoEl) {
        videoEl.hidden = true;
      }
      img.hidden = false;
      img.src = item.src;
      img.alt = item.alt;
      fmtPct();
      setStageAria(false);
    }

    setCaptionAndAria(item.caption);
    updateNavUi();
  }

  function openGalleryAt(button) {
    const idx = galleryItems.indexOf(button);
    if (idx < 0 || !img) return;
    useGallery = true;
    galleryIndex = idx;
    lastFocus = button;
    showSlide(galleryIndex);
    openShell();
    const closeBtn = root.querySelector(".project-lightbox-close");
    if (closeBtn) closeBtn.focus();
  }

  function openStandalone(trigger) {
    if (!img || !trigger) return;
    useGallery = false;
    lastFocus = trigger;
    pauseAndClearVideo();
    resetView();
    dialog.classList.remove("project-lightbox--video");
    if (zoomToolbar) zoomToolbar.removeAttribute("hidden");
    if (videoEl) {
      videoEl.hidden = true;
    }
    img.hidden = false;
    const src = trigger.currentSrc || trigger.getAttribute("src") || "";
    const alt = trigger.getAttribute("alt") || "";
    const cap =
      trigger.getAttribute("data-caption") || trigger.getAttribute("alt") || "";
    img.src = src;
    img.alt = alt;
    setCaptionAndAria(cap);
    updateNavUi();
    setStageAria(false);
    openShell();
    const closeBtn = root.querySelector(".project-lightbox-close");
    if (closeBtn) closeBtn.focus();
  }

  function openShell() {
    root.hidden = false;
    root.classList.add("is-open");
    root.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    isOpen = true;
  }

  function closeLightbox() {
    if (!isOpen) return;
    root.classList.remove("is-open");
    root.hidden = true;
    root.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    isOpen = false;
    useGallery = false;
    pauseAndClearVideo();
    dialog.classList.remove("project-lightbox--video");
    if (zoomToolbar) zoomToolbar.removeAttribute("hidden");
    if (img) {
      img.removeAttribute("src");
      img.alt = "";
      img.hidden = false;
    }
    if (videoEl) {
      videoEl.hidden = true;
    }
    if (btnPrev) btnPrev.hidden = true;
    if (btnNext) btnNext.hidden = true;
    if (counterEl) {
      counterEl.hidden = true;
      counterEl.textContent = "";
    }
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
    lastFocus = null;
  }

  function goRelative(delta) {
    if (!useGallery || galleryItems.length < 2) return;
    const next = galleryIndex + delta;
    if (next < 0 || next >= galleryItems.length) return;
    galleryIndex = next;
    showSlide(galleryIndex);
  }

  function getFocusable() {
    if (!dialog) return [];
    return Array.from(
      dialog.querySelectorAll(
        'button:not([disabled]):not([hidden]), [href]:not([hidden]), input:not([disabled]):not([hidden]), select:not([disabled]):not([hidden]), textarea:not([disabled]):not([hidden]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter(
      (el) =>
        el.offsetParent !== null ||
        (el.getClientRects && el.getClientRects().length)
    );
  }

  function trapTab(e) {
    if (e.key !== "Tab" || !isOpen) return;
    const nodes = getFocusable();
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function onDocKeydown(e) {
    if (!isOpen) return;
    if (e.key === "Escape") {
      e.preventDefault();
      closeLightbox();
      return;
    }
    if (useGallery && galleryItems.length > 1) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goRelative(-1);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goRelative(1);
        return;
      }
    }
    trapTab(e);
  }

  root.querySelectorAll("[data-lightbox-close]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      closeLightbox();
    });
  });

  const btnIn = root.querySelector("[data-zoom-in]");
  const btnOut = root.querySelector("[data-zoom-out]");
  const btnReset = root.querySelector("[data-zoom-reset]");
  if (btnIn) btnIn.addEventListener("click", () => setZoom(scale * ZOOM_STEP));
  if (btnOut) btnOut.addEventListener("click", () => setZoom(scale / ZOOM_STEP));
  if (btnReset) btnReset.addEventListener("click", () => resetView());

  if (btnPrev) btnPrev.addEventListener("click", () => goRelative(-1));
  if (btnNext) btnNext.addEventListener("click", () => goRelative(1));

  if (dialog) {
    dialog.addEventListener(
      "wheel",
      (e) => {
        if (!isOpen || isVideoMode()) return;
        if (e.target.closest && e.target.closest(".project-lightbox-toolbar")) {
          return;
        }
        e.preventDefault();
        const dir = e.deltaY > 0 ? -1 : 1;
        const factor = 1 + dir * WHEEL_SENS;
        setZoom(scale * factor);
      },
      { passive: false }
    );
  }

  if (stage) {
    stage.addEventListener("pointerdown", (e) => {
      if (!isOpen || isVideoMode() || scale <= 1.02) return;
      if (e.button !== 0) return;
      const t = e.target;
      if (t.closest("button") || t.closest("video")) return;
      dragging = true;
      dragId = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      startTx = tx;
      startTy = ty;
      try {
        stage.setPointerCapture(e.pointerId);
      } catch (_) {}
      stage.classList.add("is-dragging");
    });

    stage.addEventListener("pointermove", (e) => {
      if (!dragging || e.pointerId !== dragId) return;
      tx = startTx + (e.clientX - startX);
      ty = startTy + (e.clientY - startY);
      applyTransform();
    });

    function endDrag(e) {
      if (e.pointerId !== dragId) return;
      dragging = false;
      dragId = null;
      stage.classList.remove("is-dragging");
      try {
        stage.releasePointerCapture(e.pointerId);
      } catch (_) {}
    }

    stage.addEventListener("pointerup", endDrag);
    stage.addEventListener("pointercancel", endDrag);

    stage.addEventListener(
      "touchstart",
      (e) => {
        if (isVideoMode()) return;
        if (e.touches.length === 2) {
          const a = e.touches[0];
          const b = e.touches[1];
          pinchStartDist = Math.hypot(
            b.clientX - a.clientX,
            b.clientY - a.clientY
          );
          pinchStartScale = scale;
        }
      },
      { passive: true }
    );

    stage.addEventListener(
      "touchmove",
      (e) => {
        if (isVideoMode()) return;
        if (e.touches.length === 2 && pinchStartDist > 0) {
          e.preventDefault();
          const a = e.touches[0];
          const b = e.touches[1];
          const d = Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
          const ratio = d / pinchStartDist;
          setZoom(pinchStartScale * ratio);
        }
      },
      { passive: false }
    );

    stage.addEventListener("touchend", (e) => {
      if (e.touches.length < 2) {
        pinchStartDist = 0;
      }
    });
  }

  if (img) {
    img.addEventListener("dblclick", () => {
      if (isOpen && !isVideoMode()) resetView();
    });
  }

  document.addEventListener("keydown", onDocKeydown);

  galleryItems.forEach((btn) => {
    btn.addEventListener("click", () => openGalleryAt(btn));
  });

  document.querySelectorAll(".project-zoom-trigger").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      openStandalone(el);
    });
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openStandalone(el);
      }
    });
  });
})();
