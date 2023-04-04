<template>
    <div class="column_bar">
        <h2>Column Bar</h2>
        <div class="chart_item">
            <div ref="barXRef" style="width: 100%; height: 100%"></div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { BarX } from "@/class";
const barXRef = ref(null);

onMounted(() => {
    new BarX(barXRef.value, {});
});

</script>
  
<style lang="scss" scoped>
.column_bar {
    width: 100%;
    height: 100%;

    .chart_item {
        width: 100%;
        height: 400px;
    }
}
</style>