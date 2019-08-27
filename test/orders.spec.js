const expect = require('chai').expect;
const InkWorks = require('../src');
const sinon = require('sinon');
const SAMPLE_KEY = require('./testUtils').SAMPLE_KEY;

const Orders = require('../src/resources/orders');

describe('Orders - Resource', () => {
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

    await inkworks.orders.list(VARIABLES);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Orders.listQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal(VARIABLES);
  });

  it('should send the right request (retrieve)', async () => {
    await inkworks.orders.retrieve(100);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Orders.retrieveQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ id: 100 });
  });

  it('should send the right request (create)', async () => {
    const VARIABLES = {
      foo: "bar",
    };

    await inkworks.orders.create(VARIABLES);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Orders.createQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ json: VARIABLES });
  });

  it('should send the right request (update)', async () => {
    const VARIABLES = {
      foo: "bar",
    };

    await inkworks.orders.update(100, VARIABLES);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Orders.updateQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ order: { id: 100, ...VARIABLES } });
  });

  it('should send the right request (delete)', async () => {
    await inkworks.orders.delete(100);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Orders.deleteQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ order: { id: 100 } });
  });

  it('should send the right request (addOrderTag)', async () => {
    await inkworks.orders.addOrderTag(1234, 'foo');

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Orders.addOrderTagQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ orderId: 1234, tag: { name: 'foo' } });
  });

  it('should send the right request (removeOrderTag)', async () => {
    await inkworks.orders.removeOrderTag(1234, 'foo');

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Orders.removeOrderTagQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ orderId: 1234, tag: { name: 'foo' } });
  });

  it('should send the right request (setOrderStatus)', async () => {
    await inkworks.orders.setOrderStatus(1234, 4321);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Orders.setOrderStatusQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ orderId: 1234, orderStatusId: 4321 });
  });

  it('should send the right request (setOrderDueDate)', async () => {
    const dueDate = new Date();
    await inkworks.orders.setOrderDueDate(1234, dueDate);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Orders.setOrderDueDateQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ orderId: 1234, dueDate });
  });

  it('should send the right request (setOrderReference)', async () => {
    await inkworks.orders.setOrderReference(1234, 'Testing');

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Orders.setOrderReferenceQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ orderId: 1234, reference: 'Testing' });
  });

  it('should send the right request (setOrderMemo)', async () => {
    await inkworks.orders.setOrderMemo(1234, 'Memo');

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Orders.setOrderMemoQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ orderId: 1234, memo: 'Memo' });
  });

  it('should send the right request (updateDesign)', async () => {
    await inkworks.orders.updateDesign(1234, { foo: 'bar' });

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Orders.updateDesignQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ lineItemId: 1234, design: { foo: 'bar' } });
  });

  it('should send the right request (updateAssets)', async () => {
    await inkworks.orders.updateAssets(1234, { foo: 'bar' });

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Orders.updateAssetsQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ lineItemId: 1234, assets: { foo: 'bar' } });
  });

  it('should send the right request (addMessage)', async () => {
    await inkworks.orders.addMessage(1234, {
      type: 'note',
      content: 'A new message.',
      meta: {
        foo: 'bar',
      },
    });

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(Orders.addOrderMessageQuery);
    expect(inkworks.request.getCall(0).args[1]).to.deep.equal({ orderId: 1234, message: {
      type: 'note',
      content: 'A new message.',
      meta: {
        foo: 'bar',
      }
    } });
  });

});
