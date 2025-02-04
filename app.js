//fetch data
async function fetchPlayers() {
  try {
      const response = await fetch('data/players2.json');
      players = await response.json();
      populateCarousel(players);
      initSwiper();
  } catch (error) {
      console.error('Error loading player data:', error);
  }
}

// Create carousel slides dynamically
function populateCarousel(players) {
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  
  players.forEach(player => {
    const slideEl = document.createElement('div');
    slideEl.classList.add('swiper-slide');

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('card-image');
    imageDiv.innerHTML = `
      <img src="${player.image}" alt="${player.name}" width=300 height=500 object-fit= none/>
    `;
    const imageUrl = player.image ? player.image : '/images/empty.jpg';
    imageDiv.style.backgroundImage = `url('${imageUrl}')`;

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('card-content');

    const flagUrl = getFlagUrl(player.nationality);

    const starRating = renderStarRating(player["skill_moves(1-5)"]);

    contentDiv.innerHTML = `
      <div class="d-flex align-items-center">
        <h5 class="mb-0">${player.name}</h5>
        <img src="${flagUrl}" alt="${player.nationality}" class="flag-icon">
      </div>
      <p class="mb-1">Rating: ${player.overall_rating}</p>
      <p class="mb-1">Position: ${player.positions}</p>
      <p class="mb-0">Skill Moves: ${starRating}</p>
    `;

    slideEl.appendChild(imageDiv);
    slideEl.appendChild(contentDiv);

    slideEl.addEventListener('click', () => {
      localStorage.setItem('selectedPlayer', JSON.stringify(player));
      window.location.href = 'details.html';
    });

    swiperWrapper.appendChild(slideEl);
  });
}

// Initialize Swiper carousel with coverflow effect
function initSwiper() {
  const swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 40,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

// Helper function to map nationality to a flag URL
function getFlagUrl(nationality) {
  const mapping = {
    'Argentina': 'ar',
    'Australia': 'au',
    'Belgium': 'be',
    'Brazil': 'br',
    'Cameroon': 'cm',
    'Canada': 'ca',
    'Costa Rica': 'cr',
    'Croatia': 'hr',
    'Denmark': 'dk',
    'Ecuador': 'ec',
    'England': 'gb', 
    'France': 'fr',
    'Germany': 'de',
    'Ghana': 'gh',
    'Iran': 'ir',
    'Italy': 'it',
    'Japan': 'jp',
    'Mexico': 'mx',
    'Morocco': 'ma',
    'Netherlands': 'nl',
    'Poland': 'pl',
    'Portugal': 'pt',
    'Qatar': 'qa',
    'Saudi Arabia': 'sa',
    'Senegal': 'sn',
    'Serbia': 'rs',
    'South Korea': 'kr',
    'Spain': 'es',
    'Switzerland': 'ch',
    'Tunisia': 'tn',
    'Uruguay': 'uy',
    'USA': 'us',
    'Egypt': 'eg',
    // Add or adjust entries as necessary
  };

  const countryCode = mapping[nationality] || null;
  if (countryCode) {
    return `https://flagcdn.com/64x48/${countryCode}.png`;
  } else {
    return 'https://via.placeholder.com/64x48?text=?';
  }
}

// Helper function to render star rating for skill moves
function renderStarRating(rating) {
  const fullStar = '<i class="bi bi-star-fill"></i>';
  const emptyStar = '<i class="bi bi-star"></i>';
  let starsHtml = '';

  const numRating = parseInt(rating, 10) || 0;
  for (let i = 1; i <= 5; i++) {
    starsHtml += i <= numRating ? fullStar : emptyStar;
  }
  return starsHtml;
}

document.addEventListener('DOMContentLoaded', fetchPlayers);
