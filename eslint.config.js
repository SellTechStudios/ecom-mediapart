const eslintPluginPrettier = require('eslint-plugin-prettier')
const configNext = require('@next/eslint-plugin-next')
const payloadConfig = require('@payloadcms/eslint-config')
const configPrettier = require('eslint-config-prettier')

module.exports = {
  ...configNext.configs['recommended'],
  ...payloadConfig.extends['recommended'],
  ignores: ['**/payload-types.ts'],
  plugins: {
    prettier: eslintPluginPrettier,
  },
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-console': 'off',
  },
}
