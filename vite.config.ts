import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@stores": path.resolve(__dirname, "src/stores/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@schemas": path.resolve(__dirname, "src/schemas/"),
      "@Productos": path.resolve(__dirname, "src/Productos/"),
      "@Alquileres": path.resolve(__dirname, "src/Alquileres/"),
      "@Shared": path.resolve(__dirname, "src/Shared/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
    },
  },
});
