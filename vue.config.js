
const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath:'./',
    outputDir: 'dist',
    productionSourceMap: false,
    pages: {
        index:'src/modules/index/main.js',
        mark:'src/modules/mark/main.js',
        searchnet:'src/modules/searchnet/main.js',
        clock:'src/modules/clock/main.js',
        pound:'src/modules/pound/main.js',
        user:'src/modules/user/main.js',
        carriage:'src/modules/carriage/main.js',
        explain:'src/modules/explain/main.js',
    },
    lintOnSave: false,
    chainWebpack: (config)=>{
        config.resolve.alias
            .set('@', resolve('src'))
            .set('$', resolve('public'))
            .set('assets',resolve('src/assets'))
    },
    devServer: {
        port: 8080,     // 端口
        disableHostCheck: true,//测试
        // proxy:proxyConfig.posxys,
    },   

    css: {
        extract: true,
        sourceMap: false,
        loaderOptions: {},
        modules: true
    },
    parallel: require('os').cpus().length > 1,
    pwa: {},
    pluginOptions: {
        // ...

    },
    /*webpack配置*/
    configureWebpack: {
        plugins : [],
        externals:{
            'vue': "Vue",
            'vuex':'Vuex',
            "vue-router": "VueRouter",
            "axios":'axios',
            "wx":"wx",
            "vant":"Vant",
            'AMap': 'AMap'
        }
    }

}
