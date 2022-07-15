const { clean } = require('../utils');

const fields = `
  id
  code
  startAtDate
  endAtDate
  maxUses
  effects
  shop {
    id
    name
  }
  createdAt
  updatedAt
`;

const listQuery = `
  query ($where: String, $limit: Int, $order: String) {
    coupons(where: $where, limit: $limit, order: $order) {
      ${fields}
    }
  }
`;

const retrieveQuery = `
  query($id: Int!) {
    coupon(id: $id) {
      ${fields}
    }
  }
`;

const createQuery = `
  mutation ($coupon: CouponCreateInput) {
    createCoupon(coupon: $coupon) {
      ${fields}
    }
  }
`;

const updateQuery = `
  mutation ($coupon: CouponUpdateInput) {
    updateCoupon(coupon: $coupon) {
      ${fields}
    }
  }
`;

const deleteQuery = `
  mutation ($coupon: CouponDeleteInput) {
    deleteCoupon(coupon: $coupon) {
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
  create(coupon) {
    return this.request(createQuery, { coupon });
  },
  update(id, coupon) {
    return this.request(updateQuery, { coupon: { id, ...coupon } });
  },
  delete(id) {
    return this.request(deleteQuery, { coupon: { id } });
  }
};
