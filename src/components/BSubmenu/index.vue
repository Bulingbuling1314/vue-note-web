<template>
    <template v-for="item in menuList" :key="item.path">
        <template v-if="item.children && item.children.length > 0">
            <Submenu :name="item.name" class="theme_sub_slider">
                <template #title>
                    <!-- <Icon :type="item.meta.icon" /> -->
                    <Icon type="md-albums" />
                    {{ item.meta.name }}
                </template>
                <BSubmenu :menuList="item.children"></BSubmenu>
            </Submenu>
        </template>
        <template v-else>
            <MenuItem class="theme_sub_slider" :name="item.name" @click="clickRouter(item)">
            <!-- <Icon :type="item.meta.icon" /> -->
            <Icon type="md-albums" />
            {{ item.meta.name }}
            </MenuItem>
        </template>
    </template>
</template>

<script lang="ts">
export default {
    name: 'BSubmenu' //给组件命名
}
</script>

<script setup lang="ts">
import { IRouterItem } from '@/interface';
import { useRouter } from 'vue-router';


const props = defineProps({
    menuList: Array as () => IRouterItem[]
})
const router = useRouter()

const clickRouter = (item: { name: string }) => {
    router.push({ name: item.name })
}
</script>

<style lang="scss" scoped></style>