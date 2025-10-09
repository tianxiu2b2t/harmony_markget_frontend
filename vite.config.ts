import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 50000,
    proxy: {
      '/api': {
        target: 'http://192.168.233.3:10013/',
        changeOrigin: true,
      }
    }
  },
})
