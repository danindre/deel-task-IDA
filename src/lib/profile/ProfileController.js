const BadRequestError = require("../../error/BadRequestError");
const {Op} = require("sequelize");
const {sequelize} = require("../../model");

class ProfileController {
  async deposit({Profile, Job, Contract}, {user_id: id}, {amount}) {
    const profile = await Profile.findOne({where: {id}})

    if (profile) {
      if (profile.type === 'client') {
        const totalUnpaidBalance = await Job.findOne({
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
                ClientId: id
              },
              attributes: []
            }
          ],
          attributes: [
            [sequelize.fn('sum', sequelize.col('price')), 'totalAmount'],
          ],
        })

        if (amount <= 0.25*totalUnpaidBalance.dataValues.totalAmount) {
          profile.set({
            balance: profile.balance + amount
          })

          return await profile.save();
        }

        throw new BadRequestError("deposit.too_large");
      }

      throw new BadRequestError("profile.not_client");
    }

    throw new BadRequestError("profile.invalid");
  }
}


module.exports = ProfileController;