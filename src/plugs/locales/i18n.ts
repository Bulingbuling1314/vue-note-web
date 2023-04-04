import type { App } from 'vue';
import { createI18n } from 'vue-i18n';
import messages from './lang';
import ViewUIPlus from 'view-ui-plus';

const i18n = createI18n({
    allowComposition: true,
    globalInjection: true,
    locale: 'zh-CN',
    legacy: false,
    messages: messages
});

export default (app: App) => {
    app.use(i18n);
    app.use(ViewUIPlus, {
        i18n
    })
}
