import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9000,
    allowedHosts: ["mehdiwarid.ide.3wa.io"],
    host: "0.0.0.0"
    },
})
