import Layout from '@/layout'

export default {
  path: '/departments',
  component: Layout,
  name: 'departments',
  children: [
    {
      path: '',
      component: () => import('@/views/departments'),
      meta: { title: 'Departments', icon: 'tree' }
    }
  ]

}
