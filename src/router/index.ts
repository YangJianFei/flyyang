import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import LayoutFlow from '@/components/layout/layout-flow.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: LayoutFlow,
    redirect: '/home',
    meta: {
      title: 'AiImg'
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: 'ai-img',
        name: 'AiImg',
        component: () => import('../views/ai-img/ai-img.vue')
      },
      {
        path: 'ai-create',
        name: 'AiCreate',
        component: () => import('../views/ai-create/ai-create.vue')
      },
      {
        path: 'ai-magic',
        name: 'AiMagic',
        component: () => import('../views/ai-magic/ai-magic.vue')
      },
      {
        path: 'ai-compose',
        name: 'AiCompose',
        component: () => import('../views/ai-compose/ai-compose.vue')
      },
      {
        path: 'ai-about',
        name: 'AiAbout',
        component: () => import('../views/About.vue')
      },
      {
        path: '404',
        name: 'NotFound',
        component: () => import('../components/tip/not-found.vue')
      }
    ]
  },
  {
    path: '*',
    redirect: '/404'
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
