import Map from "../Map";
const qs = require('../../../assets/mock/qs.json')
export default class MapGis extends Map {
    mapBox: any = {};
    /**
     * @地图标点展示类型
     * hexagonal 六边形
     * porintLayer 原点
     */
    mapLayerType = "hexagonal";
    constructor(el: any, option: any) {
        super(el, option);
        this.loadActionElement();
        this.init();
    }

    // 弹出框
    popup = new this.$map.Popup({
        closeButton: false,
        closeOnClick: false,
        className: "map-popup-class"
    });
    init() {
        this.$map.accessToken =
            "pk.eyJ1IjoiYnVsaW5nYnVsaW5nIiwiYSI6ImNrdWhvaGc2azAwZGcydW84MXpmN3JnZXoifQ.REHwfwDkW72Zl17GMlMlFw";
        this.myMapbox = new this.$map.Map({
            container: this.mapBox,
            boxZoom: true,
            zoom: 5,
            style: "mapbox://styles/mapbox/dark-v10",
            antialias: true // create the gl context with MSAA antialiasing, so custom layers are antialiased
        });
        // //引用mapbox-gl和deck.gl的类库
        console.log(this.$dl)
        console.log(this.$dm)
        this.loadMap();
    }

    loadMap() {
        this.myMapbox.on("load", () => {
            this.myMapbox.flyTo({
                center: this.option.center
                    ? this.option.center
                    : [139.66498106718063, 35.78875479722508]
            });
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
            // add the layer to map
            this.myMapbox.addLayer(layer);

            this.myMapbox.on("click", (e: any) => {
                this.handleClick(e);
            });
        });
    }
    // 处理六边形数据
    loadHexagonOption() {
        const list = qs.data.map((item: any) => {
            return {
                ...item,
                code: JSON.parse(
                    item[this.option?.position?.columnName ?? "position"]
                )
            };
        });
        this.getMorePoint(list);
    }
    getMorePoint(list: any) {
        // 获取六边形坐标点
        // const bbox = [143, 32, 132, 42];
        const bbox = [140, 35, 139, 36];
        const cellSide = 1;
        const options = { units: "kilometers" };
        const polygon = this.$dl.hexGrid(bbox, cellSide, options);
        const mapColumnName = this.option.chartOption.mapGis.columnName;
        const mapColumnTypeList = this.option.chartOption.mapGis.columnTypeList;

        polygon.features.map((item: any, index: any) => {
            item.properties.value = 0;
            item.properties.id = index;
            item.properties.color = "#FFB300";
            item.properties.opacity = 0.2;

            item.properties.valueMap = {};
            mapColumnTypeList.map((titem: any) => {
                item.properties.valueMap[titem[mapColumnName]] = 0;
            });
            list.map((sitem: any) => {
                var pt = this.$dl.point(sitem.code);
                var poly = this.$dl.polygon(item.geometry.coordinates);
                if (this.$dl.booleanPointInPolygon(pt, poly)) {
                    item.properties.value += 1;
                    if (mapColumnName) {
                        mapColumnTypeList.map((titem: any) => {
                            if (sitem[mapColumnName] === titem[mapColumnName]) {
                                item.properties.valueMap[
                                    titem[mapColumnName]
                                ] += 1;
                            }
                        });
                    }
                }
            });
        });
        this.renderHexagon(polygon);
    }
    // 渲染六边形
    renderHexagon(polygon: any) {
        // 旋转六边形
        // const resultPolygon = {
        //   type: "FeatureCollection",
        //   features: polygon.features.map((item) => {
        //     const poly = this.$dl.polygon(item.geometry.coordinates);
        //     const rotateOptions = {};
        //     item = this.$dl.transformRotate(poly, 30, rotateOptions);
        //     return {
        //       ...item,
        //     };
        //   }),
        // };

        this.myMapbox.addSource(`maine`, {
            type: "geojson",
            data: polygon
        });
        // 添加六边形
        this.myMapbox.addLayer({
            id: `maine-layer`,
            type: "fill",
            source: `maine`, // reference the data source
            paint: {
                "fill-color": ["get", "color"], // blue color fill
                "fill-opacity": [
                    "case",
                    ["<", ["get", "value"], 0],
                    0.1,
                    ["<", ["get", "value"], 10],
                    0.2,
                    ["<", ["get", "value"], 20],
                    0.3,
                    ["<", ["get", "value"], 30],
                    0.4,
                    ["<=", ["get", "value"], 40],
                    0.5,
                    0.6 // 默认值
                ]
            },
            filter: [">", "value", 0]
            //   layout: {},
        });
        // 添加文字
        // this.myMapbox.addLayer({
        //     id: `maine-label`,
        //     type: "symbol",
        //     source: `maine`, // reference the data source
        //     filter: [">", "value", 0],
        //     layout: {
        //         "text-field": ["get", "value"],
        //         "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
        //         "text-size": 10
        //     },
        //     paint: {
        //         "text-color": "#fff"
        //     }
        // });
        this.mapLayerType = "hexagonal";
    }

