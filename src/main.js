import './assets/main.css'
import './assets/MenuStyles/mainMenu.css'
import './assets/MenuStyles/map.css'
import './assets/MenuStyles/settings.css'
import './assets/MenuStyles/information.css'
import './assets/MenuStyles/infinities.css'
import './assets/MenuStyles/story.css'
import './assets/prestigeRealm.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
