// 引入mockjs插件
import Mock from 'mockjs'
// 把JSON数据格式引入进来[JSON数据格式根本没有对外暴露,但是可以引入]
// webpack默认对外暴露的:图片、JSON数据格式
// 引入json文件
import newList from './newList'
import cityList from './cityList'
import selectCity from './selectCity'
import overseas from './overseas'
import chinaEpidemic from './chinaEpidemic'
import worldEpidemic from './worldEpidemic'
import newList2 from '@/mock/newList2.json'
import covCity from '@/mock/covCity'
import selectProvince from '@/mock/selectProvince'
// mock数据:第一个参数请求地址 第二个参数:请求数据
// 风险地区
Mock.mock( '/mock/newList' , { code:200 , data:newList } )

Mock.mock( '/mock/cityList' , { code:200 , data:cityList } )

// 选择城市
Mock.mock( '/mock/selectCity' , { code:200 , data:selectCity } )

// 海外疫情
Mock.mock( '/mock/overseas' , { code:200 , data:overseas } )

// 中国地图
Mock.mock( '/mock/chinaEpidemic' , { code:200 , data:chinaEpidemic } )

// 世界地图
Mock.mock( '/mock/worldEpidemic' , { code:200 , data:worldEpidemic } )

// 疫情热点详情
Mock.mock('/mock/newList2' , "get" , function (options) {
  let { id } = JSON.parse( options.body )
  const detailList = newList2.filter( item => item.id === id )
  return {
    code : 200 , 
    message : '请求成功', 
    detailList
  }
})

// 31省疫情数据
Mock.mock( '/mock/covCity' , { code:200 , data:covCity } )

// 查询某省数据
Mock.mock('/mock/selectProvince' , "get" , function ( options ) {
  let { id , city } = JSON.parse(options.body) //前端接受城市id
  console.log( id , city )
  const arr = selectProvince.filter( item => item.id === id ) //操作的数据
  return {
    code : 200 , 
    message : '请求成功', 
    arr
  }
})










