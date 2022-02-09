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
            <a-layout-header class="b_header">
                <div class="b_header_left">
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
                </div>
                <div class="b_header_right">
                    <div class="b_header_right_full">
                        <b-icon v-show="!isFullscreen" icon="FullscreenOutlined" @click="full" />
                        <b-icon v-show="isFullscreen" icon="FullscreenExitOutlined" @click="full" />
                    </div>
                    <div class="b_header_right_logout" @click="logout">
                        <b-icon icon="ApiOutlined" />
                    </div>
                </div>
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
import screenfull from "screenfull";
import router from "@/router";
export default defineComponent({
    components: {
        BMenu,
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const isFullscreen = ref(false)
        let full = () => {
            isFullscreen.value = !isFullscreen.value
            screenfull.isEnabled && screenfull.toggle();
        };
        const logout = () => {
            store.dispatch('Logout')
        }
        return {
            selectedKeys: ref<string[]>([store.getters.currentMenu]),
            collapsed: ref<boolean>(false),
            route: useRoute(),
            router,
            sliderList: store.getters.userMenu,
            full,
            isFullscreen,
            logout
        };
    }
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
    .b_header {
        background-color: #fff;
        padding: 0 0 0 20px;
        display: flex;
        justify-content: space-between;
        span {
            cursor: pointer;
        }
        .b_header_right {
            display: flex;
            align-items: center;
            .b_header_right_logout {
                width: 64px;
                height: 100%;
                font-size: 20px;
                margin-left: 16px;
                cursor: pointer;
                color: #FFF;
                background-color: pink;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
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
