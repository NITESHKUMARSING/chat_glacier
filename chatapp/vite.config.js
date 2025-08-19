// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'


// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [    tailwindcss(),
// react()],

// })
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // Load env variables
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [tailwindcss(), react()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_BACKEND_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
