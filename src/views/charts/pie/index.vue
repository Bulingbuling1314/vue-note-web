<template>
  <div class="pie">
    <h2>Pie</h2>
    <div class="chart_group">
      <div class="chart_item">
        <div ref="cakeRef" style="width: 100%; height: 100%"></div>
      </div>
      <div class="chart_item">
        <div ref="ringRef" style="width: 100%; height: 100%"></div>
      </div>
      <div class="chart_item">
        <div ref="roseRef" style="width: 100%; height: 100%"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { PieCake, PieRing, PieRose } from "@/components/Charts/index";
export default {
  setup() {
    const cakeRef = ref(null);
    const ringRef = ref(null);
    const roseRef = ref(null);

    onMounted(() => {
      new PieCake(cakeRef.value, {});
      new PieRing(ringRef.value, {});
      new PieRose(roseRef.value, {});
    });

    return {
      cakeRef,
      ringRef,
      roseRef,
    };
  },
};
</script>

<style lang="sass" scoped>
.pie
  width: 100%
  height: 100%
  .chart_group
    height: 100%
    overflow-y: auto

  .chart_item
    width: 100%
    height: 600px
    margin-bottom: 50px
</style>