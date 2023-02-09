// 当前这个模块：API进行统一的管理
import requests from "./request"
import md5 from 'md5-js'

// 模拟请求
import mockRequest from './mockRequest'

// 模拟国内疫情
const reqNewList = () => mockRequest({ url : 'newList' , method : 'get' })

// 模拟城市列表
const reqCityList = () => mockRequest({ url : 'cityList' , method : 'get' })

//模拟选择城市
const reqSelectCity = () => mockRequest({ url : 'selectCity' , method : 'get' })

// 模拟海外疫情
const reqOverseas = () => mockRequest({ url : 'overseas' , method : 'get' })

// 模拟中国地图数据
const reqChinaEpidemic = () => mockRequest({ url : 'chinaEpidemic' , method : 'get' })

// 模拟世界地图数据
const reqWorldEpidemic = () => mockRequest({ url : 'worldEpidemic' , method : 'get' })

// 模拟疫情热点详情
const reqGetList2 = ( data ) => mockRequest({ url : `newList2` , method : 'get' , data })

// 模拟31省疫情数据
const reqGetCovCity = () => mockRequest({ url : 'covCity' , method : 'get' })

// 模拟某省数据
const reqSelectProvince = (data) => mockRequest({ url : 'selectProvince' , method : 'get' , data})


// 腾讯疫情域名
const getNewsWorld = () => requests({ baseURL:"https://api.inews.qq.com" , url : '/newsqa/v1/automation/modules/list?modules=FAutoCountryConfirmAdd,WomWorld,WomAboard' ,  method : 'post' })

// 出行政策查询
const getSpringTravel = (from , to) => requests({ url : `/api/springTravel/query?key=171e165a7d991c5f6ecd5194c54778ef&from=${from}&to=${to}` ,  method : 'get' })

// 中国地图城市数据
const getCityData = (cityName) =>  {
  let md5Key = md5(`appid24727city_name${cityName}formatjson${'e9f191290a171181c280b1dd74eceb36'}`)
  return requests({ 
    baseURL:"https://oyen.api.storeapi.net" , url : `/api/94/221?format=json&appid=24727&city_name=${cityName}&sign=${md5Key}` ,  method : 'get' 
  })
}


// 海外疫情数据
// const getNewsWorld2 = () => requests({ baseURL:"https://view.inews.qq.com" , url : `/g2/getOnsInfo?name=${'disease_foreign'}` ,  method : 'get' })

// 获取城市列表
// const getCityList = () => requests({ url : '/api/springTravel/citys?key=171e165a7d991c5f6ecd5194c54778ef' ,  method : 'get' })


// 模拟疫情接口
export default {
  reqNewList , 
  getNewsWorld , 
  reqCityList , 
  getSpringTravel , 
  reqSelectCity , 
  reqOverseas , 
  reqChinaEpidemic , 
  reqWorldEpidemic , 
  getCityData , 
  reqGetList2 ,
  reqGetCovCity , 
  reqSelectProvince
} 



