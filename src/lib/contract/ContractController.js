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

  async getContracts({Contract}, profile) {
    if (profile.type === 'client') {
      return await Contract.findAll({
        where: {
          ClientId: profile.id,
          status: {
            [Op.not]: 'terminated'
          }
        }
      })
    }

    return await Contract.findAll({
      where: {
        ContractorId: profile.id,
        status: {
          [Op.not]: 'terminated'
        }
      }
    })
  }
}


module.exports = ContractController;