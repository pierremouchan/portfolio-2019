module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/vue'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  // Feel free to edit this file as you like
  rules: {
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-useless-concat': 'error',
    semi: ['error', 'always'],
    beforeStatementContinuationChars: 'any',
    'prefer-template': 'error',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-var': 'error',
    'no-unused-vars': 1
  }
};
