<template>
  <div class="line">
    <h2>Line</h2>
    <div class="chart_item">
      <div ref="lineRef" style="width: 100%; height: 100%"></div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { Line } from "@/components/Charts/index";
export default {
  setup() {
    const lineRef = ref(null);

    onMounted(() => {
      new Line(lineRef.value, {});
    });

    return {
      lineRef,
    };
  },
};
</script>

<style lang="sass" scoped>
.line
  width: 100%
  height: 100%
  .chart_item
    width: 100%
    height: 400px
</style>