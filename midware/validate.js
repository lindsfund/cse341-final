const Validator = require('fastest-validator');

function userValidation(user) {
  const rules = {
    firstName: { type: 'string', optional: false, empty: false, max: '20' },
    lastName: { type: 'string', optional: false, empty: false, max: '20' },
    email: { type: 'email', optional: false, empty: false },
    password: {
      type: 'string',
      optional: false,
      empty: false,
      min: '5',
      max: '30'
    }
  };

  const v = new Validator();
  return v.validate(user, rules);
}

function mongoValidation(mongo) {
  const rules = {
    title: { type: 'string', optional: false, empty: false, max: '20' },
    description: { type: 'string', optional: false, empty: false }
  };

  const v = new Validator();
  return v.validate(mongo, rules);
}

function nodeValidation(node) {
  const rules = {
    title: { type: 'string', optional: false, empty: false, max: '20' },
    description: { type: 'string', optional: false, empty: false }
  };

  const v = new Validator();
  return v.validate(node, rules);
}

function renderValidation(render) {
  const rules = {
    title: { type: 'string', optional: false, empty: false, max: '20' },
    description: { type: 'string', optional: false, empty: false }
  };

  const v = new Validator();
  return v.validate(render, rules);
}

module.exports = {
  userValidation,
  mongoValidation,
  nodeValidation,
  renderValidation
};