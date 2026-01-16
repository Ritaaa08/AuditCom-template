const heroSection = document.getElementById("heroSection");
const imagesWrapper = document.querySelector(".hero-images-wrapper");
const imagesColumn = document.querySelector(".hero-images");

if (heroSection && imagesWrapper && imagesColumn) {
    let maxScroll = 0;

    function updateMeasurements() {
        const columnHeight = imagesColumn.scrollHeight;
        const wrapperHeight = imagesWrapper.clientHeight;
        maxScroll = Math.max(columnHeight - wrapperHeight, 0);
    }

    function onScroll() {
        const rect = heroSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Si la section n’est pas visible → on ne fait rien
        if (rect.bottom <= 0 || rect.top >= viewportHeight) return;

        // Progression de 0 (section en bas de l’écran) à 1 (section en haut)
        const visibleHeight = viewportHeight + rect.height;
        const progress = 1 - (rect.bottom / visibleHeight);
        const clamped = Math.min(Math.max(progress, 0), 1);

        // Easing type smoothstep
        const eased = clamped * clamped * (3 - 2 * clamped);

        const translateY = -maxScroll * eased;
        imagesColumn.style.transform = `translateY(${translateY}px)`;
    }

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", updateMeasurements);
    window.addEventListener("load", () => {
        updateMeasurements();
        onScroll();
    });
}
