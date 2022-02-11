import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '@/assets/style/index.scss'
import '@/utils/permission.ts'
import { setupAntdIcon } from '@/antd/Icons'
// 国际化
import { createI18n } from "vue-i18n";
import messages from "@/utils/language";

const i18n = createI18n({
    locale: "zh-CN", //默认显示的语言
    messages,
});
const app = createApp(App)
setupAntdIcon(app) // antd图标

app.use(store).use(router).use(Antd).use(i18n).mount('#app')