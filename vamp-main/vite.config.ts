import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages ke liye base path exact repo name hona chahiye
  base: '/Real-Infinity/', 
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Isse imports sahi se kaam karenge
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    // AI Studio compatibility ke liye
    hmr: process.env.DISABLE_HMR !== 'true',
  },
  build: {
    // Assets ko sahi folder mein dalne ke liye
    outDir: 'dist',
  }
});
