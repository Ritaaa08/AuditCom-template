// src/cantonDropdown.js

/**
 * Mapping des clubs par canton
 */
const CANTONS_MAPPING = {
  'Fribourg': ['Bulle', 'Châtel-St-Denis', 'Charmey', 'Fribourg', 'Morat'],
  'Genève': ['Carouge', 'Chêne-Bougeries', 'Genève', 'Lancy', 'Meinier', 'Plan-les-Ouates', 'Veyrier'],
  'Jura': ['Delemont', 'Tavannes', 'Courroux', 'Delémont'],
  'Neuchâtel': ['Neuchâtel', 'Valangin', 'Cernier', 'Villiers', 'Hauterive'],
  'Valais': ['Sion', 'Sierre', 'Visp', 'Naters', 'Martigny', 'Le Châble', 'Monthey', 'Vex'],
  'Vaud': ['Lausanne', 'Vevey', 'Montreux', 'Yverdon', 'Nyon', 'Morges', 'Payerne', 'Aigle', 'Oron', 'Grandcour', 'Renens', 'Echallens']
};

const CANTONS_ORDERED = ['Fribourg', 'Genève', 'Jura', 'Neuchâtel', 'Valais', 'Vaud'];

/**
 * Détermine le canton d'une équipe basé sur son nom
 */
function getCantonForTeam(teamName) {
  for (const [canton, teams] of Object.entries(CANTONS_MAPPING)) {
    if (teams.some(t => teamName.toLowerCase().includes(t.toLowerCase()))) {
      return canton;
    }
  }
  return null;
}

/**
 * Initialise la liste déroulante des cantons
 */
async function initCantonDropdown() {
  console.log('🚀 Initialisation canton dropdown...');
  
  // Attendre que le teamList soit rempli
  await waitForTeamsData();
  
  const teamList = document.querySelector('#teamList');
  if (!teamList) {
    console.error('❌ teamList not found');
    return;
  }
  
  const teams = Array.from(teamList.querySelectorAll('article')).map(article => ({
    name: article.querySelector('h2')?.textContent || '',
    logo: article.querySelector('img')?.src || ''
  }));
  
  console.log(`✅ ${teams.length} teams found:`, teams);
  
  // Grouper les équipes par canton
  const clubsByCantons = {};
  CANTONS_ORDERED.forEach(canton => {
    clubsByCantons[canton] = teams.filter(team => {
      const teamCanton = getCantonForTeam(team.name);
      return teamCanton === canton;
    });
  });
  
  console.log('Clubs by cantons:', clubsByCantons);
  
  // Créer la liste déroulante
  createDropdown(clubsByCantons);
}

/**
 * Crée la liste déroulante custom selon la maquette
 */
function createDropdown(clubsByCantons) {
  const mapContainer = document.querySelector('#mapContainer');
  if (!mapContainer) {
    console.error('❌ mapContainer not found');
    return;
  }
  
  const wrapper = document.createElement('div');
  wrapper.className = 'cantons-wrapper';
  wrapper.id = 'cantonsWrapper';
  
  // Créer les boutons de cantons
  CANTONS_ORDERED.forEach(canton => {
    const cantonBtn = document.createElement('button');
    cantonBtn.className = 'canton-btn';
    cantonBtn.type = 'button';
    cantonBtn.textContent = canton;
    
    // Conteneur des clubs (caché par défaut)
    const clubsContainer = document.createElement('div');
    clubsContainer.className = 'clubs-list';
    clubsContainer.style.display = 'none';
    
    // Ajouter les clubs
    const clubs = clubsByCantons[canton] || [];
    clubs.forEach(club => {
      const clubItem = document.createElement('div');
      clubItem.className = 'club-item';
      
      const logo = document.createElement('img');
      logo.src = club.logo;
      logo.alt = club.name;
      logo.className = 'club-logo';
      
      const name = document.createElement('span');
      name.className = 'club-name';
      name.textContent = club.name;
      
      clubItem.appendChild(logo);
      clubItem.appendChild(name);
      clubsContainer.appendChild(clubItem);
    });
    
    // Toggle pour afficher/masquer les clubs
    cantonBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = clubsContainer.style.display !== 'none';
      clubsContainer.style.display = isVisible ? 'none' : 'block';
      cantonBtn.classList.toggle('active', !isVisible);
    });
    
    wrapper.appendChild(cantonBtn);
    wrapper.appendChild(clubsContainer);
  });
  
  // Fermer au clic extérieur
  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
      const allClubsLists = wrapper.querySelectorAll('.clubs-list');
      allClubsLists.forEach(list => list.style.display = 'none');
      const allBtns = wrapper.querySelectorAll('.canton-btn');
      allBtns.forEach(btn => btn.classList.remove('active'));
    }
  });
  
  // Insérer avant mapContainer
  mapContainer.parentElement.insertBefore(wrapper, mapContainer);
  console.log('✅ Cantons wrapper créé et inséré');
}

/**
 * Attend que le teamList soit rempli
 */
async function waitForTeamsData() {
  const teamList = document.querySelector('#teamList');
  if (!teamList) {
    console.warn('⚠️ teamList not found immediately');
    return;
  }
  
  const timeout = 15000;
  const startTime = Date.now();
  
  return new Promise((resolve) => {
    const checkTeams = () => {
      const articles = teamList.querySelectorAll('article');
      if (articles.length > 0) {
        console.log(`✅ Teams loaded: ${articles.length} articles found`);
        resolve();
      } else if (Date.now() - startTime < timeout) {
        setTimeout(checkTeams, 100);
      } else {
        console.warn('⚠️ Timeout: teamList data not loaded after 15s');
        resolve();
      }
    };
    checkTeams();
  });
}

// Appeler automatiquement quand le DOM est chargé
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCantonDropdown);
} else {
  initCantonDropdown();
}