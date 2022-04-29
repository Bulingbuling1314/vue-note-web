<template>
    <div :style="{ background: 'rgba(0, 0, 0, 0.85)', padding: '26px 16px 16px' }">
        <a-button
            type="primary"
            ghost
            @click="changeMap('GeoJsonLayer')"
        >GeoJsonLayer</a-button>
        <a-button
            type="dashed"
            ghost
            @click="changeMap('HexagonLayer')"
        >HexagonLayer</a-button>
        <a-button
            type="primary"
            danger
            ghost
            @click="changeMap('H3ClusterLayer')"
        >H3ClusterLayer</a-button>
        <a-button
            ghost
            @click="changeMap('ScreenGridLayer')"
        >ScreenGridLayer</a-button>
    </div>
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
    methods: {
        changeMap(type) {
            new MapGis(this.mapRef, { type });
        }
    }
};
</script>

<style>
</style>