const {Op} = require("sequelize");

class ContractController {
  async getContractById({Contract}, {id}, profile) {
    return await Contract.findOne({
      where: {
        id,
        [Op.or]: [
          {ContractorId: profile.id},
          {ClientId: profile.id},
        ],
      }
    })

  }
}


module.exports = ContractController;