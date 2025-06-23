import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import sitemap from "vite-plugin-sitemap";

const dynamicRoutes = [
  "/drzewo",
  "/indeks-osob",
  "/galeria",
  "/zrodla",
  "/rod/gierczak",
  "/rod/ofiara",
  "/regulamin",
  "/polityka-prywatnosci",
  "/tree",
  "/person-index",
  "/gallery",
  "/sources",
  "/family/gierczak",
  "/family/ofiara",
  "/terms-of-service",
  "/privacy-policy",
];

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://rodowekorzenie.netlify.app",
      dynamicRoutes,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "client", "src"),
      "@shared": path.resolve(process.cwd(), "shared"),
      "@assets": path.resolve(process.cwd(), "attached_assets"),
    },
  },
  root: "client",
  build: {
    outDir: "../dist/public",
    emptyOutDir: true,
    rollupOptions: {
      external: [],
      onwarn(warning, warn) {
        if (warning.code === "UNRESOLVED_IMPORT") return;
        warn(warning);
      },
    },
  },
  server: {
    fs: {
      strict: false,
    },
  },
});
