import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/kitchen-journal/', // 👈 esta es la clave
  plugins: [react()],
})
