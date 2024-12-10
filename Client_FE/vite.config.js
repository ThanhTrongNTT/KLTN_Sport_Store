import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/KLTNShopsy/",
    resolve: {
        alias: {
            "@": "/src",
            "@assets": "/src/assets",
            "@components": "/src/components",
        },
    },
});
