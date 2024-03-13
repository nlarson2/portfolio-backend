module.exports = [
  {
    extends: [
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'plugin:prettier/recommended',
      'plugin:import/recommended',
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['prettier'],
    rules: {
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error'],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.ts', '.tsx', '.native.js'],
        },
      },
    },
  },
];
