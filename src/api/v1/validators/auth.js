const joi = require('joi');

module.exports = {
  register: {
    body: {
      email: joi.string().email().required(),
      full_name: joi.string().min(3).max(100).required(),
      password: joi.string().min(6).max(32).required(),
    },
  },

  login: {
    body: {
      email: joi.string().email().required(),
      password: joi.string().required(),
    },
  },
};
