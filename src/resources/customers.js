const fields = `
  id
  name
  company
  email
  phone
  birthday
  color
  photos
  contactInfo
  organizations
  demographics
  socialProfiles
  taxRate {
    id
    name
    rate
    addToItemPrice
    createdAt
  }
`;

const listQuery = `
  query ($where: String, $limit: Int, $order: String) {
    customers(where: $where, limit: $limit, order: $order) {
      ${fields}
    }
  }
`;

const retrieveQuery = `
  query($id: Int!) {
    customer(id: $id) {
      ${fields}
    }
  }
`;

const createQuery = `
  mutation ($customer: CustomerCreateInput) {
    createCustomer(customer: $customer) {
      ${fields}
    }
  }
`;

const updateQuery = `
  mutation ($customer: CustomerUpdateInput) {
    updateCustomer(customer: $customer) {
      ${fields}
    }
  }
`;

const deleteQuery = `
  mutation ($customer: CustomerDeleteInput) {
    deleteCustomer(customer: $customer) {
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
    return this.request(retrieveQuery, { id: id });
  },
  create(customer) {
    return this.request(createQuery, { customer });
  },
  update(id, customer) {
    return this.request(updateQuery, { customer: { id, ...customer } });
  },
  delete(id) {
    return this.request(deleteQuery, { customer: { id } });
  }
};
