import Layout from '@/layout'

export default {
  path: '/employees',
  component: Layout,
  name: 'employees',
  children: [
    {
      path: '',
      name: 'employees',
      component: () => import('@/views/employees'),
      meta: { title: '员工', icon: 'people' }
    },
    {
      path: 'detail/:userId?',
      hidden: true,
      component: () => import('@/views/employees/compontents/detail.vue'),
      // 定义路由期间，是可以开启 props 传参的
      // props: Object || Boolean || Function
      props: true
      // props: ({ name: 'heima', age: 20 })
      // props: (v) => { // 如果是函数类型的话，参数默认就是路由对象（params path hash patch）
      // props: (v) => {
      //   return ({ age: 18, name: 'wxs', userId: v.params.userId })
      // }
    },
    {
      path: 'print/:id?',
      component: () => import('@/views/employees/compontents/print.vue'),
      hidden: true
    }
  ]

}
