require('dotenv').config();
const { MongoClient, ServerApiVersion } = require("mongodb");

class MongoDB {
  constructor(){}

  async connect () {
    try {
      const connection_string = process.env.MONGODB_CONNECTION_STRING;
      const client = new MongoClient(connection_string, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
      return client;

    } catch (e) {
      console.log("Exception: ", e);
      throw Error("Unable to connect to MongoDB cluster");
    }
  }

  async disconnect(client) {
    await client.close();
  }
}

module.exports = MongoDB;
