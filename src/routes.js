const express = require('express')
const ContractRouter = require('./lib/contract/ContractRouter')
const JobRouter = require('./lib/job/JobRouter')

const router = express.Router();

router.use('/contracts', ContractRouter);
router.use('/jobs', JobRouter);

module.exports = router;