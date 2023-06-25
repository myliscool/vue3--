//引入初始化文件
import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入懒加载指令插件并且注册
import { lazyPlugin } from '@/directives'

// 引入全局组件插件
import { componentPlugin } from '@/components'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()
// 注册持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(componentPlugin)
app.use(lazyPlugin)
app.mount('#app')

