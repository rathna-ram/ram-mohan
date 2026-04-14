import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/my-new-project1/'   // 👈 VERY IMPORTANT (repo name)
})