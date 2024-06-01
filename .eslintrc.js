module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    'unicorn/filename-case': 'off',
    'import/prefer-default-export': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'no-console': 'warn',
    'no-restricted-syntax': 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'no-underscore-dangle': 'off',
    'unicorn/prefer-export-from': 'off',
    'spaced-comment': 'off',
  },
};
