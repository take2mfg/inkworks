const expect = require('chai').expect;
const InkWorks = require('../src');
const sinon = require('sinon');
const SAMPLE_KEY = require('./testUtils').SAMPLE_KEY;

const Coupons = require('../src/resources/coupons');

describe('Coupons - Resource', () => {
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

    await inkworks.coupons.list(VARIABLES);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Coupons.listQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal(VARIABLES);
  });

  it('should send the right request (retrieve)', async () => {
    await inkworks.coupons.retrieve(100);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Coupons.retrieveQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ id: 100 });
  });

  it('should send the right request (create)', async () => {
    const VARIABLES = {
      foo: "bar",
    };

    await inkworks.coupons.create(VARIABLES);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Coupons.createQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ coupon: VARIABLES });
  });

  it('should send the right request (update)', async () => {
    const VARIABLES = {
      foo: "bar",
    };

    await inkworks.coupons.update(100, VARIABLES);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Coupons.updateQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ coupon: { id: 100, ...VARIABLES } });
  });

  it('should send the right request (delete)', async () => {
    await inkworks.coupons.delete(100);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Coupons.deleteQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ coupon: { id: 100 } });
  });
});
