const { clean } = require('../utils');

const fields = `
  id
  name
  phase
  color
  sortOrder
  createdAt
  updatedAt
`;

const listQuery = `
  query ($where: String, $limit: Int, $order: String) {
    orderstatuses(where: $where, limit: $limit, order: $order) {
      ${fields}
    }
  }
`;

const retrieveQuery = `
  query($id: Int!) {
    orderstatus(id: $id) {
      ${fields}
    }
  }
`;

const createQuery = `
  mutation ($orderstatus: OrderStatusCreateInput) {
    createOrderStatus(orderstatus: $orderstatus) {
      ${fields}
    }
  }
`;

const updateQuery = `
  mutation ($orderstatus: OrderStatusUpdateInput) {
    updateOrderStatus(orderstatus: $orderstatus) {
      ${fields}
    }
  }
`;

const deleteQuery = `
  mutation ($orderstatus: OrderStatusDeleteInput) {
    deleteOrderStatus(orderstatus: $orderstatus) {
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
    return this.request(retrieveQuery, { id: id });
  },
  create(orderstatus) {
    return this.request(createQuery, { orderstatus });
  },
  update(id, orderstatus) {
    return this.request(updateQuery, { orderstatus: { id, ...orderstatus } });
  },
  delete(id) {
    return this.request(deleteQuery, { orderstatus: { id } });
  }
};
