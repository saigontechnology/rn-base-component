module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:@typescript-eslint/recommended-requiring-type-checking'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'import', 'unused-imports'],
  overrides: [
    {
      files: ['*.js', '*.ts', '*.tsx'],
      rules: {
        semi: 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'import/no-cycle': 'warn',
        'unused-imports/no-unused-imports': 'error',
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'arrow-body-style': ['error', 'as-needed'],
      },
    },
  ],
}
