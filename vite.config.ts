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
        target: 'http://192.168.233.3:10003/api/',
        changeOrigin: true,
        // 修复路径重写逻辑，确保正确拼接
        rewrite: (path) => path.replace(/^\/api/, ''),
        // 增加超时设置
        timeout: 60000
        // 增加代理日志
      },
    },
  }
})
