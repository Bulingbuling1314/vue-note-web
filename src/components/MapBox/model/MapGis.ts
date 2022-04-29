import Map from "../Map";
import GeoJsonLayer from "../layer/GeoJsonLayer";
import HexagonLayer from "../layer/HexagonLayer";
import H3ClusterLayer from "../layer/H3ClusterLayer";
import ScreenGridLayer from "../layer/ScreenGridLayer";
interface mapType {
    [key: string]: any
    GeoJsonLayer: any
    HexagonLayer: any
    H3ClusterLayer: any
    ScreenGridLayer: any
}
export default class MapGis extends Map {
    mapBox: any = {};
    mapType: mapType = {
        'GeoJsonLayer': GeoJsonLayer,
        'HexagonLayer': HexagonLayer,
        'H3ClusterLayer': H3ClusterLayer,
        'ScreenGridLayer': ScreenGridLayer
    }
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
        // console.log(this.$dl, 'dl')
        // console.log(this.$dm, 'dm')
        // console.log(this.$da, 'da')
        // console.log(this.$dg, 'dg')
        this.loadMap();
    }

    loadMap() {
        this.myMapbox.on("load", () => {
            this.myMapbox.flyTo({
                center: this.option.center
                    ? this.option.center
                    : [139.66498106718063, 35.78875479722508]
            });
            const typeStr: string = this.option.type
            if(!typeStr) {
                new HexagonLayer(this.myMapbox, {})
            } else {
                new this.mapType[typeStr](this.myMapbox, {})
            }
            // new GeoJsonLayer(this.myMapbox, {})
            // new HexagonLayer(this.myMapbox, {})
            // new H3ClusterLayer(this.myMapbox, {})
            // new ScreenGridLayer(this.myMapbox, {})

            this.myMapbox.on("click", (e: any) => {
                this.handleClick(e);
            });
        });
    }
    // 点击事件
    handleClick(e: any) {
        console.log(e)
        
        var features = this.myMapbox.queryRenderedFeatures(e.point, {
            layers: ["hexagon-layer"]
        });
        console.log(features)
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
    }

    loadActionElement() {
        this.$el.innerHTML = "";
        this.$el.style = "width: 100%;height: calc(100% - 74px);position: relative;";
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
