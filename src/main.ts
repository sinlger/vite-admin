import {
    createApp
} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from '@/route'
import { store } from '@/store'
import 'virtual:windi.css'
import '@/assets/style/index.scss'
const app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')