/**
 * @type {import('electron-vite').UserConfig}
 */
import { resolve } from 'path'
import { defineConfig, defineViteConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import svgLoader from 'vite-svg-loader'
import viteMockPlugin from './plugin/mock'
import gvaPosition from './plugin/gvaPosition'
import gvaPositionServer from './plugin/gvaPositionServer'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: defineViteConfig((): any => {
    return {
      resolve: {
        alias: {
          '@': resolve('src/renderer/src')
        }
      },
      esbuild: {
        pure: ['console.log'],
        drop: ['debugger'],
        legalComments: 'none'
      },
      plugins: [
        gvaPositionServer(),
        gvaPosition(),
        vue(),
        svgLoader(),
        // * 使用 svg 图标
        createSvgIconsPlugin({
          iconDirs: [resolve(process.cwd(), 'src/renderer/src/assets/icons')],
          symbolId: 'icon-[dir]-[name]'
        }),
        viteMockPlugin(),
        autoImport({
          resolvers: [ElementPlusResolver()]
        }),
        components({
          resolvers: [ElementPlusResolver()]
        })
      ]
    }
  })
})
