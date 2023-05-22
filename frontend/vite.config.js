import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // bc using a different ports on front & back- requests need a target to the backend server to complete
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true, // ensure hostname is changed to target
      },
    },
  },
});
