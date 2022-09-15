import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        // server: {
        //     host: 'localhost',
        //     port: 8880,
        //     proxy: {
        //         '/api': {
        //             target: 'http://127.0.0.1:8880/api',
        //             changeOrigin: true
        //         }
        //     }
        // },
        plugins: [vue()]
    }
)
