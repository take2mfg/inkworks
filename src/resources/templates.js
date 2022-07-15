const { clean } = require('../utils');

const fields = `
  id
  name
  description
  designRevisionId
  tags {
    id
    name
  }
  createdAt
  updatedAt
`;

const listQuery = `
  query ($where: String, $limit: Int, $order: String) {
    templates(where: $where, limit: $limit, order: $order) {
      ${fields}
    }
  }
`;

const retrieveQuery = `
  query($id: Int!) {
    template(id: $id) {
      ${fields}
    }
  }
`;

const createQuery = `
  mutation ($template: TemplateCreateInput) {
    createTemplate(template: $template) {
      ${fields}
    }
  }
`;

const updateQuery = `
  mutation ($template: TemplateUpdateInput) {
    updateTemplate(template: $template) {
      ${fields}
    }
  }
`;

const deleteQuery = `
  mutation ($template: TemplateDeleteInput) {
    deleteTemplate(template: $template) {
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
  create(template) {
    return this.request(createQuery, { template });
  },
  update(id, template) {
    return this.request(updateQuery, { template: { id, ...template } });
  },
  delete(id) {
    return this.request(deleteQuery, { template: { id } });
  }
};
