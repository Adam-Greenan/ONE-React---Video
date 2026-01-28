import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "src/api"),
      "@helpers": path.resolve(__dirname, "src/helpers"),
      "@components": path.resolve(__dirname, "src/components"),
      "@screens": path.resolve(__dirname, "src/screens"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@data": path.resolve(__dirname, "src/data"),
      "@commands": path.resolve(__dirname, "src/commands"),
      "@src": path.resolve(__dirname, "src"),
    },
  },
});
