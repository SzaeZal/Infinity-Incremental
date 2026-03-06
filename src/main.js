import './assets/main.css'
import './assets/dialogBox.css'
import './assets/notification.css'
import './assets/MenuStyles/mainMenu.css'
import './assets/MenuStyles/map.css'
import './assets/MenuStyles/settings.css'
import './assets/MenuStyles/information.css'
import './assets/MenuStyles/infinities.css'
import './assets/MenuStyles/stats.css'
import './assets/MenuStyles/story.css'
import './assets/PrestigeRealm/prestigeRealmLayerBase.css'
import './assets/PrestigeRealm/pointsLayer.css'
import './assets/PrestigeRealm/prestigeLayer.css'
import './assets/PrestigeRealm/superPrestigeLayer.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
