import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    port: 8082,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
    },
  },
  plugins: [react()],
});

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // seulement en mode développement
    configureServer(server) {
      const app = createServer();

      // Ajoute l'Express middleware au serveur Vite
      server.middlewares.use(app);
    },
  };
}
