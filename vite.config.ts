import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    plugins: [react()],
    base: './', // Crucial for GitHub Pages to work on sub-paths
    define: {
      'import.meta.env.VITE_API_KEY': JSON.stringify(env.VITE_API_KEY || '')
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    }
  };
});