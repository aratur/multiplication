module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'react-app',
    'react-app/jest',
    'plugin:jest-dom/recommended',
    'plugin:react/recommended',
    'plugin:testing-library/react',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', 'testing-library', 'jest-dom'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-console': 'off',
    'comma-dangle': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-confusing-arrow': 'off',
    'operator-linebreak': 'off',
    'function-paren-newline': 'off',
    indent: 'off',
    'react/jsx-one-expression-per-line': 'off',
    'testing-library/prefer-screen-queries': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
  },
};
