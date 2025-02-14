import { defineConfig } from "@rsbuild/core";
import { pluginBabel } from "@rsbuild/plugin-babel";
import { pluginSolid } from "@rsbuild/plugin-solid";
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';

//const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
    tools: {
        postcss: {}
    },
    plugins: [
        pluginBabel({
            include: /\.(?:jsx|tsx)$/,
        }),
        pluginSolid(),
        pluginNodePolyfill()
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
                target: "http://0.0.0.0:5150",
                changeOrigin: true,
                secure: false,
            },
        },
        cors:false,
    },
});

