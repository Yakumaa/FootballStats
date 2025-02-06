// Import required classes from odata-v4-server
const { ODataServer, ODataController, Edm } = require("odata-v4-server");
// Import your Sequelize Player model
const { Player } = require("./models");

/**
 * OData Controller for the Players entity.
 */
class PlayerController extends ODataController {
  // This method handles GET requests to /odata/Players
  async getAll(query) {
    // Here, we ignore the incoming OData query for simplicity.
    // In a production setup, you might parse the OData query to build Sequelize filters.
    return await Player.findAll();
  }

  // This method handles GET requests to /odata/Players(key)
  async get(key, query) {
    return await Player.findByPk(key);
  }

  // Optionally, you can implement methods for POST, PUT, DELETE, etc.
}

// Define an OData server that exposes the "Players" entity set.
class MyODataServer extends ODataServer {
  @Edm.EntitySet("Players", PlayerController)
  Players() {}
}

module.exports = MyODataServer;
