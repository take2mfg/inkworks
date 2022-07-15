const expect = require('chai').expect;
const InkWorks = require('../src');
const sinon = require('sinon');
const SAMPLE_KEY = require('./testUtils').SAMPLE_KEY;

const Policies = require('../src/resources/policies');

describe('Policies - Resource', () => {
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

    await inkworks.policies.list(VARIABLES);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Policies.listQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({
      ...VARIABLES,
      where: JSON.stringify(VARIABLES.where)
    });
  });

  it('should send the right request (retrieve)', async () => {
    await inkworks.policies.retrieve(100);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Policies.retrieveQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ id: 100 });
  });

  it('should send the right request (create)', async () => {
    const VARIABLES = {
      foo: "bar",
    };

    await inkworks.policies.create(VARIABLES);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Policies.createQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ policy: VARIABLES });
  });

  it('should send the right request (update)', async () => {
    const VARIABLES = {
      foo: "bar",
    };

    await inkworks.policies.update(100, VARIABLES);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Policies.updateQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ policy: { id: 100, ...VARIABLES } });
  });

  it('should send the right request (delete)', async () => {
    await inkworks.policies.delete(100);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Policies.deleteQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ policy: { id: 100 } });
  });
});
