const fields = `
  id
  targetType
  targetId
  name
  phone
  address1
  address2
  city
  zip
  province
  provinceCode
  country
  countryCode
  createdAt
  updatedAt
`;

const listQuery = `
  query ($where: String, $limit: Int, $order: String) {
    addresses(where: $where, limit: $limit, order: $order) {
      ${fields}
    }
  }
`;

const retrieveQuery = `
  query($id: Int!) {
    address(id: $id) {
      ${fields}
    }
  }
`;

const createQuery = `
  mutation ($address: AddressCreateInput) {
    createAddress(address: $address) {
      ${fields}
    }
  }
`;

const updateQuery = `
  mutation ($address: AddressUpdateInput) {
    updateAddress(address: $address) {
      ${fields}
    }
  }
`;

const deleteQuery = `
  mutation ($address: AddressDeleteInput) {
    deleteAddress(address: $address) {
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
  create(address) {
    return this.request(createQuery, { address });
  },
  update(id, address) {
    return this.request(updateQuery, { address: { id, ...address } });
  },
  delete(id) {
    return this.request(deleteQuery, { address: { id } });
  }
};
