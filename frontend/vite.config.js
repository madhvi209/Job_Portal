import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, 
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src'),
    },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
});
