<template>
  <div class="row_bar">
    <h2>Column Bar</h2>
    <div class="chart_item">
      <div ref="barXRef" style="width: 100%; height: 100%"></div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { BarY } from "@/components/Charts/index";
export default {
  setup() {
    const barXRef = ref(null);

    onMounted(() => {
      new BarY(barXRef.value, {});
    });

    return {
      barXRef,
    };
  },
};
</script>

<style lang="sass" scoped>
.row_bar
    width: 100%
    height: 100%
.chart_item
    width: 100%
    height: 400px
</style>