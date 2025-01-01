import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },
  ...pluginVue.configs['flat/essential'],
  ...vueTsEslintConfig(),
  skipFormatting,
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
]

// export default {
//   overrides: [
//     {
//       files: ['**/*.{ts,mts,tsx,vue}'],
//       extends: [
//         'plugin:vue/essential',
//         '@vue/eslint-config-typescript',
//         '@vue/eslint-config-prettier/skip-formatting',
//         'eslint:recommended',
//       ],
//       rules: {
//         // Add your rules here
//         'no-console': 'warn',
//         // 'no-unused-vars': 2,
//       },
//     },
//   ],
//   ignorePatterns: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
// }
