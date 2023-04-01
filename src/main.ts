import { createApp } from 'vue'
import App from './App.vue'
import setupPlugs from '@/plugs'

const setupApp = () => {
    const app = createApp(App);
    setupPlugs(app)
    // mount app
    app.mount('#app')
}

setupApp();

