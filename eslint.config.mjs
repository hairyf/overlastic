import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  react: true,
  svelte: true,
  rules: {
    'react-hooks-extra/no-unnecessary-use-prefix': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-vars': 'off',
  },
})
