import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    // GitHub Pages ke liye base path '/vamp/' hona zaroori hai
    base: '/vamp/', 
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR settings ko AI Studio compatibility ke liye chheda nahi gaya hai
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
