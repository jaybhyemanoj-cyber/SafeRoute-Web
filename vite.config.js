import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: 'public',
  server: {
    port: 3000,
    open: false
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
