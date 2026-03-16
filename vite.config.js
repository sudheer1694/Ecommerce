// defineConfig provides typed/validated Vite config.
import { defineConfig } from 'vite'
// React plugin enables JSX transform and Fast Refresh.
import react from '@vitejs/plugin-react'

// Vite configuration entry point.
export default defineConfig({
  // React plugin enables JSX and fast refresh.
  plugins: [react()],
})
