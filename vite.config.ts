import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/lab-adaptive-vue/',
  plugins: [vue()],
  // ... інший конфіг
})
