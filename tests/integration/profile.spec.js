const app = require('../../src/app');
const chai = require('chai');
const chaiSubset = require('chai-subset');
const request = require('supertest');

chai.use(chaiSubset);
const expect = chai.expect;

describe('Profile API tests', () => {
  it('should deposit maximum 25% of current unpaid jobs to client user', async () => {
    const response = await request(app)
      .post('/balances/deposit/2')
      .send({
        amount: 100
      })

    const expectedPaidClient = {
      id: 2,
      firstName: "Mr",
      lastName: "Robot",
      profession: "Hacker",
      balance: 331.11,
      type: "client"
    }

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.data).to.deep.include(expectedPaidClient);
  });
});
