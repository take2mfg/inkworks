module.exports = {
  clean(variables) {
    if (!variables || !variables.where) {
      return variables;
    }
    
    if (typeof variables.where === 'string') {
      return variables;
    }

    return {
      ...variables,
      where: JSON.stringify(variables.where),
    }
  },
};
