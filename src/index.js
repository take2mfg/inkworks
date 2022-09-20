const GraphQLClient = require('graphql-request').GraphQLClient;

const addresses = require('./resources/addresses');
const carts = require('./resources/carts');
const coupons = require('./resources/coupons');
const customers = require('./resources/customers');
const items = require('./resources/items');
const messages = require('./resources/messages');
const orders = require('./resources/orders');
const policies = require('./resources/policies');
const products = require('./resources/products');
const resthooks = require('./resources/resthooks');
const statuses = require('./resources/statuses');
const tags = require('./resources/tags');
const taxrates = require('./resources/taxrates');
const templates = require('./resources/templates');
const threads = require('./resources/threads');
const users = require('./resources/users');

const API_ENDPOINT_P = 'https://api.ink.works/graphql';
const API_ENDPOINT_S = 'https://api.inkworks.dev/graphql';

function stripKey(apiKey) {
  return apiKey.replace('test_', '');
}

function getEndpointForKey(apiKey) {
  return /test_/gi.test(apiKey) ? API_ENDPOINT_S : API_ENDPOINT_P;
}

class InkWorks {
  constructor(apiKey, opts = {}) {
    if (!apiKey) {
      throw new Error('Missing apiKey in constructor.');
    }

    const endpoint = getEndpointForKey(apiKey);
    const key = endpoint === API_ENDPOINT_S ? stripKey(apiKey) : apiKey;

    this.apiKey = key;
    this.endpoint = opts.endpoint || endpoint;

    this.client = new GraphQLClient(this.endpoint, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`
      }
    });

    this.request = this.client.request.bind(this.client);
    
    this.bindResource('addresses', addresses);
    this.bindResource('carts', carts);
    this.bindResource('coupons', coupons);
    this.bindResource('customers', customers);
    this.bindResource('items', items);
    this.bindResource('messages', messages);
    this.bindResource('orders', orders);
    this.bindResource('policies', policies);
    this.bindResource('products', products);
    this.bindResource('resthooks', resthooks);
    this.bindResource('statuses', statuses);
    this.bindResource('tags', tags);
    this.bindResource('taxrates', taxrates);
    this.bindResource('templates', templates);
    this.bindResource('threads', threads);
    this.bindResource('users', users);
  }

  bindResource(key, resource) {
    this[key] = {};

    Object.keys(resource).forEach(k => {
      if (typeof resource[k] === 'function') {
        this[key][k] = resource[k].bind(this);
      }
    })
  }

}

module.exports = InkWorks;