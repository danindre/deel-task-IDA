const express = require('express');
const {getProfile} = require("../../middleware/getProfile");
const JobController = require("./JobController");

const router = express.Router();

const jobController = new JobController();
router.get('/unpaid', getProfile, async (req, res) => {
  try {
    const jobs = await jobController.getUnpaidJobs(req.app.get('models'), req.profile)
    res.json({
      success: true,
      message: '',
      data: jobs
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      data: null
    })
  }
});

module.exports = router;