Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'

export const constantRoutesStart = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/public/login/index'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        children: [{
            path: 'home',
            name: '首页',
            component: () => import('../views/public/home/index'),
            meta: {title: '首页', icon: 'el-icon-s-home', affix: true}
        }]
    },

    // 管理员 教师 公用模块 区分列表数据展示以及筛选条件
    {
        path: '/dataAnalysis',
        component: Layout,
        redirect: '/dataAnalysis/evaluationStatistics',
        alwaysShow: true,
        name: '统计分析',
        meta: {title: '统计分析', icon: 'el-icon-pie-chart', roles: ['']},
        children: [
            {
                path: 'evaluationStatistics',
                component: () => import('../views/public/dataAnalysis/evaluationStatistics'),
                name: '测评统计',
                meta: {title: '测评统计', icon: 'el-icon-star-off', roles: ['']}
            },
            {
                path: 'subjectSelectionStatistics',
                component: () => import('../views/public/dataAnalysis/subjectSelectionStatistics'),
                name: '选科统计',
                meta: {title: '选科统计', icon: 'el-icon-star-off', roles: ['']}
            },
            {
                path: 'browseDataStatistics',
                component: () => import('../views/public/dataAnalysis/browseDataStatistics'),
                name: '浏览数据统计',
                meta: {title: '浏览数据统计', icon: 'el-icon-star-off', roles: ['']}
            },
            {
                path: 'usageStatistics',
                component: () => import('../views/public/dataAnalysis/usageStatistics'),
                name: 'App使用情况',
                meta: {title: 'App使用情况', icon: 'el-icon-star-off', roles: ['']}
            },
            {
                path: 'careerStatistics',
                component: () => import('../views/public/dataAnalysis/careerStatistics'),
                name: '生涯统计报告',
                meta: {title: '生涯统计报告', icon: 'el-icon-star-off', roles: ['']}
            }
        ]
    },
    {
        path: '/evaluation',
        component: Layout,
        redirect: '/evaluation/evaluationSeries',
        alwaysShow: true,
        name: '测评中心',
        meta: {title: '测评中心', icon: 'el-icon-s-order', roles: ['']},
        children: [
            {
                path: '/evaluation/evaluationSeries',
                component: {render(c) { return c('router-view') }},
                redirect: '/evaluation/evaluationSeries',
                name: '测评系列',
                meta: {title: '测评系列', icon: 'el-icon-star-off', roles: ['']},
                children: [
                    {
                        path: '/evaluation/evaluationSeries',
                        hidden: true,
                        component: () => import('../views/public/evaluation/evaluationSeries'),
                    },
                    {
                        path: '/evaluation/evaluationSeries/mbit',
                        hidden: true,
                        component: () => import('../views/public/evaluation/evaluationSeries/mbit'),
                        name: '性格测试',
                        meta: {title: '性格测试', icon: 'el-icon-star-off', roles: ['']}
                    },
                    {
                        path: '/evaluation/evaluationSeries/holland',
                        hidden: true,
                        component: () => import('../views/public/evaluation/evaluationSeries/holland'),
                        name: '兴趣测试',
                        meta: {title: '兴趣测试', icon: 'el-icon-star-off', roles: ['']}
                    },
                ]
            },
            {
                path: '/evaluation/evaluationList',
                component: {render(c) { return c('router-view') }},
                redirect: '/evaluation/evaluationList',
                name: '学生测评记录',
                meta: {title: '学生测评记录', icon: 'el-icon-star-off', roles: ['']},
                children: [
                    {
                        path: '/evaluation/evaluationList',
                        hidden: true,
                        component: () => import('../views/public/evaluation/evaluationList'),
                    },
                    {
                        path: '/evaluation/evaluationList/evaluationDetails',
                        hidden: true,
                        component: () => import('@/views/public/evaluation/evaluationList/evaluationDetails/index'),
                        name: '学生测评详情',
                        meta: {title: '学生测评详情', icon: 'el-icon-star-off', roles: ['']}
                    },
                ]
            },
        ]
    },
    {
        path: '/changePassword',
        component: Layout,
        redirect: '/changePassword/info',
        hidden: true,
        children: [{
            path: 'info',
            name: '修改密码',
            component: () => import('../views/public/changePassword/index'),
            meta: {title: '修改密码', icon: 'el-icon-s-home', affix: true}
        }]
    },
    {
        path: '/search',
        redirect: '/search/searchList',
        component: Layout,
        name: '搜索',
        hidden: true,
        meta: {title: '搜索', icon: 'el-icon-collection-tag', roles: ['search'], breadcrumb: true},
        children: [
            {
                path: 'searchList',
                name: '搜索',
                hidden: true,
                component: () => import('../views/public/search/searchList'),
                meta: {title: '搜索', icon: 'el-icon-collection-tag', roles: ['search'], breadcrumb: true},
            }
        ]
    },
    {
        path: '',
        component: Layout,
        redirect: '/home'
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
    // 共用模块
    {
        path: '/major',
        redirect: '/major/majorList',
        component: Layout,
        name: '专业库',
        meta: {title: '专业库', icon: 'el-icon-medal', roles: ['professional'], breadcrumb: true},
        children: [
            {
                path: 'majorList',
                name: '专业库',
                component: () => import('../views/public/major/majorList'),
                meta: {title: '专业库', icon: 'el-icon-medal', roles: ['professional'], breadcrumb: true},
            },
            {
                path: 'majorDetails',
                name: '专业详情',
                hidden: true,
                component: () => import('../views/public/major/majorDetails/index'),
                meta: {title: '专业详情', icon: 'el-icon-medal', roles: ['professional'], breadcrumb: true},
            }
        ]
    },
    {
        path: '/occupation',
        redirect: '/occupation/occupationList',
        component: Layout,
        name: '职业库',
        meta: {title: '职业库', icon: 'el-icon-collection-tag', roles: ['occupationMenu'], breadcrumb: true},
        children: [
            {
                path: 'occupationList',
                name: '职业库',
                component: () => import('../views/public/occupation/occupationList'),
                meta: {title: '职业库', icon: 'el-icon-collection-tag', roles: ['occupationMenu'], breadcrumb: true},
            },
            {
                path: 'occupationDetails',
                name: '职业详情',
                hidden: true,
                component: () => import('../views/public/occupation/occupationDetails/index'),
                meta: {title: '职业详情', icon: 'el-icon-collection-tag', roles: ['occupationMenu'], breadcrumb: true},
            }
        ]
    },
    {
        path: '/universities',
        redirect: '/universities/universitiesList',
        component: Layout,
        name: '院校库',
        meta: {title: '院校库', icon: 'el-icon-office-building', roles: ['academy'], breadcrumb: true},
        children: [
            {
                path: 'universitiesList',
                name: '院校库',
                component: () => import('../views/public/universities/universitiesList'),
                meta: {title: '院校库', icon: 'el-icon-office-building', roles: ['academy'], breadcrumb: true},
            },
            {
                path: 'universitiesDetails',
                name: '院校详情',
                hidden: true,
                component: () => import('../views/public/universities/universitiesDetails/index'),
                meta: {
                    title: '院校详情',
                    keepAlive: true,
                    icon: 'el-icon-office-building', roles: ['academy'], breadcrumb: true
                },
            }
        ]
    },
    // 管理员
    {
        path: '/grade',
        redirect: '/grade/gradeList',
        component: Layout,
        name: '班级管理',
        meta: {title: '班级管理', icon: 'el-icon-s-data', roles: ['grade'], breadcrumb: true},
        children: [
            {
                path: 'gradeList',
                name: '班级管理',
                component: () => import('../views/admin/grade/gradeList'),
                meta: {title: '班级管理', icon: 'el-icon-s-data', roles: ['grade'], breadcrumb: true},
            },
            {
                path: 'gradeOperation',
                name: '编辑班级',
                hidden: true,
                component: () => import('../views/admin/grade/operation/index'),
                meta: {title: '编辑班级', icon: 'el-icon-s-data', roles: ['grade'], breadcrumb: true},
            },
            {
                path: 'gradeDetails',
                name: '班级详情',
                hidden: true,
                component: () => import('../views/admin/grade/operation/visit'),
                meta: {title: '班级详情', icon: 'el-icon-s-data', roles: ['grade'], breadcrumb: true},
            }
        ]
    },
    {
        path: '/teachers',
        redirect: '/teachers/teacherList',
        component: Layout,
        name: '教师管理',
        meta: {title: '教师管理', icon: 'el-icon-s-check', roles: ['teacher'], breadcrumb: true},
        children: [
            {
                path: 'teacherList',
                name: '教师管理',
                component: () => import('../views/admin/teachers/teacherList'),
                meta: {title: '教师管理', icon: 'el-icon-s-check', roles: ['teacher'], breadcrumb: true},
            },
            {
                path: 'teacherOperation',
                name: '教师',
                hidden: true,
                component: () => import('../views/admin/teachers/operation/index'),
                meta: {title: '教师', icon: 'el-icon-s-check', roles: ['teacher'], breadcrumb: true},
            },
            {
                path: 'teacherDetails',
                name: '教师详情',
                hidden: true,
                component: () => import('../views/admin/teachers/operation/visit'),
                meta: {title: '教师详情', icon: 'el-icon-s-check', roles: ['teacher'], breadcrumb: true},
            }
        ]
    },
    {
        path: '/students',
        redirect: '/students/studentList',
        component: Layout,
        name: '学生管理',
        meta: {title: '学生管理', icon: 'el-icon-s-custom', roles: ['student'], breadcrumb: true},
        children: [
            {
                path: 'studentList',
                name: '学生管理',
                component: () => import('../views/admin/students/studentList'),
                meta: {title: '学生管理', icon: 'el-icon-s-custom', roles: ['student'], breadcrumb: true},
            },
            {
                path: 'studentOperation',
                name: '编辑学生',
                hidden: true,
                component: () => import('../views/admin/students/operation/index'),
                meta: {title: '编辑学生', icon: 'el-icon-s-custom', roles: ['student'], breadcrumb: true},
            },
            {
                path: 'studentDetails',
                name: '学生详情',
                hidden: true,
                component: () => import('../views/admin/students/operation/visit'),
                meta: {title: '学生详情', icon: 'el-icon-s-custom', roles: ['student'], breadcrumb: true},
            }
        ]
    },
    // 教师
    {
        path: '/teacherGrade',
        redirect: '/teacherGrade/gradeList',
        component: Layout,
        name: '我的班级',
        meta: {title: '我的班级', icon: 'el-icon-s-data', roles: ['teacherGrade'], breadcrumb: true},
        children: [
            {
                path: 'gradeList',
                name: '我的班级',
                component: () => import('../views/teacher/teacherGrade/gradeList'),
                meta: {title: '我的班级', icon: 'el-icon-s-data', roles: ['teacherGrade'], breadcrumb: true},
            },
            {
                path: 'gradeOperation',
                name: '编辑班级',
                hidden: true,
                component: () => import('../views/teacher/teacherGrade/operation/index'),
                meta: {title: '编辑班级', icon: 'el-icon-s-data', roles: ['teacherGrade'], breadcrumb: true},
            },
            {
                path: 'gradeDetails',
                name: '班级详情',
                hidden: true,
                component: () => import('../views/teacher/teacherGrade/operation/visit'),
                meta: {title: '班级详情', icon: 'el-icon-s-data', roles: ['teacherGrade'], breadcrumb: true},
            },
            {
                path: 'studentDetails',
                name: '学生详情',
                hidden: true,
                component: () => import('../views/teacher/teacherGrade/operation/studentVisit'),
                meta: {title: '学生详情', icon: 'el-icon-s-data', roles: ['teacherGrade'], breadcrumb: true},
            },

            {
                path: 'studentOperation',
                name: '编辑学生',
                hidden: true,
                component: () => import('../views/teacher/teacherGrade/operation/studentOperation'),
                meta: {title: '编辑学生', icon: 'el-icon-s-data', roles: ['teacherGrade'], breadcrumb: true},
            }
        ]
    },
    // 学生
    {path: '*', redirect: '/404', hidden: true, meta: {title: '404'}}
];

const createRouter = () => new VueRouter({
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})

const router = createRouter()


export default router
