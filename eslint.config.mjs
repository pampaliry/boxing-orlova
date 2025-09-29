// @ts-check
import fs from 'node:fs'
import path from 'node:path'
import withNuxt from './.nuxt/eslint.config.mjs'

/**
 * @returns {Record<string, 'readonly' | 'writable' | 'off'>}
 */
function loadNuxtAutoImports() {
  const file = path.resolve('.nuxt/auto-imports.d.ts')
  if (!fs.existsSync(file)) return {}

  const text = fs.readFileSync(file, 'utf8')

  /** @type {Record<string, 'readonly' | 'writable' | 'off'>} */
  const globals = {}

  const rx = /^export\s+const\s+([A-Za-z0-9_]+)\s*:/gm
  let m
  while ((m = rx.exec(text)) !== null) {
    globals[m[1]] = 'readonly'
  }
  return globals
}

const autoGlobals = loadNuxtAutoImports()

export default withNuxt({
  languageOptions: {
    globals: {
      ...autoGlobals,
      // sem mozes pripadne rucne dopisat dalsie globaly
      // MyGlobal: 'readonly',
    }
  }
})
