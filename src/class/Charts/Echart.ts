import * as echarts from 'echarts'

export default class Echart {
    [x: string]: any
    $el: any = {} // 图表容器
    $e: any = {} // echart 实例
    chartOption: any = {} // echart option
    myChart: any = {} // chart 实例化
    option = {} // 动态配置项
    colors = [
        "#f16e5e",
        "#44d7b6",
        "#3BABFF",
        "#A059CC",
        "#f7b500",
        "#999999",
        "#dbdbdb",
        "#65bdff",
    ];


    constructor(el: any, option: any) {
        this.$el = el;
        this.$e = echarts;
        this.option = option;
    }


    /***
     * 16进制转rgba
     * @param colors
     * @param opacity
     * @returns {string}
     */
    colorRgb(colors: string, opacity: any) {
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


    /***
     * 重载charts
     * @param option
     */
    reloadOption(option: any) {
        this.option = { ...this.option, ...option };
        try {
            this.setCharts();
        } catch {
            console.log('no setCharts!')
        }
        this.myChart.setOption(this.chartOption, true);
        setTimeout(() => {
            this.myChart.resize();
        });
    }


    /***
     * 随机获取颜色
     */

    static getRandomColor() {
        return "#" + ("00000" + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
    }


    /***
     * 销毁
     */
    destroy() {
        this.$el.innerHTML = "";
    }
}