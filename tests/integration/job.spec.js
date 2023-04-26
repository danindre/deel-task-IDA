const app = require('../../src/app');
const chai = require('chai');
const request = require('supertest');

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
      createdAt: "2023-04-26T11:31:27.928Z",
      updatedAt: "2023-04-26T11:31:27.928Z",
      ContractId: 4
    };

    const expectedUnpaidJob2 = {
      id: 5,
      description: "work",
      price: 200,
      paid: null,
      paymentDate: null,
      createdAt: "2023-04-26T11:31:27.928Z",
      updatedAt: "2023-04-26T11:31:27.928Z",
      ContractId: 7
    };

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.data).to.deep.equal([expectedUnpaidJob1, expectedUnpaidJob2]);
  });
});
