import mapboxgl from "mapbox-gl";
import * as dm from "@deck.gl/mapbox";
import * as da from "@deck.gl/aggregation-layers"
import * as dc from '@deck.gl/core';
import * as turf from "@turf/turf";
const qs = require('../../../assets/mock/qs.json')
export default class HexagonLayer {

    myMapbox: any = {}
    option: any = {}
    hexLayers: any = {}
    $map: any = mapboxgl
    $dm: any = dm
    $da: any = da
    $dc: any = dc
    $turf: any = turf;

    constructor(map: any, option: any) {
        this.myMapbox = map
        this.option = option
        this.init()
    }

    init() {
        this.myMapbox.on("load", () => {
            this.myMapbox.flyTo({
                center: this.option.center
                    ? this.option.center
                    : [139.66498106718063, 35.78875479722508]
            });
            this.createLayer();
            this.loadHexLayers();
            // new PointLayer(this.myMapbox, this.$el, this.option);
            this.myMapbox.flyTo({
                center: [139.66498106718063, 35.78875479722508]
            });

            // console.log(this.myMapbox.getStyle().layers, 38)
            // this.removeLayer(this.myMapbox.getStyle().layers.map((item: any) => item.id))
        });
        this.myMapbox.on("zoom", () => {
            console.log(this.myMapbox.getZoom())
            this.setZoom()
        });
    }



    // 创建layer
    createLayer() {
        const { HexagonLayer } = this.$da;
        this.hexLayers = [
            new HexagonLayer({
                id: "hexagon-layer",
                data: qs.data.features,
                coverage: 0.88,
                pickable: true,
                colorRange: [
                    [255, 179, 0, 40],
                    [255, 179, 0, 80],
                    [255, 179, 0, 120],
                    [255, 179, 0, 160]
                ],
                extruded: false,
                radius: 4000, // 六角半径，以米为单位
                elevationScale: 4,
                zIndex: 9,
                // autoHighlight: true,
                highlightColor: () => [255, 179, 0],
                getPosition: (d: any) => d.geometry.coordinates
            })
        ];
    }
    
    loadHexLayers() {
        const { MapboxLayer } = this.$dm;
        const { Deck } = this.$dc;
        const deckLayer = new Deck({
            gl: this.myMapbox.painter.context.gl,
            _animate: true,
            layers: this.hexLayers
        });
        this.myMapbox.addLayer(
            new MapboxLayer({
                id: "hexagon-layer",
                deck: deckLayer
            })
        );
        setTimeout(() => {
            this.myMapbox.addSource("hex-maine", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: this.formatHexBorderData()
                }
            });
            this.myMapbox.addSource("hex-point-maine", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: this.formatHexLabelData()
                }
            });
            
            console.log(this.formatHexBorderData())
            console.log(this.formatHexLabelData())
            this.createHexBorder()
        }, 1000);
    }

    
    createHexBorder() {
        // 添加外边框
        this.myMapbox.addLayer({
            id: "hex-outline",
            type: "line",
            source: "hex-maine",
            layout: {},
            paint: {
                "line-color": "#ffb300",
                "line-width": 1
            }
        });
        // this.myMapbox.addLayer({
        //     id: `hex-label`,
        //     type: "symbol",
        //     source: `hex-maine`, // reference the datasource
        //     filter: [">", "count", 50],
        //     layout: {
        //         "text-field": ["get", "count"],
        //         "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
        //         "text-size": 12,
        //         "text-allow-overlap": false
        //     },
        //     paint: {
        //         "text-color": "#fff"
        //     }
        // });
    }

    // 格式化六边形边框数据
    formatHexBorderData() {
        const [columnLayer] = this.hexLayers[0].getSubLayers();
        const hexList = columnLayer.props.data;
        const resultList = [];
        for (const i of hexList) {
            const circle = this.getHexBorderPoint(i.position);
            circle.properties.count = i.points.length;
            resultList.push(circle);
        }
        return resultList;
    }
    // 格式化六边形边中心数字数据
    formatHexLabelData() {
        const [columnLayer] = this.hexLayers[0].getSubLayers();
        const hexList = columnLayer.props.data;
        const resultList = [];
        for (const i of hexList) {
            const circle = {
                geometry: {
                    type: 'Point',
                    coordinates: i.position
                },
                properties: {
                    count: i.points.length
                },
                type: 'Feature'
            };
            resultList.push(circle);
        }
        return resultList;
    }

    
    // 获取六边形六个点
    getHexBorderPoint(position: any) {
        const options = { steps: 6, units: "kilometers" };
        const radius = 4
        const circle = this.$turf.circle(position, radius, options);
        return circle
    }


    setZoom() {
        if (this.myMapbox.getLayer("hex-label")) {
            this.myMapbox.removeLayer("hex-label");
        }
        if (this.myMapbox.getLayer("hex-point")) {
            this.myMapbox.removeLayer("hex-point");
        }
        if (this.myMapbox.getSource("hex-point-maine")) {
            this.myMapbox.addLayer({
                id: `hex-point`,
                type: "circle",
                source: `hex-point-maine`, // reference the datasource
                // filter: [">", "count", 50],
                "paint": {
                    "circle-radius": 10,
                    "circle-color": {
                        "property": "point_count",
                        //"type": "identity",
                        "stops": [
                          [0, "rgba(236,222,239,0)"],
                          [3, "rgb(236,222,239)"],
                          [5, "rgb(208,209,230)"],
                          [9, "rgb(166,189,219)"],
                          [15, "rgb(103,169,207)"],
                          [20, "rgb(28,144,153)"],
                          [25, "rgb(1,108,89)"]
                        ]
                    },
                    "circle-stroke-color": "white",
                    "circle-stroke-width": 1,
                    "circle-opacity": {
                        "stops": [
                            [21, 0],
                            [23, 1]
                        ]
                    }
                }
                // layout: {
                //     "text-field": ["get", "count"],
                //     "text-font": [
                //         "Open Sans Bold",
                //         "Arial Unicode MS Bold"
                //     ],
                //     "text-size": parseInt(this.myMapbox.getZoom() + 4)
                // },
                // paint: {
                //     "text-color": "#fff"
                // }
            });
            this.myMapbox.addLayer({
                id: `hex-label`,
                type: "symbol",
                source: `hex-point-maine`, // reference the datasource
                // filter: [">", "count", 50],
                layout: {
                    "text-field": ["get", "count"],
                    "text-font": [
                        "Open Sans Bold",
                        "Arial Unicode MS Bold"
                    ],
                    "text-size": parseInt(this.myMapbox.getZoom() + 4)
                },
                paint: {
                    "text-color": "#fff"
                }
            });
        }
    }

    onClickHandler(e: any) {
        console.log(e)
    }

    
    /**
     * @删除layer层
     *
     * param []<layer id>
     */
     removeLayer(layerList: [string]) {
        layerList.map((item: string) => {
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
    removeSource(sourceList: [string]) {
        sourceList.map((item: string) => {
            if (this.myMapbox.getSource(item)) {
                this.myMapbox.removeSource(item);
            }
        });
    }
}
