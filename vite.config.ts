import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import compression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({ algorithm: "brotliCompress" }),
    compression({ algorithm: "gzip" }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  build: {
    minify: "esbuild",
    cssMinify: true,
    sourcemap: false,
    target: "es2019",
  },
});
