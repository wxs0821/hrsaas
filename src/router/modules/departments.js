import Layout from '@/layout'

export default {
  path: '/departments',
  component: Layout,
  name: 'departments',
  children: [
    {
      path: '',
      name: 'departments',
      component: () => import('@/views/departments'),
      meta: { title: '部门', icon: 'tree' }
    }
  ]

}
