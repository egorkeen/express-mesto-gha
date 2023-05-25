module.exports = {
  extends: 'airbnb-base',
  globals: {
    express: 'readonly',
  },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
};