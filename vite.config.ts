import {
  defineConfig
} from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
  ElementPlusResolver
} from 'unplugin-vue-components/resolvers'
import WindiCSS from 'vite-plugin-windicss'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import postCssPxToRem from 'postcss-pxtorem'
import autoprefixer from 'autoprefixer'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  WindiCSS(),
  AutoImport({
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer(),//css 添加前缀
        postCssPxToRem({ //css px2rem
          rootValue: 37.5,
          propList: ["*"]
        })
      ]
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:9000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    }
  }
})