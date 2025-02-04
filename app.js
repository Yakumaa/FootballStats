// Fetch player data
let players = [];

async function fetchPlayers() {
    try {
        const response = await fetch('data/players2.json');
        players = await response.json();
        renderPlayerList(players);
    } catch (error) {
        console.error('Error loading player data:', error);
    }
}

// Render player list
function renderPlayerList(players) {
  const container = document.getElementById('playerList');
  container.innerHTML = '';

  players.forEach(player => {
      const card = document.createElement('div');
      card.className = 'col';
      card.innerHTML = `
          <div class="card player-card h-100">
              <div class="card-body">
                  <h5 class="card-title">${player.name}</h5>
                  <p class="card-text">
                      <span class="badge bg-primary">${player.overall_rating} OVR</span>
                      <span class="badge bg-success">${player.potential} POT</span>
                  </p>
                  <p class="card-text">
                      ${player.positions.split(',').join(' • ')}<br>
                      ${player.nationality}
                  </p>
              </div>
          </div>
      `;
      card.addEventListener('click', () => showPlayerDetails(player));
      container.appendChild(card);
  });
}

// Show player details
function showPlayerDetails(player) {
  document.getElementById('playerList').classList.add('d-none');
  document.getElementById('playerDetails').classList.remove('d-none');

  const detailsContainer = document.getElementById('playerDetailsContent');
  detailsContainer.innerHTML = `
      <h2>${player.full_name}</h2>
      <img alt="" data-src="https://cdn.sofifa.net/players/158/023/25_120.png" data-srcset="https://cdn.sofifa.net/players/158/023/25_240.png 2x, https://cdn.sofifa.net/players/158/023/25_360.png 3x" src="https://cdn.sofifa.net/players/158/023/25_120.png" data-root="https://cdn.sofifa.net/" data-type="player" width="120" height="120" class="loaded" srcset="https://cdn.sofifa.net/players/158/023/25_240.png 2x, https://cdn.sofifa.net/players/158/023/25_360.png 3x" data-was-processed="true">
      <div class="row">
          <div class="col-md-4">
              <div class="card mb-3">
                  <div class="card-body">
                      <h5 class="card-title">Personal Info</h5>
                      <p class="card-text">
                          Age: ${player.age}<br>
                          Height: ${player.height_cm} cm<br>
                          Weight: ${player.weight_kgs} kg<br>
                          Nationality: ${player.nationality}<br>
                          Preferred Foot: ${player.preferred_foot}
                      </p>
                  </div>
              </div>
              
              <div class="card mb-3">
                  <div class="card-body">
                      <h5 class="card-title">Financials</h5>
                      <p class="card-text">
                          Value: €${parseInt(player.value_euro).toLocaleString()}<br>
                          Wage: €${parseInt(player.wage_euro).toLocaleString()}/week<br>
                          Release Clause: €${parseInt(player.release_clause_euro).toLocaleString()}
                      </p>
                  </div>
              </div>
          </div>
          
          <div class="col-md-8">
              <div class="card mb-3">
                  <div class="card-body">
                      <h5 class="card-title">Technical Skills</h5>
                      <div class="row">
                          ${renderSkillProgressBars(player)}
                      </div>
                  </div>
              </div>
              
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title">Physical Attributes</h5>
                      <div class="row">
                          ${renderPhysicalAttributes(player)}
                      </div>
                  </div>
              </div>
          </div>
      </div>
  `;
}

function renderSkillProgressBars(player) {
  const skills = {
      'Dribbling': player.dribbling,
      'Ball Control': player.ball_control,
      'Finishing': player.finishing,
      'Long Shots': player.long_shots,
      'Free Kicks': player.freekick_accuracy,
      'Vision': player.vision
  };

  return Object.entries(skills).map(([skill, value]) => `
      <div class="col-md-6 mb-3">
          <label>${skill}</label>
          <div class="progress">
              <div class="progress-bar" 
                   role="progressbar" 
                   style="width: ${value}%"
                   aria-valuenow="${value}" 
                   aria-valuemin="0" 
                   aria-valuemax="100">
                  ${value}
              </div>
          </div>
      </div>
  `).join('');
}

function renderPhysicalAttributes(player) {
  const attributes = {
      'Acceleration': player.acceleration,
      'Sprint Speed': player.sprint_speed,
      'Agility': player.agility,
      'Stamina': player.stamina,
      'Strength': player.strength,
      'Balance': player.balance
  };

  return Object.entries(attributes).map(([attr, value]) => `
      <div class="col-md-6 mb-3">
          <label>${attr}</label>
          <div class="progress">
              <div class="progress-bar bg-success" 
                   role="progressbar" 
                   style="width: ${value}%"
                   aria-valuenow="${value}" 
                   aria-valuemin="0" 
                   aria-valuemax="100">
                  ${value}
              </div>
          </div>
      </div>
  `).join('');
}

// Keep the back button functionality same
document.getElementById('backButton').addEventListener('click', () => {
  document.getElementById('playerList').classList.remove('d-none');
  document.getElementById('playerDetails').classList.add('d-none');
});

fetchPlayers();