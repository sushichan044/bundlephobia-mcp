import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    react(),
    cloudflare(),
    tailwindcss(),
    Icons({ compiler: "jsx", jsx: "react" }),
  ],
});
