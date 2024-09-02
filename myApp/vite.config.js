

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor dependencies into a separate chunk
          if (id.includes('node_modules')) {
            return 'vendor';
          }

          // Optionally, split specific modules into separate chunks
          if (id.includes('some-specific-module')) {
            return 'some-specific-module';
          }
        }
      }
    },
    chunkSizeWarningLimit: 2000 // Adjust the chunk size warning limit if needed
  },
  plugins: [react()] // Use the React plugin
});
