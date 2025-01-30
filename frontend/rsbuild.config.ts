import { defineConfig } from "@rsbuild/core";
import { pluginBabel } from "@rsbuild/plugin-babel";
import { pluginSolid } from "@rsbuild/plugin-solid";
import tailwindcss from 'tailwindcss';

export default defineConfig({
    tools: {
        postcss: {}
    },
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
        title: "template_app: An adamkali kitchen sink",
    },
    server: {
        port: 5150,
        proxy: {
            "/api": {
                //target: "http://0.0.0.0:5150",
                target: "https://kc.kalilarosa.xyz",
                changeOrigin: true,
                secure: false,
            },
        },
    },
});

