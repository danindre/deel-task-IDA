const app = require('../../src/app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('Contract API tests', () => {
  it('should return the contract belonging to the authenticated profile', async () => {
    const response = await request(app)
      .get('/admin/best-profession?start=01/08/2020&end=31/08/2020')

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.data).to.deep.equal({
      totalPaid: 2020,
      bestProfession: "Pokemon master"
    });

  })
});