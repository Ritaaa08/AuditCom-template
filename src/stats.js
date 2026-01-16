// Statistics data
const statsData = [
  {
    value: 8,
    label: "EcoIndex",
    description: "Score alarmant de certains clubs professionnels (Yverdon Sport FC), soulignant une structure web extrêmement énergivore."
  },
  {
    value: 2200,
    label: "Backlinks",
    description: "Nombre impressionnant de liens retour pour des clubs historiques comme le SR Delémont, témoignant d'une autorité numérique bâtie sur 30 ans."
  },
  {
    value: 71.11,
    label: "Trafic Mobile",
    description: "Part du trafic mobile pour un club comme le Lancy FC, rendant l'optimisation \"Mobile-First\" absolument vitale pour l'engagement des supporters.",
    unit: "%"
  },
  {
    value: 29,
    label: "Temps de Chargement",
    description: "Temps critique observé sur certains sites (US Terre Sainte), un frein majeur à la rétention des utilisateurs.",
    unit: "s"
  }
];

// Initialize statistics section
function initStats() {
  const statsContainer = document.getElementById('statisticsContainer');
  
  if (!statsContainer) return;

  // Create observer for scroll animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        animateCounters();
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(statsContainer);
}

// Animate counter numbers
function animateCounters() {
  const counters = document.querySelectorAll('.stats-value');
  
  counters.forEach(counter => {
    const finalValue = parseFloat(counter.getAttribute('data-value'));
    const isFloat = counter.getAttribute('data-float') === 'true';
    const duration = 1500; // ms
    const startTime = Date.now();

    function updateCounter() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = finalValue * easeProgress;

      if (isFloat) {
        counter.textContent = currentValue.toFixed(2);
      } else {
        counter.textContent = Math.floor(currentValue);
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = isFloat ? finalValue.toFixed(2) : finalValue;
      }
    }

    updateCounter();
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initStats);