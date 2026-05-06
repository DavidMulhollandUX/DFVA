import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' means all asset paths are relative — works on GitHub Pages
// regardless of repo name, and locally with `vite preview`.
export default defineConfig({
  plugins: [react()],
  base: './',
})
