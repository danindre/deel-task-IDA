const {Op} = require("sequelize");

class JobController {
  async getUnpaidJobs({Job, Contract}, profile) {
    return await Job.findAll({
      where: {
        paid: {
          [Op.not]: true
        }
      },
      include: [
        {
          model: Contract,
          where: {
            status: 'in_progress',
            [Op.or]: [
              {ContractorId: profile.id},
              {ClientId: profile.id},
            ],
          },
          attributes: []
        }
      ]
    })
  }
}

module.exports = JobController;