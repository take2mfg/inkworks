const GraphQLClient = require('graphql-request').GraphQLClient;

const customers = require('./resources/customers');

class InkWorks {
  constructor(apiKey, opts = {}) {
    if (!apiKey) {
      throw new Error('Missing apiKey in constructor.');
    }

    this.apiKey = apiKey;
    this.endpoint = opts.endpoint || 'https://platform-api.take2.co/graphql';

    this.client = new GraphQLClient(this.endpoint, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });

    this.request = this.client.request.bind(this.client);
    
    this.bindResource('customers', customers);
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