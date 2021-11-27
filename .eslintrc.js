module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [0],
    'react/function-component-definition': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-restricted-exports': 0,
    'import/prefer-default-export': 0,
    'react/jsx-no-constructed-context-values': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['.'],
      },
    },
  },
};
