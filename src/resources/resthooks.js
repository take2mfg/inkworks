const fields = `
  id
  url
  event
  apiKey
  inactive
  createdAt
  updatedAt
`;

const listQuery = `
  query ($where: String, $limit: Int, $order: String) {
    restHooks(where: $where, limit: $limit, order: $order) {
      ${fields}
    }
  }
`;

const retrieveQuery = `
  query($id: Int!) {
    restHook(id: $id) {
      ${fields}
    }
  }
`;

const createQuery = `
  mutation ($restHook: RestHookCreateInput) {
    createRestHook(restHook: $restHook) {
      ${fields}
    }
  }
`;

const updateQuery = `
  mutation ($restHook: RestHookUpdateInput) {
    updateRestHook(restHook: $restHook) {
      ${fields}
    }
  }
`;

const deleteQuery = `
  mutation ($restHook: RestHookDeleteInput) {
    deleteRestHook(restHook: $restHook) {
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
  create(restHook) {
    return this.request(createQuery, { restHook });
  },
  update(id, restHook) {
    return this.request(updateQuery, { restHook: { id, ...restHook } });
  },
  delete(id) {
    return this.request(deleteQuery, { restHook: { id } });
  }
};
