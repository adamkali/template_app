import { defineConfig } from "@rsbuild/core";
import { pluginBabel } from "@rsbuild/plugin-babel";
import { pluginSolid } from "@rsbuild/plugin-solid";

export default defineConfig({
    plugins: [
        pluginBabel({
            include: /\.(?:jsx|tsx)$/,
        }),
        pluginSolid(),
    ],
    resolve: {
        alias: {
            "@/": "./src",
        }
    },
	html: {
        title: "Loco SaaS Starter",
    },
    server: {
        port: 5173,
        proxy: {
            "/api": {
                target: "http://127.0.0.1:5150",
                changeOrigin: true,
                secure: false,
            },
        },
    },
});

