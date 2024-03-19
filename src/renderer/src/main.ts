import './assets/main.css'
import { loadSvg } from '@/icons'
import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import { initDom } from './utils/positionToCode'
import { detectZoom } from './utils/detectZoom'
const m = detectZoom()
document.body.style.cssText = 'zoom:' + 100 / Number(m) + ''
initDom()
const app = createApp(App)
loadSvg(app)
app.use(router)
app.use(store)
app.mount('#app')
