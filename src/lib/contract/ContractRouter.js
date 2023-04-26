const express = require('express');
const {getProfile} = require("../../middleware/getProfile");
const ContractController = require("./ContractController");

const router = express.Router();

const contractController = new ContractController();

router.get('/:id', getProfile, async (req, res) => {
  try {
    const contract = await contractController.getContractById(req.app.get('models'), req.params, req.profile)
    if (!contract) {
      return res.status(404).json({
          success: false,
          message: 'contact.not_found',
          data: null
        }
      )
    }

    res.json({
      success: true,
      message: '',
      data: contract
    })
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      data: null
    })
  }
});

router.get('/', getProfile, async (req, res) => {
  try {
    const contacts = await contractController.getContracts(req.app.get('models'), req.profile);

    res.json({
      success: true,
      message: '',
      data: contacts
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      data: null
    })
  }
})

module.exports = router;