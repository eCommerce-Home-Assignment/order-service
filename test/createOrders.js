'use strict';

// tests for createOrders
// Generated by serverless-mocha-plugin

const mochaPlugin = require('serverless-mocha-plugin');
const expect = mochaPlugin.chai.expect;
let wrapped = mochaPlugin.getWrapper('createOrders', '/handler.js', 'createOrders');

describe('createOrders', () => {
  before((done) => {
    done();
  });

  it('should return 200 if user has products in cart', async () => {
    const response = await wrapped.run({
      body: JSON.stringify({
        user_id: "1"
      })
    });
    expect(response).to.not.be.empty;
    expect(response.body).to.not.be.empty;
    expect(response.statusCode).to.be.eql(200);
  });

  it('should return 404 if user has products in cart', async () => {
    const response = await wrapped.run({
      body: JSON.stringify({
        user_id: "2"
      })
    });
    expect(response).to.not.be.empty;
    expect(response.body).to.not.be.empty;
    expect(response.statusCode).to.be.eql(404);
  });
});