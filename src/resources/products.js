const fields = `
  id
  name
  description
  sku
  width
  height
  length
  deletedAt
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

const createQuery = `
  mutation ($itemcache: ItemCacheCreateInput) {
    createItemCache(itemcache: $itemcache) {
      ${fields}
    }
  }
`;

const updateQuery = `
  mutation ($itemcache: ItemCacheUpdateInput) {
    updateItemCache(itemcache: $itemcache) {
      ${fields}
    }
  }
`;

const deleteQuery = `
  mutation ($itemcache: ItemCacheDeleteInput) {
    deleteItemCache(itemcache: $itemcache) {
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
  create(itemcache) {
    return this.request(createQuery, { itemcache });
  },
  update(id, itemcache) {
    return this.request(updateQuery, { itemcache: { id, ...itemcache } });
  },
  delete(id) {
    return this.request(deleteQuery, { itemcache: { id } });
  }
};
