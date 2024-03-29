import { App } from 'vue'
import router from '@/router'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import 'animate.css'
import '@/assets/style/index.scss'
import i18n from './locales/i18n';
import '@/utils/permission'

export default (app: App) => {
    app.use(router)
        .use(i18n)
}