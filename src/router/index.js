import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/HelloWorld',
    name: 'HelloWorld',
    component: resolve => require(['@/components/HelloWorld'], resolve)
  },
  {
    path: '/',
    name: 'polygon',
    component: resolve => require(['@/components/polygon'], resolve)
  }
  ]
})
