import * as dm from "@deck.gl/mapbox";
import * as dl from "@deck.gl/layers";
const qs = require('../../../assets/mock/qs.json')
export default class GeoJsonLayer {

    myMapBox: any = {}
    option: any = {}
    $dm: any = dm
    $dl: any = dl

    constructor(map: any, option: any) {
        this.myMapBox = map
        this.option = option
        this.init()
    }

    init() {
        const { MapboxLayer } = this.$dm
        const { GeoJsonLayer } = this.$dl
        const layer = new MapboxLayer({
            id: 'geojson-layer',
            type: GeoJsonLayer,
            data: qs.data,
            filled: true,
            lineWidthScale: 20,
            lineWidthMinPixels: 10,
            getFillColor: (d: any) => [245, 133, 5, 0],
            getLineColor: (d: any) => [245, 245, 245],
            getLineWidth: 1
        })
        this.myMapBox.addLayer(layer);
    }
}
