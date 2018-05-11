import Vue from 'vue'
import Router from 'vue-router'
import root from '#/body/main'
import plugin from '#/body/plugin'

Vue.use(Router);

//配置全局路由
const routers = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home', // 重定向
    },
    {
      path: '/home',
      name: 'home',
      component: root,
      children: []
    },
    {
      path: '/plugin',
      name: 'plugin',
      component: plugin
    },
  ]
});

routers.beforeEach((to, from, next) => {
  // console.log('router each');
  next()
});

export default routers;

