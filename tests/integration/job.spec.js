const app = require('../../src/app');
const chai = require('chai');
const chaiSubset = require('chai-subset');
const request = require('supertest');

chai.use(chaiSubset);
const expect = chai.expect;

describe('Job API tests', () => {
  it('should return the unpaid jobs for active contracts belonging to the authenticated user', async () => {
    const response = await request(app)
      .get('/jobs/unpaid')
      .set('profile_id', '7');

    const expectedUnpaidJob1 = {
      id: 4,
      description: "work",
      price: 200,
      paid: null,
      paymentDate: null,
      ContractId: 4
    };

    const expectedUnpaidJob2 = {
      id: 5,
      description: "work",
      price: 200,
      paid: null,
      paymentDate: null,
      ContractId: 7
    };

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.data).to.containSubset([expectedUnpaidJob1, expectedUnpaidJob2]);
  });
  it('should pay for the unpaid job that are unpaid for an active contract', async () => {
    const response = await request(app)
      .post('/jobs/3/pay')
      .set('profile_id', '2')

    const paidJob = {
      id: 3,
      description: "work",
      price: 202,
      paid: true,
      ContractId: 3
    };

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.data).to.deep.include(paidJob);
  });
});
