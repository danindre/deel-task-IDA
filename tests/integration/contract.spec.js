const app = require('../../src/app');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

describe('Contract API tests', () => {
  it('should return the contract belonging to the authenticated profile', async () => {
    const response = await request(app)
      .get('/contracts/2')
      .set('profile_id', '6');

    const expectedContract = {
      id: 2,
      terms: "bla bla bla",
      status: "in_progress",
      createdAt: "2023-04-26T11:31:27.928Z",
      updatedAt: "2023-04-26T11:31:27.928Z",
      ContractorId: 6,
      ClientId: 1
    };

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.data).to.deep.equal(expectedContract);
  });
  it('should return 404 not found if the contract doesn\'t belong to the authenticated user', async () => {
    const response = await request(app)
      .get('/contracts/2')
      .set('profile_id', '5');

    expect(response.status).to.equal(404);
    expect(response.body.success).to.equal(false);
  })
  it('should return non terminated contract that belong to the authenticated user', async () => {
    const response = await request(app)
      .get('/contracts')
      .set('profile_id', '2');

    const expectedContract1 = {
      id: 3,
      terms: "bla bla bla",
      status: "in_progress",
      createdAt: "2023-04-26T11:31:27.928Z",
      updatedAt: "2023-04-26T11:31:27.928Z",
      ContractorId: 6,
      ClientId: 2
    }

    const expectedContract2 = {
      id: 4,
      terms: "bla bla bla",
      status: "in_progress",
      createdAt: "2023-04-26T11:31:27.928Z",
      updatedAt: "2023-04-26T11:31:27.928Z",
      ContractorId: 7,
      ClientId: 2
    }

    expect(response.status).to.equal(200);
    expect(response.body.success).to.equal(true);
    expect(response.body.data).to.deep.equal([expectedContract1, expectedContract2]);
  });
})