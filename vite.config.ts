import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
//引入svg矢量图配置插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
//elemnet-plus自动引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { viteMockServe } from 'vite-plugin-mock'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: 'mock',
      enable: true,
    }),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variable.scss" as *;`,
      },
    },
  },
  // 代理跨域
  server: {
    proxy: {
      '/api': {
        //设置服务器地址
        target: 'http://localhost:10086',
        //是否跨域
        changeOrigin: true,
        //路径重写
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
})