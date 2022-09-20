const expect = require('chai').expect;
const InkWorks = require('../src');
const sinon = require('sinon');
const SAMPLE_KEY = require('./testUtils').SAMPLE_KEY;

const Users = require('../src/resources/users');

describe('Users - Resource', () => {
  let inkworks;

  before(() => {
    inkworks = new InkWorks(SAMPLE_KEY);
  });

  beforeEach(() => {
    sinon.stub(inkworks, 'request');
  });

  afterEach(() => {
    inkworks.request.restore();
  });

  it('should send the right request (list)', async () => {
    const VARIABLES = {
      where: {
        foo: 'bar'
      },
      limit: 10,
      order: 'reverse:createdAt'
    };

    await inkworks.users.list(VARIABLES);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Users.listQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({
      ...VARIABLES,
      where: JSON.stringify(VARIABLES.where)
    });
  });

  it('should send the right request (retrieve)', async () => {
    await inkworks.users.retrieve(100);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Users.retrieveQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ id: 100 });
  });

});
