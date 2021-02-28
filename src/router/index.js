import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'

Vue.use(Router)

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

]

const router = new Router({
  mode: 'history',
  routes
})

// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   // to 将要访问的路径
//   // from 代表从哪个路径跳转而来
//   // next 是个函数 代表放行
//   //   next()  放行  next('/login') 强制跳转
//   // 登录页面放行

//   if (to.path === '/login') next()
//   // 获取 token
//   const token = JSON.parse(window.sessionStorage.getItem('userInfo'))
//   // debugger
//   if (token ==null) return next('/login')
//   next()
// })

export default router