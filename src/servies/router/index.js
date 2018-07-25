import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Demo from '@/views/Demo'
import selectDate from '@/views/selectDate'
import pagination from '@/views/pagination'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/hello'
    },
    {
      path: '/hello',
      name: 'hello',
      component: HelloWorld
    },
    {
      path: '/demo',
      name: 'Demo',
      component: Demo,
      children: [{
          path: 'date',
          name: 'Date',
          component: selectDate
        },
        {
          path: 'pagination',
          name: 'pagination',
          component: pagination
        }
      ]
    },
    {
      path: '*',
      redirect: '/demo'
    },
  ]
})
