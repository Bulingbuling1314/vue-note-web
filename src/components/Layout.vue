<template>
    <a-layout>
        <a-layout-sider
            v-model:collapsed="collapsed"
            :trigger="null"
            collapsible
        >
            <div class="logo" />
            <a-menu
                theme="dark"
                mode="inline"
                v-model:selectedKeys="selectedKeys"
            >
                <b-menu :menuList="sliderList"></b-menu>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0 20px">
                <b-icon
                    icon="MenuUnfoldOutlined"
                    v-if="collapsed"
                    class="trigger"
                    @click="() => (collapsed = !collapsed)"
                />
                <b-icon
                    icon="MenuFoldOutlined"
                    v-else
                    class="trigger"
                    @click="() => (collapsed = !collapsed)"
                />
            </a-layout-header>
            <a-layout-content
                :style="{
                    margin: '24px 16px',
                    padding: '24px',
                    background: '#fff',
                    minHeight: '280px',
                }"
            >
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import BMenu from "@/components/Menu/index.vue";
export default defineComponent({
    components: {
        BMenu,
    },
    setup() {
        const store = useStore();
        return {
            selectedKeys: ref<string[]>([store.getters.currentMenu]),
            collapsed: ref<boolean>(false),
            route: useRoute(),
            router: useRouter(),
            sliderList: store.getters.userMenu,
        };
    },
});
</script>
<style lang="scss" scoped>
.ant-layout {
    width: 100%;
    height: 100%;
    .logo {
        height: 40px;
        background-color: #fefefe;
        margin: 12px 20px 36px;
    }
}
#components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
}

.site-layout .site-layout-background {
    background: #fff;
}
</style>
