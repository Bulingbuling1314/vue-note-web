<template>
  <div class="column_bar">
    <h2>Column Bar</h2>
    <div class="chart_item">
      <div ref="barXRef" style="width: 100%; height: 100%"></div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { BarX } from "@/components/Charts/index";
export default {
  setup() {
    const barXRef = ref(null);

    onMounted(() => {
      new BarX(barXRef.value, {});
    });

    return {
      barXRef,
    };
  },
};
</script>

<style lang="sass" scoped>
.column_bar
  width: 100%
  height: 100%
  h2
    @include font_color("font_color_01")
  .chart_item
    width: 100%
    height: 400px
</style>