# Ink.Works Node.js Library

The Ink.Works Node library provides convenient access to the Ink.Works API from applications written in server-side JavaScript.

Please keep in mind that this package is for use with server-side Node that uses Ink.Works API keys.

## Installation

```
npm i inkworks -s
```

or

```
yarn add inkworks
```

## Example Usage

The package needs to be configured with your account's secret key which is available in your Stripe Dashboard. Require it with the key's value:

```javascript
const InkWorks = require('inkworks');
const inkworks = new InkWorks('api-key...');

const customer = await inkworks.customers.create({
  email: 'customer@example.com',
});
```

Or using ES modules, this looks more like:

```javascript
import Inkworks from 'inkworks';
const inkworks = new InkWorks('api-key...');
//..
```

### List a resource


```javascript
const customers = await inkworks.customers.list({
  where: { fuzzyQuery: 'Joe' },
  order: 'reverse:createdAt'
  limit: 10
});

/*
  [{
    id: 1234,
    name: Joe Smith
  }, {
    id: 1345,
    name: Joe Wooten
  },
  ...]
*/
```

### Get one resource

```javascript
const customer = await inkworks.customers.retrieve(1234);

/*
  {
    id: 1234,
    name: Joe Smith,
    email: joe@example.com
  }
*/
```

### Create a resource

```javascript
const newCustomer = await inkworks.customers.create({
  name: 'Joe Warren',
  email: 'joew@example.com'
});

/*
  {
    id: 1346,
    name: 'Joe Warren',
    email: 'joew@example.com'
    ...
  }
*/
```

### Update a resource

```javascript
const updatedCustomer = await inkworks.customers.update(1234, {
  name: 'Joe P. Smith'
});

/*
  {
    id: 1234,
    name: 'Joe P. Smith'
    email: 'joe@example.com'
  }
*/
```

### Delete a resource

*NOTE: Deleting returns the fields of the deleted resource*

```javascript
const deletedCustomer = await inkworks.customers.delete(1234);


/*
  // Deleted Record details
  {
    id: 1234,
    name: 'Joe P. Smith'
    email: 'joe@example.com'
  }
*/
```

## Advanced Usage

The Ink.Works API is a GraphQL based API, therefore, the Ink.Works SDK allows for custom queries against the API.  If you'd prefer to request resources with raw GraphQL, you may.  Observe the following example:

```javascript
import InkWorks from 'inkworks';

const inkworks = new InkWorks('api-key...');

const query = `
  query ($id: Int) {
    order(id: $id) {
      id
      invoiceNumber
      
      customer {
        id
        name
        email
        lifeTimeValue
        orderHistory
      }
    }
  }
`;

const variables = {
  customer: { id: 1234 }
};

const { data, errors } = await inkworks.request(query, variables);

// { data } and { errors } will contain your graph response.

```