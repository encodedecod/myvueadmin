import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login.vue'
import tianjinList from '../views/list/tianjinlist.vue'
import shanghaiList from '../views/list/shanghailist.vue'
import chengduList from '../views/list/chengdulist.vue'
import Register from '../views/register/register.vue'
import UserList from '../views/user/userlist.vue'
import UserPower from '../views/user/userpower.vue'
import Main from '../views/main.vue'
Vue.use(VueRouter)

const routes: RouteConfig[]  = [
  {
    path: '/',
    name: 'login',
    component: Login,
    
   
    },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    children:[
      { name: 'home', path: '/Home', component: Main },
     { name: 'tianjin', path: '/tianjin/list', component: tianjinList },
     { name: 'shaghai', path: '/shanghai/list', component: shanghaiList },
     { name: 'chengdu', path: '/chengdu/list', component: chengduList },
     {name:'userlist',path:'/myuserlist/list',component:UserList},
     {name:'userpower',path:'/userpower/list',component:UserPower}
      // { name: 'courses-crud', path: '/:resource/list', component: ResourceCrud, props: true },
    ]
   
  }
 
]

const router = new VueRouter({
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转

  if (to.path === '/') return next()
  if(to.path==='/register') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr||tokenStr=='undefined') return next('/')
  next()
})
export default router
