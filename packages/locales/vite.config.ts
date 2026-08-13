import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    emptyOutDir: true,
    copyPublicDir: false,
    outDir: './packages/locales/dist',
    lib: {
      entry: './packages/locales/index.ts',
      name: '@zealous-admin/locales',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [],
      input: {
        index: './packages/locales/index.ts',
      },
      output: {
        preserveModules: true,
        exports: 'named',
        entryFileNames: (chunkInfo) => {
          const name = chunkInfo.name || ''
          const relativePath = name.replace(/^packages\/locales\//, '')
          return `${relativePath}.js`
        },
        chunkFileNames: (chunkInfo) => {
          const name = chunkInfo.name || ''
          const relativePath = name.replace(/^packages\/locales\//, '')
          return `${relativePath}.js`
        },
      },
    },
  },
})
