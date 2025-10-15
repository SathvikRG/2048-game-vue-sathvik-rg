import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  base: '/2048-game-vue-sathvik-rg/',
  plugins: [
    vue({
      template: {
        preprocessOptions: {
          pug: {
            // Pug options
          }
        }
      }
    }),
    vuetify({ autoImport: true })
  ],
  server: {
    port: 3000
  }
})
