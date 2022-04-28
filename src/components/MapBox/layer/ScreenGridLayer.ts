import * as dm from "@deck.gl/mapbox";
import * as da from "@deck.gl/aggregation-layers"
export default class ScreenGridLayer {

    myMapBox: any = {}
    option: any = {}
    $dm: any = dm
    $da: any = da

    constructor(map: any, option: any) {
        this.myMapBox = map
        this.option = option
        this.init()
    }

    init() {
        console.log(this.$da)
        const { MapboxLayer } = this.$dm
        const { ScreenGridLayer } = this.$da
        const layer = new MapboxLayer({
            id: 'screenGridLayer-layer',
            type: ScreenGridLayer,
            data: [
                [120.8594,31.4599,1],
                [120.7737,31.6317,1],
                [120.7553,31.5262,1],
                [120.7039,31.2549,1],
                [120.6957,31.6527,1],
                [120.6876,31.3457,1],
                [120.6751,31.3749,1],
                [120.6681,31.3084,1],
                [120.6659,31.3343,1],
                [120.662,31.3472,1],
                [120.6616,31.3479,1],
                [120.6612,31.3461,2],
                [120.6607,31.3455,1],
                [120.6604,31.3514,1],
                [120.6603,31.3432,2],
                [120.6602,31.3431,1],
                [120.6599,31.3438,1],
                [120.6594,31.3498,1],
                [120.6582,31.4638,1],
                [120.6574,31.3503,1],
                [120.656,31.5715,1]
            ],
            minZoom: 0,
            maxZoom: 19,
            opacity: 0.8,
            getPosition: (d: any) => [d[0], d[1]],
            getWeight: (d: any) => d[2],
            cellSizePixels: 10,
            colorRange: [
                [255, 255, 178, 25],
                [254, 217, 118, 85],
                [254, 178, 76, 127],
                [253, 141, 60, 170],
                [240, 59, 32, 212],
                [189, 0, 38, 255]
            ] ,
            gpuAggregation: true,
            aggregation:'SUM'
        });
        this.myMapBox.addLayer(layer);
    }
}
