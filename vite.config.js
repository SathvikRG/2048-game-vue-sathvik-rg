import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
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
