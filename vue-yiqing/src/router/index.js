import VueRouter from "vue-router"
import Vue  from "vue"
import citys from '@/view/citys/citys'
// 路由也是一个插件
Vue.use(VueRouter)

//解决vue路由重复导航错误
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this , location).catch(err => err)
}

const route = new VueRouter({
  routes:[
    // 导航国内或国外
    {
      path : '/viewNav' , 
      component : () => import('@/view/viewNav') , 
    } , 
    // 城市列表
    {
      path:'/selectCity' , 
      component : () => import('@/view/selectCity') , 
      meta : {
        isHeader : false
      }
    } , 
    // 点击跳转详情页面
    {
      name :'Detail' , 
      path : '/Detail/:id' , 
      component : () => import('@/view/Detail') , 
      props : true , 
      meta : {
        isHeader : false
      }
    } , 
    // 点击查看更多跳转更多列表
    {
      path : '/moreList' , 
      component : () => import('@/view/moreList') , 
      meta : {
        isHeader : false
      }
    } , 
    // 国内数据(首页)
    {
      path : '/Home' , 
      component : () => import('@/view/Home') , 
      meta : {
        isHeader : true
      }
    } , 
    // 国外数据
    {
      path : '/foreign' , 
      component : () => import('@/view/foreign') , 
      meta : {
        isHeader : true
      }
    } ,
    // 风险地区
    {
      path : '/risk' , 
      component : () => import('@/view/HomeIconSkip/risk')
    } , 
    //Home跳转核酸检测
    {
      path : '/HomeIconSkip' , 
      component : () => import('@/view/HomeIconSkip/hesuan') , 
      meta : {
        isHeader : false
      }
    } , 
    // 防疫物资
    {
      path : '/prevention' , 
      component : () => import('@/view/HomeIconSkip/prevention') , 
      meta : {
        isHeader : false
      }
    } , 
    // 出行政策
    {
      path : '/travel' , 
      component : () => import('@/view/HomeIconSkip/travel') , 
      meta : {
        isHeader : false
      }
    } , 
    // 点击中国地图跳转城市列表页面
    {
      path : '/citys/:name?' , 
      component : citys , 
      props : true ,
      meta : {
        isHeader : false
      }
    } , 
    // 路由重定向到国内数据
    {
      path : '/' , 
      component : () => import('@/view/Home') ,
      meta : {
        isHeader : true
      }
    } 
  ] , 
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  }
})
export default route