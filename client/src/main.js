import './assets/main.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.use(pinia)
app.use(router)

createApp(App).use(vue3GoogleLogin, {
  clientId: '735163717032-abc2fksgqqfqh44emamtcot7i6luu3ib.apps.googleusercontent.com'
})
app.mount('#app')
