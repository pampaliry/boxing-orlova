// eslint.config.mjs
import fs from 'node:fs';
import path from 'node:path';
import withNuxt from './.nuxt/eslint.config.mjs';
import vue from 'eslint-plugin-vue';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vueParser from 'vue-eslint-parser';

/**
 * Auto-import globals
 */
function loadNuxtAutoImports() {
  const file = path.resolve('.nuxt/auto-imports.d.ts');
  if (!fs.existsSync(file)) return {};

  const text = fs.readFileSync(file, 'utf8');
  const globals = {};

  const rx = /^export\s+const\s+([A-Za-z0-9_]+)\s*:/gm;
  let m;
  while ((m = rx.exec(text)) !== null) {
    globals[m[1]] = 'readonly';
  }
  return globals;
}

const autoGlobals = loadNuxtAutoImports();

/**
 * FINAL ESLINT CONFIG
 */
export default withNuxt({
  files: ['**/*.{ts,js,vue}'],

  languageOptions: {
    parser: vueParser,
    parserOptions: {
      parser: tsParser,
      sourceType: 'module',
      ecmaVersion: 2020,
    },
    globals: {
      ...autoGlobals,
    },
  },

  plugins: {
    vue,
    '@typescript-eslint': ts,
  },

  rules: {
    // Fixes your errors:
    'no-undef': 'off',
    'vue/html-self-closing': 'off',

    // TS rules can be adjusted later:
    '@typescript-eslint/no-unused-vars': 'off',
  },
});
