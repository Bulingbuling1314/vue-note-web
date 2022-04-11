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
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar',
                    showBackground: true,
                }
            ]
        }
    }
}