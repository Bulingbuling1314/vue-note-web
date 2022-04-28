import * as dm from "@deck.gl/mapbox";
import * as dg from "@deck.gl/geo-layers"
const qs = require('../../../assets/mock/qs.json')
export default class H3ClusterLayer {

    myMapBox: any = {}
    option: any = {}
    $dm: any = dm
    $dg: any = dg

    constructor(map: any, option: any) {
        this.myMapBox = map
        this.option = option
        this.init()
    }

    init() {
        const { MapboxLayer } = this.$dm
        const { H3ClusterLayer } = this.$dg
        const layer = new MapboxLayer({
            id: 'hexagon-layer',
            type: H3ClusterLayer,
            data: [
                {
                    mean: 73.333,
                    count: 440,
                    hexIds: [
                        '88283082b9fffff',
                        '88283082b1fffff',
                        '88283082b5fffff',
                        '88283082b7fffff',
                        '88283082bbfffff',
                        '882830876dfffff'
                    ]
                }
            ],
            pickable: true,
            stroked: true,
            filled: true,
            extruded: false,
            getHexagons: (d: any) => d.hexIds,
            getFillColor: (d: any) => [255, (1 - d.mean / 500) * 255, 0],
            getLineColor: [255, 255, 255],
            lineWidthMinPixels: 2
        })
        this.myMapBox.addLayer(layer);
    }
}
