<template>
    <template v-for="item in menuList" :key="item.path">
        <template v-if="item.children && item.children.length > 0">
            <a-sub-menu :key="item.name" class="theme_sub_slider">
                <template #icon>
                    <b-icon :icon="item.meta.icon"/>
                </template>
                <template #title>{{ item.meta.name }}</template>
                <b-sub-menu :menuList="item.children"></b-sub-menu>
            </a-sub-menu>
        </template>
        <template v-else>
            <a-menu-item
                class="theme_sub_slider"
                :key="item.name"
                @click="clickRouter(item)"
            >
                <b-icon :icon="item.meta.icon" />
                <span>{{ item.meta.name }}</span>
            </a-menu-item>
        </template>
    </template>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: "BSubMenu",
    props: {
        menuList: {
            type: Array,
            default: () => [],
        },
    },
    setup() {
        const store = useStore()
        return {
            selectedKeys: ref<string[]>([store.getters.currentMenu]),
            router: useRouter()
        }
    },
    methods: {
        clickRouter(item: {name: string}) {
            console.log(this.$router)
            console.log(item)
            this.router.push({name: item.name})
        }
    }
});
</script>

<style lang="scss" scoped>
</style>