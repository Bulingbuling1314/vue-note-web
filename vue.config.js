const path = require('path') //引入path模块

function resolve(dir) {
    return path.join(__dirname, dir) //path.join(__dirname)设置绝对路径
}

module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/style/theme/index.scss";`,
            },
        },
    },
    chainWebpack: (config) => {
        config.plugin('html').tap((args) => {
            args[0].title = 'Bulingbuling'
            return args
        })
        config.resolve.alias.set('@', resolve('./src'))
    },
    devServer: {
        disableHostCheck: false,
        host: '0.0.0.0',
        port: 8100,
        proxy: {
            '/bb': {
                target: 'http://localhost:8098/bb',
                // target: 'http://www.web.liubingbing.xyz:8098/bb',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/bb': '',
                },
            },
        },
    },
}
