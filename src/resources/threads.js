const fields = `
  id
  targetId
  targetType
  open
  listening
  messages {
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
  }
  unreadCount
  createdAt
  updatedAt
`;

const listQuery = `
  query ($where: String, $limit: Int, $order: String) {
    threads(where: $where, limit: $limit, order: $order) {
      ${fields}
    }
  }
`;

const retrieveQuery = `
  query($id: Int) {
    thread(id: id) {
      ${fields}
    }
  }
`;

const createQuery = `
  mutation ($thread: ThreadCreateInput) {
    createThread(thread: $thread) {
      ${fields}
    }
  }
`;

const updateQuery = `
  mutation ($thread: ThreadUpdateInput) {
    updateThread(thread: $thread) {
      ${fields}
    }
  }
`;

const deleteQuery = `
  mutation ($thread: ThreadDeleteInput) {
    deleteThread(thread: $thread) {
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
  create(thread) {
    return this.request(createQuery, { thread });
  },
  update(id, thread) {
    return this.request(updateQuery, { thread: { id, ...thread } });
  },
  delete(id) {
    return this.request(deleteQuery, { thread: { id } });
  }
};
