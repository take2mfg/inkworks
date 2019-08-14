const fields = `
  id
  email
  discounts
  cartToken
  lineItems {
    id
    name
    quantity
    price
    variant
    assets
    addons
    note
  }
  createdAt
  updatedAt
`;

const listQuery = `
  query ($where: String, $limit: Int, $order: String) {
    carts(where: $where, limit: $limit, order: $order) {
      ${fields}
    }
  }
`;

const retrieveQuery = `
  query($id: Int!) {
    cart(id: $id) {
      ${fields}
    }
  }
`;

const createQuery = `
  mutation ($cart: CartCreateInput) {
    createCart(cart: $cart) {
      ${fields}
    }
  }
`;

const updateQuery = `
  mutation ($cart: CartUpdateInput) {
    updateCart(cart: $cart) {
      ${fields}
    }
  }
`;

const deleteQuery = `
  mutation ($cart: CartDeleteInput) {
    deleteCart(cart: $cart) {
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
  create(cart) {
    return this.request(createQuery, { cart });
  },
  update(id, cart) {
    return this.request(updateQuery, { cart: { id, ...cart } });
  },
  delete(id) {
    return this.request(deleteQuery, { cart: { id } });
  }
};
