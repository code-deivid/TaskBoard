import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  ...pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  ...pluginOxlint.configs['flat/recommended'],

  skipFormatting, {
  name: "app/custom-rules",
  rules: {
    "vue/multi-word-component-names": "off", //Para que no te salte un error al no ser 2 Palabras nombre de Componente
    "@typescript-eslint/no-unused-vars": [
      "warn", //Pone en amarillo las variables que no usas
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrors: "none",
      },
    ],
  },
},

)
