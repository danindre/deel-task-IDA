const express = require('express');
const {getProfile} = require("../../middleware/getProfile");

const router = express.Router();
router.get('/unpaid', getProfile, async (req, res) => {
  return res.status(404).end();
});

module.exports = router;