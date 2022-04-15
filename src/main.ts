import {
    createApp,
    createVNode
} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from '@/route'
import '@/utils/setRem'
import { store } from '@/store'
import * as ElIcons from '@element-plus/icons-vue'
import 'virtual:windi.css'
import '@/assets/style/index.scss'
import * as THREE from "three"
const app = createApp(App)
app.config.globalProperties.THREE = THREE
app.use(ElementPlus)
app.use(store)
app.use(router)
for (const name in ElIcons) {
    app.component(name, (ElIcons as any)[name])
}
app.mount('#app')