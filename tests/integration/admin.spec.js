const app = require('../../src/app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('Admin API tests', () => {
  it('should return the best profession', async () => {
    const response = await request(app)
      .get('/admin/best-profession?start=01/08/2020&end=31/08/2020')

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.data).to.deep.equal({
      totalPaid: 2683,
      bestProfession: "Programmer"
    });

  });
  it('should return the best paying clients', async () => {
    const response = await request(app)
      .get('/admin/best-clients?start=01/08/2020&end=31/08/2020')

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.data).to.deep.equal([
      {
        amount: 2020,
        client: {
          firstName: "Ash",
          lastName: "Kethcum"
        }
      },
      {
        amount: 442,
        client: {
          firstName: "Mr",
          lastName: "Robot"
        }
      }
    ]);

  })
});