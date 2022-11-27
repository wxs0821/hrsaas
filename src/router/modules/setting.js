import Layout from '@/layout'

export default {
  path: '/setting',
  component: Layout,
  name: 'settings',
  children: [
    {
      path: '',
      component: () => import('@/views/setting'),
      meta: { title: 'Setting', icon: 'setting' }
    }
  ]

}
