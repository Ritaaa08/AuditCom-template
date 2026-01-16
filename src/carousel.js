// Carousel initialization
let teamsData = [];

async function initCarousel() {
  // Wait for teams data to be available in the DOM
  await waitForTeamsData();
  
  if (teamsData.length === 0) {
    console.warn('No teams data found in teamList');
    return;
  }

  renderCarousels();
}

// Wait for teams data to be populated by main.js
function waitForTeamsData() {
  return new Promise((resolve) => {
    const checkData = setInterval(() => {
      const teamList = document.getElementById('teamList');
      const articles = teamList?.querySelectorAll('article');
      
      if (articles && articles.length > 0) {
        extractTeamsData();
        clearInterval(checkData);
        resolve();
        return;
      }
    }, 100);

    // Timeout after 10 seconds
    setTimeout(() => {
      clearInterval(checkData);
      resolve();
    }, 10000);
  });
}

// Extract teams data from DOM
function extractTeamsData() {
  const teamArticles = document.querySelectorAll('#teamList article');
  teamsData = Array.from(teamArticles).map(article => {
    const img = article.querySelector('img');
    // Récupère le src actuel ou data-bind-attr-src
    const logoUrl = img?.src || img?.getAttribute('data-bind-attr-src') || '';
    const teamName = article.querySelector('h2')?.textContent || 'Unknown';
    
    return {
      teamName: teamName,
      logoUrl: logoUrl,
      uploadedAt: article.querySelector('p:nth-of-type(1)')?.textContent || '',
      author: article.querySelector('p:nth-of-type(2)')?.textContent || ''
    };
  });
  
  console.log('Teams data extracted:', teamsData.length, 'teams');
}

// Render carousels
function renderCarousels() {
  const carouselContainer = document.getElementById('carouselContainer');
  
  if (!carouselContainer) {
    console.warn('carouselContainer not found');
    return;
  }

  // Duplicate data for seamless looping
  const duplicatedData = [...teamsData, ...teamsData];
  const itemWidth = 150; // width of carousel-item
  const gap = 30; // gap between items
  const totalWidth = teamsData.length * (itemWidth + gap);

  // First carousel - scrolls left to right
  const carousel1 = document.createElement('div');
  carousel1.className = 'carousel carousel-1';
  carousel1.style.setProperty('--item-count', teamsData.length);
  carousel1.style.setProperty('--total-width', `${totalWidth}px`);
  carousel1.innerHTML = duplicatedData
    .map(team => `
      <div class="carousel-item">
        ${team.logoUrl ? `<img src="${team.logoUrl}" alt="${team.teamName}" title="${team.teamName}">` : ''}
        <span class="carousel-label">${team.teamName}</span>
      </div>
    `)
    .join('');

  // Second carousel - scrolls right to left
  const carousel2 = document.createElement('div');
  carousel2.className = 'carousel carousel-2';
  carousel2.style.setProperty('--item-count', teamsData.length);
  carousel2.style.setProperty('--total-width', `${totalWidth}px`);
  carousel2.innerHTML = duplicatedData
    .map(team => `
      <div class="carousel-item">
        ${team.logoUrl ? `<img src="${team.logoUrl}" alt="${team.teamName}" title="${team.teamName}">` : ''}
        <span class="carousel-label">${team.teamName}</span>
      </div>
    `)
    .join('');

  carouselContainer.appendChild(carousel1);
  carouselContainer.appendChild(carousel2);
  
  console.log('Carousels rendered with', teamsData.length, 'teams (', duplicatedData.length, 'total items)');
}

// Initialize carousel with proper async handling
initCarousel();