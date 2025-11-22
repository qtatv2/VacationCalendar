import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
 plugins: [react()],
  server: {
    host: true,       // Pozwala na dostęp z zewnątrz kontenera (wymagane w Dockerze)
    port: 5173,       
    watch: {
      usePolling: true, // Wymagane na Windows, żeby odświeżanie strony (HMR) działało
    }
  }
})
