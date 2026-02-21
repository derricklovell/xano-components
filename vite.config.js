import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: '', // Will be set dynamically by build script
      name: '', // Will be set dynamically by build script
      formats: ['iife'],
      fileName: () => `${process.env.COMPONENT_NAME}-component.js`
    },
    outDir: process.env.COMPONENT_NAME || 'dist',
    emptyOutDir: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return `${process.env.COMPONENT_NAME}-component.css`;
          }
          return assetInfo.name || 'asset';
        }
      }
    }
  }
});