const express = require("express");
const AdminController = require("./AdminController");

const router = express.Router();

const adminController = new AdminController();
router.get('/best-profession', async (req, res) => {
  try {
    const bestProfession = await adminController.getBestProfession(req.app.get('models'), req.query);

    res.json({
      success: true,
      message: '',
      data: bestProfession
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

router.get('/best-clients', async (req, res) => {
  try {
    const bestClients = await adminController.getBestClients(req.app.get('models'), req.query);

    res.json({
      success: true,
      message: '',
      data: bestClients
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