    // 点击事件
    handleClick(e: any) {
        this.removeLayer(["maine-outline"]);
        this.removeSource(["maine-item"]);

        if (this.myMapbox.getLayer("maine-layer")) {
            var features = this.myMapbox.queryRenderedFeatures(e.point, {
                layers: ["maine-layer"]
            });
            if (this.myMapbox.getSource("maine-item")) {
                this.myMapbox.removeLayer("maine-outline");
                this.myMapbox.removeSource("maine-item");
            }
            if (features.length) {
                this.myMapbox.setZoom(10);
                this.myMapbox.flyTo({
                    center: e.lngLat
                });
                this.myMapbox.addSource("maine-item", {
                    type: "geojson",
                    data: {
                        type: "Feature",
                        geometry: {
                            type: "Polygon",
                            // These coordinates outline Maine.
                            coordinates: features[0].geometry.coordinates
                        }
                    }
                });
                // 添加外边框
                this.myMapbox.addLayer({
                    id: "maine-outline",
                    type: "line",
                    source: "maine-item",
                    layout: {},
                    paint: {
                        "line-color": "#fff",
                        "line-width": 2
                    }
                });
                const mapColumnName = this.option.chartOption.mapGis.columnName;
                let description = `<div class='title'>${mapColumnName}</div>`;
                if (mapColumnName) {
                    const valueMap = JSON.parse(
                        features[0].properties.valueMap
                    );
                    Object.keys(valueMap).map(item => {
                        description += `<div class='item'><span>${item}：</span><span>${valueMap[item]}</span></div>`;
                    });
                } else {
                    description += `<div class='item'><span>Count：</span><span>${features[0].properties.value}</span></div>`;
                }
                const coordinates = e.lngLat;
                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] +=
                        e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                this.popup
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(this.myMapbox);
            } else {
                this.popup.remove();
            }
        }
    }

    // 切换显示类型
    toggleType(option: any) {
        this.removeLayer([
            "maine-layer",
            "maine-outline",
            "maine-label",
            "population"
        ]);
        this.removeSource(["maine", "maine-item", "ethnicity"]);
        this.popup.remove();
        this.option = { ...this.option, ...option };

        if (Object.keys(this.myMapbox).length) {
            this.loadHexagonOption();
            this.myMapbox.setZoom(this.option.zoom);
            this.myMapbox.flyTo({
                center: this.option.center
            });
        }
    }

    loadActionElement() {
        this.$el.innerHTML = "";
        this.$el.style = "width: 100%;height: 100%;position: relative;";
        this.mapBox = document.createElement("div");
        this.mapBox.style = "width: 100%;height: 100%;";
        const actionList = document.createElement("div");
        actionList.className = "action-list";
        const zoomList = document.createElement("div");
        zoomList.className = "zoom-list";
        const zoomBigItem = document.createElement("img");
        zoomBigItem.src = require(`@/assets/icon/zoom-big.png`);
        zoomBigItem.addEventListener("click", () => {
            const currentZoom = this.myMapbox.getZoom();

            this.myMapbox.setZoom(currentZoom + 1);
        });

        const zoomSmallItem = document.createElement("img");
        zoomSmallItem.src = require(`@/assets/icon/zoom-small.png`);
        zoomSmallItem.addEventListener("click", () => {
            const currentZoom = this.myMapbox.getZoom();

            this.myMapbox.setZoom(currentZoom - 1);
        });

        zoomList.appendChild(zoomBigItem);
        zoomList.appendChild(zoomSmallItem);
        const locationAction = document.createElement("img");
        locationAction.className = "location-action";
        locationAction.src = require(`@/assets/icon/current-ocation-arker.png`);
        locationAction.addEventListener("click", () => {
            navigator.geolocation.getCurrentPosition(res => {
                this.myMapbox.flyTo({
                    center: res
                        ? [res.coords.longitude, res.coords.latitude]
                        : [139.66498106718063, 35.78875479722508]
                });
                new this.$map.Marker()
                    .setLngLat([res.coords.longitude, res.coords.latitude])
                    .addTo(this.myMapbox);
            });
        });

        const toggleAction = document.createElement("img");
        toggleAction.className = "toggle-action";
        toggleAction.src = require(`@/assets/icon/map-views.png`);
        toggleAction.addEventListener("click", () => {
            this.mapLayerType =
                this.mapLayerType === "porintLayer"
                    ? "hexagonal"
                    : "porintLayer";
            this.toggleType({
                center: [139.66498106718063, 35.78875479722508],
                zoom: 5
            });
        });

        actionList.appendChild(zoomList);
        actionList.appendChild(locationAction);
        actionList.appendChild(toggleAction);
        this.$el.appendChild(this.mapBox);
        this.$el.appendChild(actionList);
    }
}
