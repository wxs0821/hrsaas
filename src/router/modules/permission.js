import Layout from '@/layout'

export default {
  path: '/permission',
  component: Layout,
  name: 'permissions',
  children: [
    {
      path: '',
      component: () => import('@/views/permission'),
      meta: { title: 'Permission', icon: 'lock' }
    }
  ]

}
