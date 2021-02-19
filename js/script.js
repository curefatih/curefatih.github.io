(function () {
    feather.replace()
    document.addEventListener("DOMContentLoaded", () => {
        setTimeout(() => {
            document.querySelector("#loader").classList.add("hide");
            document.body.classList.remove("locked");
        }, 500)
    }, false);
})()
