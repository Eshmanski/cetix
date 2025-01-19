/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import { registerPlugins } from '@/plugins'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

const pinia= createPinia()
const app = createApp(App)

registerPlugins(app)

app.use(pinia)
app.mount('#app')
