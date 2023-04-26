const app = require('../../src/app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('Job API tests', () => {
  it('should return the unpaid jobs for active contracts belonging to the authenticated user', async () => {
    const response = await request(app)
      .get('/jobs/unpaid')
      .set('profile_id', '7');

    const expectedUnpaidJob = {
      description: 'work',
      price: 200,
      paid: false,
      ContractId: 4,
    };

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.data).to.deep.equal([expectedUnpaidJob]);
  });
});
