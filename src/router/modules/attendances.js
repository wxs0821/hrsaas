import Layout from '@/layout'

export default {
  path: '/attendances',
  component: Layout,
  name: 'attendances',
  children: [
    {
      path: '',
      component: () => import('@/views/attendances'),
      meta: { title: 'Attendances', icon: 'skill' }
    }
  ]

}
