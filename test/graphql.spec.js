const expect = require('chai').expect;
const InkWorks = require('../src');
const sinon = require('sinon');
const SAMPLE_KEY = require('./testUtils').SAMPLE_KEY;

const CUSTOM_ENDPOINT = '/custom-endpoint';

describe('GraphQL Requests', () => {
  let inkworks;

  before(() => {
    inkworks = new InkWorks(SAMPLE_KEY, { endpoint: CUSTOM_ENDPOINT });
  });

  beforeEach(() => {
    sinon.stub(inkworks, 'request');
  });

  afterEach(() => {
    inkworks.request.restore();
  });

  it('should have the right client details', async () => {
    const iw = new InkWorks(SAMPLE_KEY);
    const iw_dev = new InkWorks(SAMPLE_KEY, { endpoint: CUSTOM_ENDPOINT });
    const iw_test_key = new InkWorks(`test_${SAMPLE_KEY}`);
    
    expect(iw.client.url).to.equal('https://api.ink.works/graphql');
    expect(iw.client.options.headers.Authorization).to.equal(`Bearer ${SAMPLE_KEY}`);
    expect(iw_dev.client.url).to.equal(CUSTOM_ENDPOINT);
    expect(iw_dev.client.options.headers.Authorization).to.equal(`Bearer ${SAMPLE_KEY}`);
    expect(iw_test_key.client.url).to.equal('https://api.inkworks.dev/graphql');
    expect(iw_test_key.client.options.headers.Authorization).to.equal(`Bearer ${SAMPLE_KEY}`);
  });

  it('should call with a graph query', async () => {
    const query = `
      {
        orders {
          id
        }
      }
    `;
    
    await inkworks.request(query);

    expect(inkworks.request.calledOnce).to.equal(true);
    expect(inkworks.request.getCall(0).args[0]).to.equal(query);
  });
});
