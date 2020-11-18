import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import LayoutFlow from '@/components/layout/layout-flow.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    component: LayoutFlow,
    redirect: '/ai-img',
    meta: {
      title: 'AiImg'
    },
    children: [
      {
        path: 'ai-img',
        name: 'AiImg',
        component: () => import('../views/ai-img/ai-img.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched[0].meta && to.matched[0].meta.title) {
    window.document.title = to.matched[0].meta.title + '-flyyang';
  }
  next();
})

export default router
