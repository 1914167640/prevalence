const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true , 
  productionSourceMap : false , //打包时不需要map文件   
  lintOnSave: false , // 关闭效验
  devServer : {
    open : true , 
    host : 'localhost' , 
    port : 8080 , 
    proxy : {
      "/api" : {
        target : "http://apis.juhe.cn" , 
        ws : true , 
        changeOrigin:true , 
        pathRewrite: {
          '^/api':''
        }
      }
    }
  }

})
