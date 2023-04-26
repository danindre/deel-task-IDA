const Profile = require("./lib/profile/ProfileModel");
const Contract = require("./lib/contract/ContractModel");
const Job = require("./lib/job/JobModel");

Profile.hasMany(Contract, {as :'Contractor',foreignKey:'ContractorId'})
Contract.belongsTo(Profile, {as: 'Contractor'})
Profile.hasMany(Contract, {as : 'Client', foreignKey:'ClientId'})
Contract.belongsTo(Profile, {as: 'Client'})
Contract.hasMany(Job)
Job.belongsTo(Contract)

module.exports = {
  Profile,
  Contract,
  Job
};
