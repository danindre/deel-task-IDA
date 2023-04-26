const express = require('express')
const AdminRouter = require('./lib/admin/AdminRouter')
const ContractRouter = require('./lib/contract/ContractRouter')
const JobRouter = require('./lib/job/JobRouter')
const ProfileRouter = require('./lib/profile/ProfileRouter')

const router = express.Router();

router.use('/admin', AdminRouter);
router.use('/contracts', ContractRouter);
router.use('/jobs', JobRouter);
router.use(ProfileRouter);

module.exports = router;