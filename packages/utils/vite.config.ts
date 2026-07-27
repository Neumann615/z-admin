import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    emptyOutDir: true,
    copyPublicDir: false,
    outDir: './packages/utils/dist',
    lib: {
      entry: './packages/utils/index.ts',
      name: '@zealous-admin/utils',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [],
      input: {
        index: './packages/utils/index.ts',
      },
      output: {
        preserveModules: true,
        exports: 'named',
        entryFileNames: (chunkInfo) => {
          const name = chunkInfo.name || ''
          const relativePath = name.replace(/^packages\/utils\//, '')
          return `${relativePath}.js`
        },
        chunkFileNames: (chunkInfo) => {
          const name = chunkInfo.name || ''
          const relativePath = name.replace(/^packages\/utils\//, '')
          return `${relativePath}.js`
        },
      },
    },
  },
})
