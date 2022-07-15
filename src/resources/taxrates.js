const { clean } = require('../utils');

const fields = `
  id
  name
  rate
  addToItemPrice
  createdAt
  updatedAt
`;

const listQuery = `
  query ($where: String, $limit: Int, $order: String) {
    taxrates(where: $where, limit: $limit, order: $order) {
      ${fields}
    }
  }
`;

const retrieveQuery = `
  query($id: Int!) {
    taxrate(id: $id) {
      ${fields}
    }
  }
`;

const createQuery = `
  mutation ($taxrate: TaxRateCreateInput) {
    createTaxRate(taxrate: $taxrate) {
      ${fields}
    }
  }
`;

const updateQuery = `
  mutation ($taxrate: TaxRateUpdateInput) {
    updateTaxRate(taxrate: $taxrate) {
      ${fields}
    }
  }
`;

const deleteQuery = `
  mutation ($taxrate: TaxRateDeleteInput) {
    deleteTaxRate(taxrate: $taxrate) {
      ${fields}
    }
  }
`;

module.exports = {
  listQuery,
  retrieveQuery,
  createQuery,
  updateQuery,
  deleteQuery,
  list(variables = {}) {
    return this.request(listQuery, clean(variables));
  },
  retrieve(id) {
    return this.request(retrieveQuery, { id });
  },
  create(taxrate) {
    return this.request(createQuery, { taxrate });
  },
  update(id, taxrate) {
    return this.request(updateQuery, { taxrate: { id, ...taxrate } });
  },
  delete(id) {
    return this.request(deleteQuery, { taxrate: { id } });
  }
};
