const express = require('express');
const { sequelize, Player } = require('./models');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

sequelize.authenticate()
  .then(() => {
    console.log('Connection to SQL Server has been established successfully.');
    // Uncomment the next line if you need to sync the models (creates tables if not existing)
    // return sequelize.sync();
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// GET all players
app.get('/api/players', async (req, res) => {
  try {
    const players = await Player.findAll();
    res.json(players);
  } catch (err) {
    console.error('Error fetching players:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET a player by ID
app.get('/api/players/:id', async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.json(player);
  } catch (err) {
    console.error('Error fetching player:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//POST a player
app.post('/api/players', async (req, res) => {
  try {
    const newPlayer = await Player.create(req.body);
    res.status(201).json(newPlayer);
  } catch (err) {
    console.error('Error creating player:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
