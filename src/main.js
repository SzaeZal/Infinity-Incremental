import './assets/main.css'
import './assets/map.css'
import './assets/menu.css'
import './assets/prestigeRealm.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
