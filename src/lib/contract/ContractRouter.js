const express = require('express');
const {getProfile} = require("../../middleware/getProfile");
const ContractController = require("./ContractController");

const router = express.Router();

const contractController = new ContractController();

router.get('/:id', getProfile, async (req, res) => {
  try {
    const contract = await contractController.getContractById(req.app.get('models'), req.params, req.profile)
    if (!contract) return res.status(404).end()
    res.json(contract)
  } catch (e) {
    console.error(e);
    res.status(500).end(e)
  }
});

module.exports = router;