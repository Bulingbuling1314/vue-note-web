/// <reference types="vite/client" />

import { AxiosInstance } from 'axios'

declare module '*vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
declare module 'vue-i18n'

declare module 'nprogress'