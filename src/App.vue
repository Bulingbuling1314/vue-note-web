<template>
  <router-view />
  <set-theme />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SetTheme from "@/components/SetTheme/index.vue";
export default defineComponent({
  setup(props) {
    let theme = window.localStorage.getItem("theme") || "default";
    theme && window.document.documentElement.setAttribute("data-theme", theme);
  },
  components:{
      SetTheme
  }
})
</script>
<style lang="scss">
#app {
    width: 100%;
    height: 100%;
}
</style>
