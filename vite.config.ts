import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: { enabled: true },
      manifest: {
        name: "Miel",
        icons: [
          {
            sizes: "192x192",
            src: "miel-logo-transparent2-192.png",
            type: "image/png",
          },
          {
            sizes: "512x512",
            src: "miel-logo-transparent2-512.png",
            type: "image/png",
          },
          {
            sizes: "512x512",
            src: "miel-logo-transparent2-512.png",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
