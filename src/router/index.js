import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import register  from "@/views/register";
import person  from "@/views/person";
import myCollection from "@/components/person/myCollection";
import myInfo from "@/components/person/myInfo";
import myRelease from "@/components/person/myRelease";

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
		path: '/',
		name: 'index',
		component:index,
		redirect:'/index',
		meta: {
			requiedLogin: true
		}
	},
  {
    path: '/index',
    name:'index',
    component: index
  },
  {
    path:'/register',
    name:'register',
    component: register  //注册界面
  },
  {
    path:'/person',
    name:'person',
    component: person,  //个人中心界面
    children:[
      {
        path: '/person/myCollection',//我的收藏
        name:'myCollection',
        component: myCollection,
      },
      {
        path: '/person/myInfo', //我的信息
        name:'myInfo',
        component: myInfo,
      },
      {
        path: '/person/myRelease', //我的发布
        name:'myRelease',
        component: myRelease,
      },
    ]
  }

]

const router = new Router({
  mode: 'history',
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是个函数 代表放行
  //   next()  放行  next('/login') 强制跳转
  // 登录页面放行
  const token = JSON.parse(window.localStorage.getItem('userInfo'))
  if (to.path === '/person') {
    // 获取 token
    if (token ==null)
    {
      return next('/index')
    } 
    next()
  }
  
  
  // debugger
  
  next()
})

export default router