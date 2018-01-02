import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import polygon from '@/components/polygon'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/HelloWorld',
    name: 'HelloWorld',
    component: resolve => require(['@/components/HelloWorld'], resolve)// 异步懒加载
  },
  {
    path: '/',
    name: 'polygon',
    component: resolve => require(['@/components/polygon'], resolve)
    // component: polygon
  }
  ]
})
