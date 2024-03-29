const { clean } = require("../utils");

const fields = `
  id
  fullName
  providerId
  lastAction
`;

const listQuery = `
  query ($where: String, $limit: Int, $order: String) {
    users(where: $where, limit: $limit, order: $order) {
      ${fields}
    }
  }
`;

const retrieveQuery = `
  query($id: Int!) {
    user(id: $id) {
      ${fields}
    }
  }
`;

module.exports = {
  listQuery,
  retrieveQuery,
  list(variables = {}) {
    return this.request(listQuery, clean(variables));
  },
  retrieve(id) {
    return this.request(retrieveQuery, { id: id });
  },
};
