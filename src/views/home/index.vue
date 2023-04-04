<template>
    <BSkeleton :title="false" :loading="loading" :paragraph="{ rows: 5, width: [100, 200, '300px', '50%', '62%'] }">
        <div class="home" v-if="!loading">
            <img width="500" src="@/assets/images/logo02.png" alt="">
            <h1 class="theme_color_01">{{ $t('HomePage.title') }}</h1>
            <span>Vite + Vue3 + Ts + iview + axios</span>
            <div class="github">
                <a target="_blank" href="https://github.com/Bulingbuling1314/vue-note-web">{{ $t('HomePage.linkGit') }}</a>
            </div>
        </div>
    </BSkeleton>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BSkeleton from '@/components/BSkeleton/index.vue'

const loading = ref(true)

onMounted(() => {
    loading.value = false
})
</script>
  
<style lang="scss" scoped>
.home {
    text-align: center;

    h1 {
        font-size: 32px;
    }

    .github {
        margin-top: 20px;
    }
}
</style>