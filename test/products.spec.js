const expect = require('chai').expect;
const InkWorks = require('../src');
const sinon = require('sinon');
const SAMPLE_KEY = require('./testUtils').SAMPLE_KEY;

const Products = require('../src/resources/products');

describe('Products - Resource', () => {
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

    await inkworks.products.list(VARIABLES);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Products.listQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal(VARIABLES);
  });

  it('should send the right request (retrieve)', async () => {
    await inkworks.products.retrieve(100);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Products.retrieveQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ id: 100 });
  });

  it('should send the right request (create)', async () => {
    const VARIABLES = {
      foo: "bar",
    };

    await inkworks.products.create(VARIABLES);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Products.createQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ itemcache: VARIABLES });
  });

  it('should send the right request (update)', async () => {
    const VARIABLES = {
      foo: "bar",
    };

    await inkworks.products.update(100, VARIABLES);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Products.updateQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ itemcache: { id: 100, ...VARIABLES } });
  });

  it('should send the right request (delete)', async () => {
    await inkworks.products.delete(100);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Products.deleteQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ itemcache: { id: 100 } });
  });
});
