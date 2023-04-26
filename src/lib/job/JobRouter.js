const express = require('express');
const {getProfile} = require("../../middleware/getProfile");
const JobController = require("./JobController");
const {clientMiddleware} = require("../../middleware/clientMiddleware");
const BadRequestError = require("../../error/BadRequestError");

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

// User must be a client in order to pay for a job
router.post('/:job_id/pay', getProfile, clientMiddleware, async (req, res) => {
  try {
    const paidJob = await jobController.payForJob(req.app.get('models'), req.profile, req.params)

    res.json({
      success: true,
      message: '',
      data: paidJob
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