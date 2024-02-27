const express = require('express');
const Connector = require('../../connector');
const router = express.Router();

router.get("/pending", [], async (req, res, next) => {
  try {
    // TODO: Implement on the controller
    let connector = new Connector();
    let pending_houses = await connector.get_all_pending_houses();

    return res.status(200).json(pending_houses);
    
  } catch(e) {
    return res.status(500).json({error: "Internal error."});
  }
});


module.exports = router;