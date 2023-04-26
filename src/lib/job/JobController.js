const {Op} = require("sequelize");
const BadRequestError = require("../../error/BadRequestError");

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

  async payForJob({Job, Contract, Profile}, profile, {job_id: id}) {
    const jobToPay = await Job.findOne({
      where: {
        id
      },
      include: [
        {
          model: Contract,
          where: {
            status: 'in_progress',
            [Op.or]: [
              {ClientId: profile.id},
            ],
          }
        }
      ]
    });

    if (jobToPay) {
      if (!jobToPay.paid) {
        if (profile.balance >= jobToPay.price) {
          const priceToPay = jobToPay.price;

          // Deduct from client balance

          profile.set({
            balance: profile.balance  - priceToPay
          })

          await profile.save();

          // Update contractor balance
          const contractor = await Profile.findOne({
            where: {
              id: jobToPay.Contract.ContractorId
            }
          })

          contractor.set({
            balance: contractor.balance + jobToPay.price
          })

          await contractor.save()

          // Set the job as paid
          jobToPay.set({
            paid: true,
            paymentDate: new Date()
          })

          return await jobToPay.save();
        }

        throw new BadRequestError('job.not_enough_balance')
      }

      throw new BadRequestError('job.already_paid')
    }

    throw new BadRequestError('job.invalid')
  }
}

module.exports = JobController;