import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'
import vue from 'eslint-plugin-vue'

export default [
  {
    files: ['**/*.ts', '**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2022,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: {
      vue,
    },
  },
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/.nuxt/**'],
  },
]