import mapboxgl from "mapbox-gl";
import * as dl from "@deck.gl/layers";
import * as dm from "@deck.gl/mapbox";
import * as da from "@deck.gl/aggregation-layers"
import * as dg from "@deck.gl/geo-layers"
export default class Map {
    $el: any = {};
    $map: any = {};
    $dl: any = dl;
    $dm: any = dm;
    $da: any = da
    $dg: any = dg
    myMapbox: any = {};
    option: any = {};

    constructor(el: any, option: any) {
        this.$el = el;
        this.$map = mapboxgl;
        this.option = option;
    }

    reloadMap(option: any) {
        console.log(option);
        console.log("toggle");
    }

    /***
     * 16进制转rgba
     * @param colors
     * @param opacity
     * @returns {string}
     */
    colorRgb(colors: String, opacity: Number) {
        if (colors) {
            // 16进制颜色值的正则
            const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            // 把颜色值变成小写
            const color = colors.toLowerCase();

            if (reg.test(color)) {
                const colorChange = [];

                for (let i = 1; i < 7; i += 2) {
                    colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
                }
                return `rgba(${colorChange.join(",")},${opacity})`;
            } else {
                return color;
            }
        }
    }

    /**
     * @删除layer层
     *
     * param []<layer id>
     */
    removeLayer(layerList: String[]) {
        layerList.map(item => {
            if (this.myMapbox.getLayer(item)) {
                this.myMapbox.removeLayer(item);
            }
        });
    }
    /**
     * @删除source层
     *
     * param []<source id>
     */
    removeSource(sourceList: String[]) {
        sourceList.map(item => {
            if (this.myMapbox.getSource(item)) {
                this.myMapbox.removeSource(item);
            }
        });
    }
    /***
     * 销毁
     */
    destroy() {
        this.$el.innerHTML = "";
    }
}
