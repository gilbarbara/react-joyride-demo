import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  define: {
    'process.env': process.env,
    global: 'globalThis',
  },
  plugins: [tsconfigPaths(), react()],
  server: {
    port: 3000,
  },
});
