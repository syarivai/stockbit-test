module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/no-unescaped-entities': 0,
    'react/display-name': 0,
    'react/prop-types': 0,
  },
  plugins: ['react'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
};
