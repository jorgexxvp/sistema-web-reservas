import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/presentation/components"),
      "@toolbox": path.resolve(__dirname, "./src/presentation/toolbox"),
      "@zustand": path.resolve(__dirname, "./src/presentation/zustand"),
      "@features": path.resolve(__dirname, "./src/presentation/features"),
      "@assets": path.resolve(__dirname, "./src/presentation/assets"),
      "@core": path.resolve(__dirname, "./src/core"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target:
          "http://ec2-16-59-188-126.us-east-2.compute.amazonaws.com:9323/sanbella-web-api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
