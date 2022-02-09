import type { App } from "vue";
import { createVNode } from "vue";
import * as Icons from "@ant-design/icons-vue";

const BIcon = (props: {icon: string}) => {
    const { icon } = props;
    return createVNode(Icons[icon as keyof typeof Icons]);
}

const setupAntdIcon = (app: App<Element>): void => {
    // 注册组件
    app.component("BIcon", BIcon);
}

export {
    setupAntdIcon
}