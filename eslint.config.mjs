import stylistic from '@stylistic/eslint-plugin'
import eslintConfigPrettier from 'eslint-config-prettier'
import perfectionist from 'eslint-plugin-perfectionist'

import { withNuxt } from './.nuxt/eslint.config.mjs'

export default withNuxt(
  stylistic.configs.customize({
    commaDangle: 'never',
    indent: 2,
    quotes: 'single',
    semi: false
  }),
  {
    ignores: ['.output/**'],
    plugins: {
      perfectionist
    },
    rules: {
      'perfectionist/sort-exports': 'error',
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'alphabetical'
        }
      ],
      'perfectionist/sort-objects': 'error',
      'perfectionist/sort-variable-declarations': 'error'
    }
  },
  {
    files: ['ui/**/*.vue'],
    rules: {
      'vue/require-default-prop': 'off'
    }
  },
  {
    files: ['**/*.ts', '**/*.vue'],
    rules: {
      semi: ['error', 'never'],
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'warn',
      'vue/no-v-html': 'off',
      'vue/static-class-names-order': 'error'
    }
  },
  eslintConfigPrettier
)
