const fields = `
  id
  internal
  type
  content
  meta
  senderId
  senderType
  silent
  threadId
  read
  readByCustomers
  readByUsers
  createdAt
  updatedAt
`;

const listQuery = `
  query ($where: String, $limit: Int, $order: String) {
    messages(where: $where, limit: $limit, order: $order) {
      ${fields}
    }
  }
`;

const retrieveQuery = `
  query($id: Int) {
    message(id: id) {
      ${fields}
    }
  }
`;

const createQuery = `
  mutation ($message: MessageCreateInput) {
    createMessage(message: $message) {
      ${fields}
    }
  }
`;

const updateQuery = `
  mutation ($message: MessageUpdateInput) {
    updateMessage(message: $message) {
      ${fields}
    }
  }
`;

const deleteQuery = `
  mutation ($message: MessageDeleteInput) {
    deleteMessage(message: $message) {
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
  create(message) {
    return this.request(createQuery, { message });
  },
  update(id, message) {
    return this.request(updateQuery, { message: { id, ...message } });
  },
  delete(id) {
    return this.request(deleteQuery, { message: { id } });
  }
};
