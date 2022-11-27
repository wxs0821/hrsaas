import Layout from '@/layout'

export default {
  path: '/approvals',
  component: Layout,
  name: 'approvals',
  children: [
    {
      path: '',
      component: () => import('@/views/approvals'),
      meta: { title: 'Approvals', icon: 'tree-table' }
    }
  ]

}
