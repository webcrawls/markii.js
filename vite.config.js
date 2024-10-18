import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: "markii",
      fileName: (format) => `index.${format}.js`,
      formats: ['es']
    }
  }
})