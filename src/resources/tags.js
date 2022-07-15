const { clean } = require('../utils');

const fields = `
  id
  name
  products
  manufacturingProducts
  templates
  createdAt
  updatedAt
`;

const listQuery = `
  query ($where: String, $limit: Int, $order: String) {
    tags(where: $where, limit: $limit, order: $order) {
      ${fields}
    }
  }
`;

const retrieveQuery = `
  query($id: Int!) {
    tag(id: $id) {
      ${fields}
    }
  }
`;

const createQuery = `
  mutation ($tag: TagCreateInput) {
    createTag(tag: $tag) {
      ${fields}
    }
  }
`;

const updateQuery = `
  mutation ($tag: TagUpdateInput) {
    updateTag(tag: $tag) {
      ${fields}
    }
  }
`;

const deleteQuery = `
  mutation ($tag: TagDeleteInput) {
    deleteTag(tag: $tag) {
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
  create(tag) {
    return this.request(createQuery, { tag });
  },
  update(id, tag) {
    return this.request(updateQuery, { tag: { id, ...tag } });
  },
  delete(id) {
    return this.request(deleteQuery, { tag: { id } });
  }
};
