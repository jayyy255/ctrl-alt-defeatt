import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5271,
    open: true,
    https: false, // Ensure HTTPS is false
    hmr: {
      protocol: 'ws', // Ensure WebSocket uses 'ws://'
    },
  },
});
