document.addEventListener('DOMContentLoaded', () => {
  const playerData = localStorage.getItem('selectedPlayer');
  if (!playerData) {
    window.location.href = 'index.html';
    return;
  }
  
  const player = JSON.parse(playerData);
  showPlayerDetails(player);
});

function showPlayerDetails(player) {
  const detailsContainer = document.getElementById('playerDetailsContent');
  detailsContainer.innerHTML = `
    <!-- Hero Card with Image and Personal/Financial Info -->
    <div class="card mb-4 shadow">
      <div class="row no-gutters">
        <div class="col-md-4">
          <!-- You can replace the placeholder with the player's image if available -->
          <img src="${player.image}" class="card-img" alt="${player.name}" width="300" height="500">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h2 class="card-title">${player.full_name}</h2>
            <p class="card-text"><strong>Age:</strong> ${player.age}</p>
            <p class="card-text"><strong>Height:</strong> ${player.height_cm} cm</p>
            <p class="card-text"><strong>Weight:</strong> ${player.weight_kgs} kg</p>
            <p class="card-text"><strong>Nationality:</strong> ${player.nationality}</p>
            <p class="card-text"><strong>Preferred Foot:</strong> ${player.preferred_foot}</p>
            <hr>
            <h4>Financials</h4>
            <p class="card-text"><strong>Value:</strong> €${parseInt(player.value_euro).toLocaleString()}</p>
            <p class="card-text"><strong>Wage:</strong> €${parseInt(player.wage_euro).toLocaleString()}/week</p>
            <p class="card-text"><strong>Release Clause:</strong> €${parseInt(player.release_clause_euro).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Technical Skills and Physical Attributes in a 2-Column Layout -->
    <div class="row">
      <div class="col-md-6">
        <div class="card mb-4 shadow">
          <div class="card-body">
            <h4 class="card-title">Technical Skills</h4>
            <div class="row">
              ${renderSkillProgressBars(player)}
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card mb-4 shadow">
          <div class="card-body">
            <h4 class="card-title">Physical Attributes</h4>
            <div class="row">
              ${renderPhysicalAttributes(player)}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Helper function to render technical skill progress bars
function renderSkillProgressBars(player) {
  const skills = {
    'Dribbling': player.dribbling,
    'Ball Control': player.ball_control,
    'Finishing': player.finishing,
    'Long Shots': player.long_shots,
    'Free Kicks': player.freekick_accuracy,
    'Vision': player.vision
  };

  return Object.entries(skills)
    .map(([skill, value]) => `
      <div class="col-6 mb-3">
        <p class="mb-1">${skill}</p>
        <div class="progress">
          <div class="progress-bar" role="progressbar" style="width: ${value}%;" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100">${value}</div>
        </div>
      </div>
    `)
    .join('');
}

// Helper function to render physical attributes progress bars
function renderPhysicalAttributes(player) {
  const attributes = {
    'Acceleration': player.acceleration,
    'Sprint Speed': player.sprint_speed,
    'Agility': player.agility,
    'Stamina': player.stamina,
    'Strength': player.strength,
    'Balance': player.balance
  };

  return Object.entries(attributes)
    .map(([attr, value]) => `
      <div class="col-6 mb-3">
        <p class="mb-1">${attr}</p>
        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" style="width: ${value}%;" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100">${value}</div>
        </div>
      </div>
    `)
    .join('');
}

document.getElementById('backToList').addEventListener('click', () => {
  window.location.href = 'index.html';
});
