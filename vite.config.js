import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Set up aliases to match CRA paths if needed
      src: path.resolve(__dirname, './src'),
    },
  },
  // Configure server options
  server: {
    port: 3000, // Match CRA default port
    open: true, // Open browser on start
  },
  // Configure build options
  build: {
    outDir: 'build', // Match CRA output directory
  },
});