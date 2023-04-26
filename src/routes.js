const express = require('express')
const ContractRouter = require('./lib/contract/ContractRouter')

const router = express.Router();

router.use('/contracts', ContractRouter);

module.exports = router;