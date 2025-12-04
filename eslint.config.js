// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  vue: true,
  jsx: true,

  // antfu 默认开启 auto-import 兼容
  stylistic: {
    semi: false,
    quotes: 'single',
  },

  rules: {
    'semi': ['error', 'never'],
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'never',
    }],
  },
})
