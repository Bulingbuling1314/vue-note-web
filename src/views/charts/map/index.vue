<template>
    <div ref="mapRef"></div>
</template>

<script>
import { onMounted, ref } from "vue";
import { MapGis } from "@/components/Charts/index";
export default {
    setup() {
        const mapRef = ref(null);

        onMounted(() => {
            setTimeout(() => {
                new MapGis(mapRef.value, {});
            })
        });

        return {
            mapRef,
        };
    },
};
</script>

<style>
</style>