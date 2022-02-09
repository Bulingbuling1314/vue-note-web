const path = require("path");   //引入path模块

function resolve(dir){
    return path.join(__dirname, dir)    //path.join(__dirname)设置绝对路径
}

module.exports = {
    publicPath: "./",
    assetsDir: "static",
    productionSourceMap: false,
    chainWebpack: config =>{
        config.plugin('html')
        .tap(args => {
            args[0].title = "Bulingbuling";
            return args;
        })
        config.resolve.alias
       .set('@',resolve('./src'))
    },
    devServer: {
        port: 8099,
        // proxy: {
        //     "/api": {
        //         target: "http://localhost:8089/",
        //         ws: false,
        //         changeOrigin: true
        //     },
        // }
    }
 }