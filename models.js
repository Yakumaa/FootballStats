const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config').development;

// Create a new Sequelize instance
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  dialectOptions: {
    options:{
      encrypt: false,
    }
  },
  logging: true,
});

// Define the Player model
const Player = sequelize.define('Player', {
  // Define your columns. Adjust names and data types as necessary.
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  full_name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  birth_date: {
    type: DataTypes.STRING(50), // or DataTypes.STRING if you prefer
    allowNull: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  height_cm: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  weight_kgs: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  positions: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  nationality: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  overall_rating: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  potential: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  value_euro: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  wage_euro: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  preferred_foot: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  // For columns with special names, you can use field property:
  international_reputation: {
    type: DataTypes.INTEGER,
    // field: 'international_reputation(1-5)',
    allowNull: true
  },
  weak_foot: {
    type: DataTypes.INTEGER,
    // field: 'weak_foot(1-5)',
    allowNull: true
  },
  skill_moves: {
    type: DataTypes.INTEGER,
    // field: 'skill_moves(1-5)',
    allowNull: true
  },
  body_type: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  release_clause_euro: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  national_team: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  national_rating: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  national_team_position: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  national_jersey_number: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  crossing: DataTypes.INTEGER,
  finishing: DataTypes.INTEGER,
  heading_accuracy: DataTypes.INTEGER,
  short_passing: DataTypes.INTEGER,
  volleys: DataTypes.INTEGER,
  dribbling: DataTypes.INTEGER,
  curve: DataTypes.INTEGER,
  freekick_accuracy: DataTypes.INTEGER,
  long_passing: DataTypes.INTEGER,
  ball_control: DataTypes.INTEGER,
  acceleration: DataTypes.INTEGER,
  sprint_speed: DataTypes.INTEGER,
  agility: DataTypes.INTEGER,
  reactions: DataTypes.INTEGER,
  balance: DataTypes.INTEGER,
  shot_power: DataTypes.INTEGER,
  jumping: DataTypes.INTEGER,
  stamina: DataTypes.INTEGER,
  strength: DataTypes.INTEGER,
  long_shots: DataTypes.INTEGER,
  aggression: DataTypes.INTEGER,
  interceptions: DataTypes.INTEGER,
  positioning: DataTypes.INTEGER,
  vision: DataTypes.INTEGER,
  penalties: DataTypes.INTEGER,
  composure: DataTypes.INTEGER,
  marking: DataTypes.INTEGER,
  standing_tackle: DataTypes.INTEGER,
  sliding_tackle: DataTypes.INTEGER
}, {
  tableName: 'Players', // ensure this matches your table name
  timestamps: false // assuming you don't have createdAt/updatedAt columns
});

module.exports = { sequelize, Player };
