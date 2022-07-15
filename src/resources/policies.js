const { clean } = require('../utils');

const fields = `
  id
  name
  body
  createdAt
  updatedAt
`;

const listQuery = `
  query ($where: String, $limit: Int, $order: String) {
    policies(where: $where, limit: $limit, order: $order) {
      ${fields}
    }
  }
`;

const retrieveQuery = `
  query($id: Int!) {
    policy(id: $id) {
      ${fields}
    }
  }
`;

const createQuery = `
  mutation ($policy: PolicyCreateInput) {
    createPolicy(policy: $policy) {
      ${fields}
    }
  }
`;

const updateQuery = `
  mutation ($policy: PolicyUpdateInput) {
    updatePolicy(policy: $policy) {
      ${fields}
    }
  }
`;

const deleteQuery = `
  mutation ($policy: PolicyDeleteInput) {
    deletePolicy(policy: $policy) {
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
  create(policy) {
    return this.request(createQuery, { policy });
  },
  update(id, policy) {
    return this.request(updateQuery, { policy: { id, ...policy } });
  },
  delete(id) {
    return this.request(deleteQuery, { policy: { id } });
  }
};
