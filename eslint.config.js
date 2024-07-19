const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  typescript: true,
  react: true,
  vue: true,
  rules: {
    'ts/consistent-type-imports': 'off',
    'ts/no-require-imports': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'node/prefer-global/process': 'off',
    'no-console': 'off',
    'react/prefer-destructuring-assignment': 'off',
    'react-dom/no-missing-button-type': 'off',
    'react/no-children-prop': 'off',
    'react/no-useless-fragment': 'off',
    'react-hooks/rules-of-hooks': 'off',
  },
})
