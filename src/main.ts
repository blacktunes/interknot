import './main.styl'

import VueDOMPurifyHTML from 'vue-dompurify-html'
import App from './App.vue'
import './assets/scripts/setup'
import './assets/scripts/keyboard'

window.BUILD_TIME = new Date(BUILD_TIME)
createApp(App)
  .use(VueDOMPurifyHTML, {
    allowedTags: ['br']
  })
  .mount('#app')
