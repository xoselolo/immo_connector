const MongoDB = require("./mongodb");


class Connector {
  constructor(){}

  async add_pending_house (house_data) {
    let mongo_db = new MongoDB();

    let client = await mongo_db.connect();
    // Send a ping to confirm a successful connection
    const database = client.db("houses");
    const collection = database.collection("pending");

    // TODO: CHECK IF ALREADY EXISTS

    const added = await collection.insertOne(house_data);
    console.log("ADDED: ", added)

    await mongo_db.disconnect(client);

  }

  async pending_house_exists (house_data) {
    try {
      let mongo_db = new MongoDB();
      let client = await mongo_db.connect();

      const database = client.db("houses");
      const collection = database.collection("pending");

      // A house now, only exists in pending if it has been saved by the same scrapper with the same external_id
      const query = { scrapper: house_data.scrapper, external_id: house_data.external_id };

      const result = await collection.findOne(query);
      console.log("RESULT: ", result);

      await mongo_db.disconnect(client);

      if (result) return true;
      return false;
      
    } catch(e) {
      return true; // By default, if an error, return true in order to not create the same house
    }

  }

  async get_all_pending_houses () {
    try {
      let mongo_db = new MongoDB();
      let client = await mongo_db.connect();

      const database = client.db("houses");
      const collection = database.collection("pending");

      const query = {};
      const options = {
        sort: {scrap_time: 1},
        projection: {_id: 1, scrapper:1, location_text: 1, location_coords: 1}
      }

      let pending_houses = await collection.find(query, options).toArray();

      await mongo_db.disconnect(client);

      return pending_houses;

    } catch(e){
      console.log("Error getting all pending houses: ", e);
      throw Error("Unable to get all pending houses");
    }
  }
}

module.exports = Connector;