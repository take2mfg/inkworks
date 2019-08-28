const expect = require('chai').expect;
const InkWorks = require('../src');
const sinon = require('sinon');
const SAMPLE_KEY = require('./testUtils').SAMPLE_KEY;

const Statuses = require('../src/resources/statuses');

describe('Statuses - Resource', () => {
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
      where: `{ foo: "bar" }`,
      limit: 10,
      order: 'reverse:createdAt'
    };

    await inkworks.statuses.list(VARIABLES);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Statuses.listQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal(VARIABLES);
  });

  it('should send the right request (retrieve)', async () => {
    await inkworks.statuses.retrieve(100);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Statuses.retrieveQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ id: 100 });
  });

  it('should send the right request (create)', async () => {
    const VARIABLES = {
      foo: "bar"
    };

    await inkworks.statuses.create(VARIABLES);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Statuses.createQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ orderstatus: VARIABLES });
  });

  it('should send the right request (update)', async () => {
    const VARIABLES = {
      foo: "bar"
    };

    await inkworks.statuses.update(100, VARIABLES);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Statuses.updateQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ orderstatus: { id: 100, ...VARIABLES } });
  });

  it('should send the right request (delete)', async () => {
    await inkworks.statuses.delete(100);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Statuses.deleteQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ orderstatus: { id: 100 } });
  });
});
