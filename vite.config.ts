import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

export default defineConfig({
    plugins: [
        vue()
    ],
    resolve: {
        alias: {
            // 如果报错__dirname找不到，需要安装node,执行npm install @types/node --save-dev
            "@": path.resolve(__dirname, "src"),
            'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
        },
    },
    // 生产环境路径，类似webpack的assetsPath
    base: './',
    build: {
        outDir: "dist",
        assetsDir: "static", //指定静态资源存放路径
        sourcemap: false, //是否构建source map 文件
        minify: "terser", // 混淆器，terser 构建后文件体积更小，'terser' | 'esbuild'
        terserOptions: {
            // 生产环境移除console
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
            // 10月更新
            output: {
                comments: true, // 去掉注释内容
            },
        }
    },
    // 代理配置
    server: {
        https: false,
        open: false,
        cors: true,
        port: 3001, // 端口号
        host: "0.0.0.0",
        proxy: {
            '/bb': {
                target: 'https://www.admin.bulingbuling.xyz:8098',
                // target: 'https://localhost:8098',
                changeOrigin: true,
                secure: false, // 如果是https接口，需要配置这个参数
                // ws: true, //websocket支持
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        }
    }
})
