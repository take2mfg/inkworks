const { clean } = require('../utils');

const lineItemFields = `
  id
  name
  quantity
  price
  variant
  design {
    id
    design
    faces
    thumbnails
  }
  assets
  addons
  note
`;

const fields = `
  id
  email
  dueDate
  invoiceNumber
  isDeletable
  isCancelled
  isCompleted
  orderStatus {
    id
    name
    phase
    color
    isProtected
    sortOrder
  }
  billingAddress
  shippingAddress
  discounts
  message
  reference
  memo
  customerId
  customer {
    id
    name
    email
  }
  userId
  user {
    id
    fullName
    providerId
  }
  tasks {
    id
    content
    dueDate
    completed
    createdBy {
      id
      fullName
      providerId
    }
    assignedTo {
      id
      fullName
      providerId
    }
  }
  tags {
    id
    name
  }
  lineItems {
    ${lineItemFields}
  }
  paymentStatus
  fulfillmentStatus
  totals
  depositAmount
  createdAt
  updatedAt
`;

const listQuery = `
  query ($where: String, $limit: Int, $order: String) {
    orders(where: $where, limit: $limit, order: $order) {
      ${fields}
    }
  }
`;

const retrieveQuery = `
  query($id: Int!) {
    order(id: $id) {
      ${fields}
    }
  }
`;

const createQuery = `
  mutation ($json: JSON) {
    createOrder(json: $json) {
      ${fields}
    }
  }
`;

const updateQuery = `
  mutation ($order: OrderUpdateInput) {
    updateOrder(order: $order) {
      ${fields}
    }
  }
`;

const deleteQuery = `
  mutation ($order: OrderDeleteInput) {
    deleteOrder(order: $order) {
      ${fields}
    }
  }
`;

const addOrderTagQuery = `
  mutation ($orderId: Int, $tag: JSON!) {
    addOrderTag(orderId: $orderId, tag: $tag) {
      ${fields}
    }
  }
`;
const removeOrderTagQuery = `
  mutation ($orderId: Int, $tag: JSON!) {
    removeOrderTag(orderId: $orderId, tag: $tag) {
      ${fields}
    }
  }
`;
const setOrderStatusQuery = `
  mutation ($orderId: Int, $orderStatusId: Int) {
    setOrderStatus(orderId: $orderId, orderStatusId: $orderStatusId) {
      ${fields}
    }
  }
`;
const setOrderDueDateQuery = `
  mutation ($orderId: Int, $dueDate: DateTime) {
    setOrderDueDate(orderId: $orderId, dueDate: $dueDate) {
      ${fields}
    }
  }
`;
const setOrderReferenceQuery = `
  mutation ($orderId: Int, $reference: String!) {
    setOrderReference(orderId: $orderId, reference: $reference) {
      ${fields}
    }
  }
`;
const setOrderMemoQuery = `
  mutation ($orderId: Int, $memo: String!) {
    setOrderMemo(orderId: $orderId, memo: $memo) {
      ${fields}
    }
  }
`;

const updateDesignQuery = `
  mutation ($lineItemId: Int, $design: JSON) {
    updateDesign(lineItemId: $lineItemId, design: $design) {
      ${lineItemFields}      
    }
  }
`;

const updateAssetsQuery = `
  mutation ($lineItemId: Int, $assets: JSON) {
    updateAssets(lineItemId: $lineItemId, assets: $assets) {
      ${lineItemFields}
    }
  }
`;

const addOrderMessageQuery = `
  mutation ($orderId: Int, $message: JSON) {
    addOrderMessage(orderId: $orderId, message: $message) {
      id
      threads {
        id
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
      }
    }
  }
`;

const addOrderTaskQuery = `
  mutation ($orderId: Int, $task: JSON) {
    addOrderTask(orderId: $orderId, task: $task) {
      id
      tasks {
        id
        content
      }
    }
  }
`;

const addLineItemQuery = `
  mutation ($orderId: Int, $lineItem: JSON) {
    addLineItem(orderId: $orderId, lineItem: $lineItem) {
      ${fields}
    }
  }
`;

const sendOrderQuery = `
  mutation ($json: JSON) {
    sendOrder(json: $json)
  }
`;

module.exports = {
  listQuery,
  retrieveQuery,
  createQuery,
  updateQuery,
  deleteQuery,
  addOrderTagQuery,
  removeOrderTagQuery,
  setOrderStatusQuery,
  setOrderDueDateQuery,
  setOrderReferenceQuery,
  setOrderMemoQuery,
  updateDesignQuery,
  updateAssetsQuery,
  addOrderMessageQuery,
  addOrderTaskQuery,
  addLineItemQuery,
  sendOrderQuery,
  list(variables = {}) {
    return this.request(listQuery, clean(variables));
  },
  retrieve(id) {
    return this.request(retrieveQuery, { id });
  },
  create(json) {
    return this.request(createQuery, { json });
  },
  update(id, order) {
    return this.request(updateQuery, { order: { id, ...order } });
  },
  delete(id) {
    return this.request(deleteQuery, { order: { id } });
  },
  addOrderTag(orderId, tag) {
    return this.request(addOrderTagQuery, { orderId, tag: { name: tag } });
  },
  removeOrderTag(orderId, tag) {
    return this.request(removeOrderTagQuery, { orderId, tag: { name: tag } });
  },
  setOrderStatus(orderId, orderStatusId) {
    return this.request(setOrderStatusQuery, { orderId, orderStatusId });
  },
  setOrderDueDate(orderId, dueDate) {
    return this.request(setOrderDueDateQuery, { orderId, dueDate });
  },
  setOrderReference(orderId, reference) {
    return this.request(setOrderReferenceQuery, { orderId, reference });
  },
  setOrderMemo(orderId, memo) {
    return this.request(setOrderMemoQuery, { orderId, memo });
  },
  updateDesign(lineItemId, design) {
    return this.request(updateDesignQuery, { lineItemId, design });
  },
  updateAssets(lineItemId, assets) {
    return this.request(updateAssetsQuery, { lineItemId, assets });
  },
  addMessage(orderId, message) {
    return this.request(addOrderMessageQuery, { orderId, message });
  },
  addTask(orderId, task) {
    return this.request(addOrderTaskQuery, { orderId, task });
  },
  addLineItem(orderId, lineItem) {
    return this.request(addLineItemQuery, { orderId, lineItem });
  },
  sendOrder(orderId) {
    return this.request(sendOrderQuery, { json: { orderId } })
  }
};
