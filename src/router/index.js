

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'
export const constantRoutesStart = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: '首页',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'el-icon-s-home', affix: true }
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: '/home'
  },
  {
    path: '/search',
    redirect: '/search/searchList',
    component: Layout,
    children: [
      {
        path: 'searchList',
        name: '搜索',
        hidden: true,
        component:  () => import('@/views/search/searchList'),
        meta: { title: '搜索', icon: 'el-icon-collection-tag', roles: ['search'], breadcrumb: true },
      }
    ]
  },
  {
    path: '/grade',
    redirect: '/grade/gradeList',
    component: Layout,
    children: [
      {
        path: 'student',
        name: '班级管理',
        component:  () => import('./../views/grade/gradeList'),
        meta: { title: '班级管理', icon: 'el-icon-s-custom', roles: ['grade'], breadcrumb: true },
      },
      {
        path: 'gradeOperation',
        name: '编辑班级',
        hidden: true,
        component:  () => import('./../views/grade/operation/index'),
        meta: { title: '编辑班级', icon: 'el-icon-s-custom', roles: ['grade'], breadcrumb: true },
      },
      {
        path: 'gradeDetails',
        name: '班级详情',
        hidden: true,
        component:  () => import('./../views/grade/operation/visit'),
        meta: { title: '班级详情', icon: 'el-icon-s-custom', roles: ['grade'], breadcrumb: true },
      }
    ]
  },
  {
    path: '/major',
    redirect: '/major/majorList',
    component: Layout,
      children: [
        {
          path: 'majorList',
          name: '专业库',
          component:  () => import('@/views/major/majorList'),
          meta: { title: '专业库', icon: 'el-icon-medal', roles: ['major'], breadcrumb: true },
        },
        {
          path: 'majorDetails',
          name: '专业详情',
          hidden: true,
          component:  () => import('@/views/major/majorDetails/index'),
          meta: { title: '专业详情', icon: 'el-icon-medal', roles: ['major'], breadcrumb: true },
        }
      ]
  },
  {
    path: '/occupation',
    redirect: '/occupation/occupationList',
    component: Layout,
    children: [
      {
        path: 'occupation',
        name: '职业库',
        component:  () => import('@/views/occupation/occupationList'),
        meta: { title: '职业库', icon: 'el-icon-collection-tag', roles: ['occupation'], breadcrumb: true },
      },
      {
        path: 'occupationDetails',
        name: '职业详情',
        hidden: true,
        component:  () => import('@/views/occupation/occupationDetails/index'),
        meta: { title: '职业详情', icon: 'el-icon-collection-tag', roles: ['occupation'], breadcrumb: true },
      }
    ]
  },
  {
    path: '/universities',
    redirect: '/universities/universitiesList',
    component: Layout,
    children: [
      {
        path: 'universities',
        name: '院校库',
        component:  () => import('@/views/universities/universitiesList'),
        meta: { title: '院校库', icon: 'el-icon-office-building', roles: ['universities'], breadcrumb: true },
      },
      {
        path: 'universitiesDetails',
        name: '院校详情',
        hidden: true,
        component:  () => import('@/views/universities/universitiesDetails/index'),
        meta: { title: '院校详情', icon: 'el-icon-office-building', roles: ['universities'], breadcrumb: true },
      }
    ]
  },

  {
    path: '/teachers',
    redirect: '/teachers/teacherList',
    component: Layout,
    children: [
      {
        path: 'teacher',
        name: '教师管理',
        component:  () => import('./../views/teachers/teacherList'),
        meta: { title: '教师管理', icon: 'el-icon-s-check', roles: ['teacher'], breadcrumb: true },
      },
      {
        path: 'teacherOperation',
        name: '教师',
        hidden: true,
        component:  () => import('./../views/teachers/operation/index'),
        meta: { title: '教师', icon: 'el-icon-s-check', roles: ['teacher'], breadcrumb: true },
      },
      {
        path: 'teacherDetails',
        name: '教师详情',
        hidden: true,
        component:  () => import('./../views/teachers/operation/visit'),
        meta: { title: '教师详情', icon: 'el-icon-s-check', roles: ['teacher'], breadcrumb: true },
      }
    ]
  },
  {
    path: '/students',
    redirect: '/students/studentList',
    component: Layout,
    children: [
      {
        path: 'student',
        name: '学生管理',
        component:  () => import('./../views/students/studentList'),
        meta: { title: '学生管理', icon: 'el-icon-s-custom', roles: ['students'], breadcrumb: true },
      },
      {
        path: 'studentOperation',
        name: '编辑学生',
        hidden: true,
        component:  () => import('./../views/students/operation/index'),
        meta: { title: '编辑学生', icon: 'el-icon-s-custom', roles: ['students'], breadcrumb: true },
      },
      {
        path: 'studentDetails',
        name: '学生详情',
        hidden: true,
        component:  () => import('./../views/students/operation/visit'),
        meta: { title: '学生详情', icon: 'el-icon-s-custom', roles: ['students'], breadcrumb: true },
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
];



/** 固定Routes */
export const constantRoutes = constantRoutesStart

/** 异步加载Routes 根据权限 */
export const asyncRouterMap = [
  {
    path: '/major',
    component:  () => import('@/views/major/majorList'),
    redirect: '/major/majorList',
    name: '专业库',
    meta: { title: '专业库', icon: 'el-icon-s-goods', roles: ['major'] }
  },
  // {
  //   path: '/company',
  //   component: Layout,
  //   redirect: '/company/list',
  //   // alwaysShow: true,
  //   name: '商家管理',
  //   meta: { title: '商家管理', icon: 'el-icon-s-goods', roles: ['company'] },
  //   children: [
  //     {
  //       path: 'list',
  //       name: '商家列表(全部)',
  //       component: () => import('@/views/company/list'),
  //       props: { my: false },
  //       meta: { title: '商家列表(全部)', roles: ['company_all'] }
  //     },
  //     {
  //       path: 'mylist',
  //       name: '商家列表(我的)',
  //       component: () => import('@/views/company/list/my'),
  //       props: { my: true },
  //       meta: { title: '商家列表(我的)', roles: ['company_my'] }
  //     },
  //   ]
  // },
  // {
  //   path: '/order',
  //   component: Layout,
  //   redirect: '/order/list',
  //   // alwaysShow: true,
  //   name: '订单管理',
  //   meta: { title: '订单管理', icon: 'el-icon-s-order', roles: ['order'] },
  //   children: [
  //     {
  //       path: 'list',
  //       name: '订单列表(全部)',
  //       component: () => import('@/views/order/list'),
  //       props: { my: false },
  //       meta: { title: '订单列表(全部)', roles: ['order_all'] }
  //     },
  //     {
  //       path: 'mylist',
  //       name: '订单列表(我的)',
  //       component: () => import('@/views/order/list/my'),
  //       props: { my: true },
  //       meta: { title: '订单列表(我的)', roles: ['order_my'] }
  //     },
  //   ]
  // },
  // {
  //   path: '/quality',
  //   component: Layout,
  //   redirect: '/quality/list',
  //   // alwaysShow: true,
  //   name: '质检管理',
  //   meta: { title: '质检管理', icon: 'el-icon-s-claim', roles: ['qualityTesting'] },
  //   children: [
  //     {
  //       path: 'list',
  //       name: '质检列表(全部)',
  //       component: () => import('@/views/quality/list'),
  //       props: { my: false },
  //       meta: { title: '质检列表(全部)', roles: ['qualityTesting_all'] }
  //     },
  //     {
  //       path: 'mylist',
  //       name: '质检列表(我的)',
  //       component: () => import('@/views/quality/list/my'),
  //       props: { my: true },
  //       meta: { title: '质检列表(我的)', roles: ['qualityTesting_my'] }
  //     },
  //   ]
  // },
  // {
  //   path: '/user',
  //   component: Layout,
  //   redirect: '/user/list',
  //   alwaysShow: true,
  //   name: '用户及角色管理',
  //   meta: { title: '用户及角色管理', icon: 'el-icon-user-solid', roles: ['user_and_role'] },
  //   children: [
  //     {
  //       path: 'list',
  //       name: '用户管理',
  //       component: () => import('@/views/users/list'),
  //       meta: { title: '用户管理', icon: '', roles: ['user_and_role'] }
  //     },
  //     {
  //       path: 'rolelist',
  //       name: '角色管理',
  //       component: () => import('@/views/role/list'),
  //       meta: { title: '角色管理', icon: '', roles: ['user_and_role'] }
  //     },
  //   ]
  // },


  { path: '*', redirect: '/404', hidden: true, meta: { title: '404' } }
];

const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()



export default router
