/// <reference types="vitest" />
import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'packages')}/`,
    },
  },

  plugins: [
    VueMacros({
      defineOptions: false,
      defineModels: false,
      plugins: {
        vue: Vue({
          script: {
            propsDestructure: true,
            defineModel: true,
          },
        }),
      },
    }),

    // https://github.com/antfu/vite-plugin-components
    Components(),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    UnoCSS({
      mode: 'vue-scoped'
    }),
    dts(),
  ],
  build: {
    outDir: 'dist',
    lib: {
      entry: path.resolve(__dirname, './packages/index.ts'),
      formats: ['es'],
      name: 'ScheduleVue',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },
})
