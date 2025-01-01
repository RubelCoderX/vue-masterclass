import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import { fileURLToPath, URL } from 'node:url'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [VueRouter(),
    Components({ /* options */ }),
    AutoImport({ include: [
    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
    /\.vue$/,
    /\.vue\?vue/, // .vue
    /\.md$/, // .md
  ],
  imports: [
    // presets
    'vue',
    VueRouterAutoImports,
  {
    'pinia':['defineStore','storeToRefs','useStore','createPinia','createStore','defineStores'],
  }
  ], 
    dts: true,
    viteOptimizeDeps: true,
    dirs:['src/stores']
 }), vue(
    {template:{
      compilerOptions:{
      isCustomElement:(element) => element.startsWith('iconify-icon')
      }
    }}
  ), vueDevTools()],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
