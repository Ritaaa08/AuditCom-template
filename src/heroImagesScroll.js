const heroSection = document.getElementById('heroSection');
const heroImagesWrapper = document.querySelector('.hero-images-wrapper');
const heroImages = document.querySelector('.hero-images');

if (!heroSection || !heroImagesWrapper || !heroImages) {
  console.warn('Éléments hero non trouvés');
}

let isInHeroSection = false;
let scrollProgress = 0;
let imageCount = 4; // Nombre d'images
let imageWidth = 524; // 500px min-width + 24px gap

const totalScrollDistance = (imageCount - 1) * imageWidth;

window.addEventListener('wheel', (e) => {
  if (!isInHeroSection) return;
  
  e.preventDefault();
  
  scrollProgress += e.deltaY * 0.8;
  scrollProgress = Math.max(0, Math.min(scrollProgress, totalScrollDistance));
  
  heroImages.style.transform = `translateX(-${scrollProgress}px)`;
}, { passive: false });

window.addEventListener('scroll', () => {
  if (!heroSection) return;
  
  const sectionTop = heroSection.getBoundingClientRect().top;
  const sectionBottom = heroSection.getBoundingClientRect().bottom;
  const windowHeight = window.innerHeight;
  
  // Vérifie si on est dans la section et si les images n'ont pas fini de défiler
  isInHeroSection = sectionTop < windowHeight && sectionBottom > 0 && scrollProgress < totalScrollDistance;
  
  if (isInHeroSection) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
}, { passive: true });

// Reset quand on quitte la section
window.addEventListener('beforeunload', () => {
  document.body.style.overflow = 'auto';
});