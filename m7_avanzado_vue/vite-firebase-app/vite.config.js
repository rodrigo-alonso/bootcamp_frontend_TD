import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'; // Importar para pruebas de integracion

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],

  test: {
    enviroment: 'node',
    globals: true,
    setupFiles: [resolve(__dirname, '.src/test/setup/firebaseTestSetup.js')]
  }
})
