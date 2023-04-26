const express = require("express");
const BadRequestError = require("../../error/BadRequestError");
const ProfileController = require("./ProfileController");
const router = express.Router();

const profileController = new ProfileController();

router.post('/balances/deposit/:user_id', async (req, res) => {
  try {
    const profile = await profileController.deposit(req.app.get('models'), req.params, req.body);

    res.json({
      success: true,
      message: '',
      data: profile
    })
  } catch (e) {
    if (e instanceof BadRequestError) {
      return res.status(400).json({
        success: false,
        message: e.message,
        data: null
      })
    }


    console.error(e);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      data: null
    })
  }
});

module.exports = router;