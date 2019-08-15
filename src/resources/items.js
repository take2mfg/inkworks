const fields = `
  id
  name
  description
  sku
  width
  height
  length
  uom
  priceCaches {
    id
    quantity
    price
    createdAt
  }
  createdAt
  updatedAt
`;

const listQuery = `
  query ($where: String, $limit: Int, $order: String) {
    itemcaches(where: $where, limit: $limit, order: $order) {
      ${fields}
    }
  }
`;

const retrieveQuery = `
  query($id: Int!) {
    itemcache(id: $id) {
      ${fields}
    }
  }
`;

module.exports = {
  listQuery,
  retrieveQuery,
  list(variables = {}) {
    return this.request(listQuery, variables);
  },
  retrieve(id) {
    return this.request(retrieveQuery, { id: id });
  },
};
