<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">
                        <img src="@/assets/logo.png" alt="">
                    </div>
                    <div class="layout-nav">
                        <MenuItem name="1">
                        <Icon type="ios-navigate"></Icon>
                        Item 1
                        </MenuItem>
                        <MenuItem name="2">
                        <Icon type="ios-keypad"></Icon>
                        Item 2
                        </MenuItem>
                        <MenuItem name="3">
                        <Icon type="ios-analytics"></Icon>
                        Item 3
                        </MenuItem>
                        <MenuItem name="4" @click="logout">
                        <Icon type="ios-paper"></Icon>
                        退出登录
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
                    <Menu :active-name="selectedKeys" theme="dark" width="auto" :class="menuitemClasses">
                        <BSubmenu :menuList="sliderList"></BSubmenu>
                    </Menu>
                </Sider>
                <Layout :style="{ padding: '0 24px 24px' }">
                    <Breadcrumb :style="{ margin: '24px 0' }">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Content>
                        <div class="layout-content">
                            <router-view v-slot="{ Component }">
                                <transition enter-active-class="animate__animated animate__bounceInRight"
                                    leave-active-class="animate__animated animate__bounceOutLeft">
                                    <component :is="Component" />
                                </transition>
                            </router-view>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { useUserStore } from '@/store'
import BSubmenu from '@/components/BSubmenu/index.vue'


const isCollapsed = ref(false)

const menuitemClasses = computed(() => {
    return [
        'menu-item',
        isCollapsed ? 'collapsed-menu' : ''
    ]
})
const store = useUserStore()
const sliderList = store.userMenu
const selectedKeys = ref<string>(store.currentMenu)

const logout = () => {
    store.logout()
}

</script>

<style lang="scss" scoped>
.layout {
    width: 100%;
    height: 100vh;
    background: #f5f7f9;
    position: relative;
    overflow: hidden;

    .layout-content {
        height: 100%;
        overflow: hidden;
    }

    .ivu-layout {
        height: 100%;
    }

    .ivu-layout-header {
        height: 60px;
        line-height: 60px;
        padding: 0;
    }

    .layout-logo {
        width: 150px;
        height: 40px;
        border-radius: 3px;
        float: left;
        position: relative;
        background-color: #eee;
        padding: 0 10px;
        top: 8px;
        left: 20px;
        line-height: 40px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .layout-nav {
        float: right;
        margin: 0 auto;
        margin-right: 20px;
    }

    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }

    .menu-item i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }

    .collapsed-menu span {
        width: 0px;
        transition: width .2s ease;
    }

    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
}
</style>
