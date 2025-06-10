import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    plugins: [react()],
    server: isDev
      ? {
          port: 5173,
          proxy: {
            '/api': {
              target: 'http://localhost:5000',
              changeOrigin: true,
              secure: false
            }
          }
        }
      : {}
  };
});