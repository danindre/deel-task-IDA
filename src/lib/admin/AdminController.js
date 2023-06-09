const {Op} = require("sequelize");
const {sequelize} = require("../../model");

class AdminController {
  async getBestProfession({Job, Contract, Profile}, {start, end}) {
    const startSplit = start.split('/');
    const endSplit = end.split('/');

    // We can use libraries, no time to get one now
    const startDate = new Date(Number(startSplit[2]), Number(startSplit[1]) - 1, Number(startSplit[0]));
    const endDate = new Date(Number(endSplit[2]), Number(endSplit[1]) - 1, Number(endSplit[0]));

    const mostPaidProfession = await Job.findOne({
      where: {
        paid: true,
        paymentDate: {
         [Op.between]: [startDate, endDate]
        }
      },
      attributes: [
        [sequelize.fn('sum', sequelize.col('price')), 'totalAmount'],
      ],
      order: [
        ['totalAmount', 'DESC']
      ],
      include: [
        {
          model: Contract,
          as: 'Contract',
          attributes: ["ContractorId"],
          include: [
            {
              model: Profile,
              as: 'Contractor',
              attributes: ["profession"]
            }
          ]
        },

      ],
      group: "profession"
    })


    return {
      totalPaid: mostPaidProfession.dataValues.totalAmount,
      bestProfession: mostPaidProfession.dataValues.Contract.Contractor.profession,
    };
  }

  async getBestClients({Job, Contract, Profile}, {start, end, limit = 2}) {
    const startSplit = start.split('/');
    const endSplit = end.split('/');

    // We can use libraries, no time to get one now
    const startDate = new Date(Number(startSplit[2]), Number(startSplit[1]) - 1, Number(startSplit[0]));
    const endDate = new Date(Number(endSplit[2]), Number(endSplit[1]) - 1, Number(endSplit[0]));

    const mostPaidClients = await Job.findAll({
      where: {
        paid: true,
        paymentDate: {
          [Op.between]: [startDate, endDate]
        }
      },
      attributes: [
        [sequelize.fn('sum', sequelize.col('price')), 'totalAmount'],
      ],
      order: [
        ['totalAmount', 'DESC']
      ],
      include: [
        {
          model: Contract,
          as: 'Contract',
          attributes: ["ClientId"],
          include: [
            {
              model: Profile,
              as: 'Client',
            }
          ]
        },
      ],
      group: "ClientId",
      limit
    })

    console.log(mostPaidClients)

    return mostPaidClients.map(element => {
        return {
          amount: element.dataValues.totalAmount,
          client: {
            firstName: element.dataValues.Contract.Client.firstName,
            lastName: element.dataValues.Contract.Client.lastName,
          }
        }
      });
  }
}


module.exports = AdminController;