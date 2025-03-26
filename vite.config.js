import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['fullstackopen-phonebook-76s1.onrender.com', 'localhost']
  }
})
