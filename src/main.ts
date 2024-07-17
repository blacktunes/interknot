import './main.styl'

import { analytics } from 'star-rail-vue'
import VueDOMPurifyHTML from 'vue-dompurify-html'
import App from './App.vue'
import './assets/scripts/setup'
import './assets/scripts/keyboard'

window.BUILD_TIME = new Date(BUILD_TIME)

analytics('G-YW1NH1GCBF', import.meta.env.MODE === 'development')

createApp(App)
  .use(VueDOMPurifyHTML, {
    allowedTags: ['br']
  })
  .mount('#app')
