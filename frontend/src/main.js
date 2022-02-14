import {createApp} from 'vue'

require('./bootstrap')
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'

axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters.token}`;
axios.defaults.baseURL = "http://localhost:8000"; //To powinno być w .env lub innym pliku konfiguracyjnym

const app = createApp(App)
app.config.globalProperties.$axios = axios;
app.use(router)
app.use(store)
app.mount('#app')
