(function () {
  "use strict";

  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  const prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    canvas.style.display = "none";
    return;
  }

  const THREE_URL =
    "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

  import(THREE_URL)
    .then((THREE) => initScene(THREE))
    .catch(() => {
      canvas.style.display = "none";
    });

  function initScene(THREE) {
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 4.2;

    const group = new THREE.Group();
    scene.add(group);

    const wireMat = new THREE.LineBasicMaterial({
      color: 0x3dd6c6,
      transparent: true,
      opacity: 0.35,
    });
    const geo = new THREE.IcosahedronGeometry(1.15, 1);
    const edges = new THREE.EdgesGeometry(geo);
    const mainWire = new THREE.LineSegments(edges, wireMat);
    group.add(mainWire);

    const innerGeo = new THREE.IcosahedronGeometry(0.55, 0);
    const innerEdges = new THREE.EdgesGeometry(innerGeo);
    const innerMat = new THREE.LineBasicMaterial({
      color: 0x5eead4,
      transparent: true,
      opacity: 0.5,
    });
    const innerWire = new THREE.LineSegments(innerEdges, innerMat);
    group.add(innerWire);

    const particleCount = 420;
    const positions = new Float32Array(particleCount * 3);
    const spread = 5.5;
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }
    const baseY = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      baseY[i] = positions[i * 3 + 1];
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const pMat = new THREE.PointsMaterial({
      color: 0x8b9cb3,
      size: 0.028,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    const ambient = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambient);

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    resize();
    window.addEventListener("resize", resize);

    let pointerX = 0;
    let pointerY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let targetRotZ = 0;
    let velX = 0;
    let velY = 0;
    let lastPx = 0;
    let lastPy = 0;
    let hasPointerSample = false;

    function onPointerMove(clientX, clientY) {
      const nx = (clientX / w) * 2 - 1;
      const ny = (clientY / h) * 2 - 1;
      if (hasPointerSample) {
        const dx = nx - lastPx;
        const dy = ny - lastPy;
        velX = velX * 0.82 + dx * 18;
        velY = velY * 0.82 + dy * 18;
      }
      lastPx = nx;
      lastPy = ny;
      hasPointerSample = true;
      pointerX = nx;
      pointerY = ny;
      targetRotY = nx * 0.55;
      targetRotX = ny * 0.38;
      targetRotZ = nx * ny * 0.22 + velX * 0.04 - velY * 0.03;
    }

    window.addEventListener(
      "pointermove",
      (e) => {
        onPointerMove(e.clientX, e.clientY);
      },
      { passive: true }
    );

    const clock = new THREE.Clock();
    let rafId = 0;
    let running = false;

    function tick() {
      rafId = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      velX *= 0.92;
      velY *= 0.92;

      group.rotation.y += (targetRotY - group.rotation.y) * 0.055;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.055;
      group.rotation.z += (targetRotZ - group.rotation.z) * 0.06;

      const innerTargetX = pointerY * 1.35 + velY * 0.012;
      const innerTargetY = -pointerX * 1.35 - velX * 0.012;
      innerWire.rotation.x += (innerTargetX - innerWire.rotation.x) * 0.07;
      innerWire.rotation.y += (innerTargetY - innerWire.rotation.y) * 0.07;

      const flow = pointerX * 2.2 + pointerY * 1.4;
      const speedBoost = Math.min(
        1,
        Math.hypot(velX, velY) * 0.08
      );
      const amp = 0.1 + speedBoost * 0.14;
      const pos = pGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        pos[ix + 1] =
          baseY[i] +
          Math.sin(t * 0.35 + i * 0.07 + flow) * amp;
      }
      pGeo.attributes.position.needsUpdate = true;

      const pointsTargetY = pointerX * 0.95 + velX * 0.015;
      points.rotation.y += (pointsTargetY - points.rotation.y) * 0.05;
      points.rotation.x += (pointerY * 0.25 - points.rotation.x) * 0.04;

      if (!document.hidden) {
        renderer.render(scene, camera);
      }
    }

    function startLoop() {
      if (running) return;
      running = true;
      tick();
    }

    startLoop();

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
        running = false;
      } else {
        startLoop();
      }
    });
  }
})();
