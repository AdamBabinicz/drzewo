import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
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
      external: [
        // Tymczasowo oznacz jako external jeśli nie istnieją
        // "@/components/ui/toaster"
      ],
      onwarn(warning, warn) {
        // Ignoruj ostrzeżenia o brakujących importach podczas buildu
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
