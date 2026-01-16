const hero = document.getElementById("heroContent");
const heroInner = document.querySelector(".heroContent-inner");

function onScroll() {
    if (!hero || !heroInner) return;

    const rect = hero.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Progression de scroll dans la section hero (0 en haut, 1 en bas)
    const progress = Math.min(Math.max((0 - rect.top) / viewportHeight, 0), 1);

    // Scale de 1 à 0.7
    const scale = 1 - progress * 0.3;

    // Opacité de 1 à 0.2
    const opacity = 1 - progress * 0.8;

    heroInner.style.transform = `scale(${scale}) translateY(${progress * 40}px)`;
    heroInner.style.opacity = opacity.toString();
}

window.addEventListener("scroll", onScroll);
