const Connector = require("../../connector");

const express = require('express');
const router = express.Router();

router.post("/new", [], async (req, res, next) => {
  try {
    let house_data = req.body;

    let connector = new Connector();

    // Check if already exists the house in approved

    // Check if already exists the house in pending
    let exists = await connector.pending_house_exists(house_data);
    console.log(`[${house_data.scrapper}] (${house_data.external_id}) exists: ${exists}`);

    if (!exists){
      console.log("New house data: ", house_data);
      await connector.add_pending_house(house_data);
    }

    return res.status(200).json({status: "add new success"});

  } catch (e) {
    return res.status(500).json({error: "Internal error."});
  }
});


module.exports = router;