import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '@/utils/permission.ts'
import { setupAntdIcon } from '@/antd/Icons'

const app = createApp(App)
setupAntdIcon(app) // antd图标

app.use(store).use(router).use(Antd).mount('#app')