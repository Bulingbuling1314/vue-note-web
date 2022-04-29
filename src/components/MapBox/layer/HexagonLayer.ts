import mapboxgl from "mapbox-gl";
import * as dm from "@deck.gl/mapbox";
import * as da from "@deck.gl/aggregation-layers"
import * as dc from '@deck.gl/core';
const qs = require('../../../assets/mock/qs.json')
export default class HexagonLayer {

    myMapbox: any = {}
    option: any = {}
    $map: any = mapboxgl
    $dm: any = dm
    $da: any = da
    $dc: any = dc

    constructor(map: any, option: any) {
        this.myMapbox = map
        this.option = option
        this.init()
    }

    init() {
        const { Deck } = this.$dc
        const { MapboxLayer } = this.$dm
        const { HexagonLayer } = this.$da
        const layer = new MapboxLayer({
            id: 'hexagon-layer',
            type: HexagonLayer,
            data: qs.data.features,
            pickable: true,
            colorRange: [
                [255, 179, 0, 20],
                [255, 179, 0, 40],
                [255, 179, 0, 60],
                [255, 179, 0, 80],
                [255, 179, 0, 100],
            ],
            getColor: [255, 0, 0],
            diskResolution: 12,
            coverage: 0.92,
            extruded: false,
            radius: 4000, // 六角半径，以米为单位
            elevationScale: 4,
            autoHighlight: true,
            getColorValue: (points: any) => {
                return points.length;
            },
            highlightColor: (d: any) => [255, 179, 0],
            getPosition: (d: any) => d.geometry.coordinates,
            onClick: (d: any) => this.onClickHandler(d),
            onSetColorDomain: (d: any) => {
                console.log(d)
            }
        })
        this.myMapbox.addLayer(layer, 'waterway-label');
    }


    onClickHandler(e: any) {
        console.log(e)
        var features = this.myMapbox.queryRenderedFeatures(e.pixel, {
            layers: ["hexagon-layer"]
        });
        console.log(features)
        // this.popup
        // .setLngLat(item.coordinate)
        // .setHTML(item.object.points.length)
        // .addTo(this.myMapbox);
    }
}
