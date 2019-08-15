const fields = `
  id
  name
  description
  sku
  shipWidth
  shipHeight
  shipLength
  shipWeight
  createdAt
  updatedAt
`;

const listQuery = `
  query ($where: String, $limit: Int, $order: String) {
    products(where: $where, limit: $limit, order: $order) {
      ${fields}
    }
  }
`;

const retrieveQuery = `
  query($id: Int!) {
    product(id: $id) {
      ${fields}
    }
  }
`;

const createQuery = `
  mutation ($product: ProductCreateInput) {
    createProduct(product: $product) {
      ${fields}
    }
  }
`;

const updateQuery = `
  mutation ($product: ProductUpdateInput) {
    updateProduct(product: $product) {
      ${fields}
    }
  }
`;

const deleteQuery = `
  mutation ($product: ProductDeleteInput) {
    deleteProduct(product: $product) {
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
    return this.request(listQuery, variables);
  },
  retrieve(id) {
    return this.request(retrieveQuery, { id });
  },
  create(product) {
    return this.request(createQuery, { product });
  },
  update(id, product) {
    return this.request(updateQuery, { product: { id, ...product } });
  },
  delete(id) {
    return this.request(deleteQuery, { product: { id } });
  }
};
