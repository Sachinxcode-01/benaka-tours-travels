import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      "@components": path.resolve(import.meta.dirname, "./src/components"),
      "@app": path.resolve(import.meta.dirname, "./src/app"),
      "@pages": path.resolve(import.meta.dirname, "./src/pages"),
      "@widgets": path.resolve(import.meta.dirname, "./src/widgets"),
      "@features": path.resolve(import.meta.dirname, "./src/features"),
      "@entities": path.resolve(import.meta.dirname, "./src/entities"),
      "@shared": path.resolve(import.meta.dirname, "./src/shared"),
      "@assets": path.resolve(import.meta.dirname, "./src/assets"),
    },
  },
});
