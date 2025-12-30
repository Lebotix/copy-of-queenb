
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables from the root directory
  // Fixed: Cast process to any to access cwd() method when Node.js types are not fully recognized in the environment
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Use JSON.stringify to ensure values are treated as strings in the code
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
      'process.env.VITE_EMAILJS_SERVICE_ID': JSON.stringify(env.VITE_EMAILJS_SERVICE_ID || ''),
      'process.env.VITE_EMAILJS_TEMPLATE_ID': JSON.stringify(env.VITE_EMAILJS_TEMPLATE_ID || ''),
      'process.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID': JSON.stringify(env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID || ''),
      'process.env.VITE_EMAILJS_PUBLIC_KEY': JSON.stringify(env.VITE_EMAILJS_PUBLIC_KEY || ''),
    },
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development'
    }
  };
});
