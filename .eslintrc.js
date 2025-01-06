module.exports = {
  extends: [
    'next',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'import',
    'unused-imports',
    'babun4ek-fsd-plugin',
  ],
  rules: {
    'no-console': 'warn',
    '@next/next/no-img-element': 'off',
    'no-unused-vars': 'off',
    'react/prop-types': 'off',
    'no-useless-escape': 'off',
    'unused-imports/no-unused-imports': 'error',
    '@typescript-eslint/no-empty-object-type': 'off',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'babun4ek-fsd-plugin/path-checker': ['error', { alias: '@' }],
    // 'babun4ek-fsd-plugin/public-api-imports': [
    //   'error',
    //   {
    //     alias: '@',
    //   },
    // ],
    'react/react-in-jsx-scope': 'off',
    'babun4ek-fsd-plugin/layer-imports-checker': [
      'error',
      {
        alias: '@',
        ignoreImportsPatters: ['**/StoreProvider'],
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'external',
          'builtin',
          'internal',
          'parent',
          'sibling',
          'object',
          'type',
          'index',
        ],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'builtin',
          },
          {
            pattern: '@**',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },

  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
      },
    },
  ],
};
