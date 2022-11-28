import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

import approvalsRoute from '@/router/modules/approvals'
import attendancesRoute from '@/router/modules/attendances'
import departRoute from '@/router/modules/departments'
import employeesRoute from '@/router/modules/employees'
import permissionRoute from '@/router/modules/permission'
import salarysRoute from '@/router/modules/salarys'
import settingRoute from '@/router/modules/setting'
import socialRoute from '@/router/modules/social'

export const asyncRoutes = [
  approvalsRoute,
  attendancesRoute,
  departRoute,
  employeesRoute,
  permissionRoute,
  salarysRoute,
  settingRoute,
  socialRoute
]

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/import',
    component: Layout,
    hidden: true,
    children: [{
      path: '',
      component: () => import('@/views/import')
    }]
  }
]

// 404 page must be placed at the end !!!

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  // routes: [...constantRoutes, ...asyncRoutes, { path: '*', redirect: '/404', hidden: true }]
  routes: [...constantRoutes]
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
