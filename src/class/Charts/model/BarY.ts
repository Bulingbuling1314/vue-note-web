import Echart from "../Echart";

export default class BarX extends Echart {
    constructor(el: any, option: any) {
        super(el, option);
        this.init();
    }


    init() {
        setTimeout(() => {
            this.myChart = this.$e.init(this.$el);
            this.setCharts();
            this.myChart.setOption(this.chartOption, true);
        })
        window.addEventListener("resize", () => {
            this.myChart.resize();
        });
    }

    setCharts() {
        this.chartOption = {
            color: this.colors,
            tooltip: {},
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
            },
            series: [
                {
                    name: '2011',
                    type: 'bar',
                    data: [18203, 23489, 29034, 104970, 131744, 630230]
                },
                {
                    name: '2012',
                    type: 'bar',
                    data: [19325, 23438, 31000, 121594, 134141, 681807]
                }
            ]
        }
    }
}