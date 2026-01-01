import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: false,
      minify: false,
      rollupOptions: {
        input: resolve(__dirname, `src/apps/${mode}/index.js`),
        output: {
          format: 'iife',
          name: 'bookmarklet',
          entryFileNames: `${mode}.js`,
          inlineDynamicImports: true,
          banner: 'javascript:'
        }
      }
    }
  }
})
