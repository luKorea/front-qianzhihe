import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

/* Layout */
import Layout from "@/layout";

export const constantRoutesStart = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/public/login/index"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    hidden: true,
    children: [
      {
        path: "home",
        name: "首页",
        component: () => import("../views/public/home/index"),
        meta: { title: "首页", icon: "el-icon-s-home" },
      },
    ],
  },
  {
    path: "/changePassword",
    component: Layout,
    redirect: "/changePassword/info",
    hidden: true,
    children: [
      {
        path: "info",
        name: "修改密码",
        component: () => import("../views/public/changePassword/index"),
        meta: { title: "修改密码", showTag: true, icon: "el-icon-s-home" },
      },
    ],
  },
  // {
  //     path: '/test',
  //     component: Layout,
  //     redirect: '/test/index',
  //     // hidden: true,
  //     children: [{
  //         path: 'test',
  //         name: '幸运大转盘',
  //         component: () => import('../views/test/index'),
  //         meta: {title: '幸运大转盘', showTag: true, icon: 'el-icon-s-home'}
  //     }]
  // },
  {
    path: "/search",
    redirect: "/search/searchList",
    component: Layout,
    name: "搜索",
    hidden: true,
    meta: {
      title: "搜索",
      icon: "el-icon-collection-tag",
      showTag: true,
      roles: ["search"],
      breadcrumb: true,
    },
    children: [
      {
        path: "searchList",
        name: "搜索",
        hidden: true,
        component: () => import("../views/public/search/searchList"),
        meta: {
          title: "搜索",
          icon: "el-icon-collection-tag",
          showTag: true,
          roles: ["search"],
          breadcrumb: true,
        },
      },
    ],
  },
  {
    path: "",
    component: Layout,
    hidden: true,
    redirect: "/home",
  },
  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },
];

/** 固定Routes */
export const constantRoutes = constantRoutesStart;

/** 异步加载Routes 根据权限 */
export const asyncRouterMap = [
  // {
  //   path: "/grade",
  //   redirect: "/grade/gradeList",
  //   component: Layout,
  //   name: "班级管理",
  //   meta: {
  //     title: "班级管理",
  //     showTag: true,
  //     icon: "el-icon-s-data",
  //     roles: ["grade"],
  //     breadcrumb: true,
  //   },
  //   children: [
  //     {
  //       path: "gradeList",
  //       name: "班级管理",
  //       component: () => import("../views/admin/grade/gradeList"),
  //       meta: {
  //         title: "班级管理",
  //         showTag: true,
  //         icon: "el-icon-s-data",
  //         roles: ["grade"],
  //         breadcrumb: true,
  //       },
  //     },
  //     {
  //       path: "gradeOperation",
  //       name: "编辑班级",
  //       hidden: true,
  //       component: () => import("../views/admin/grade/operation/index"),
  //       meta: { title: "编辑班级", icon: "el-icon-s-data", roles: ["grade"] },
  //     },
  //     {
  //       path: "gradeDetails",
  //       name: "班级详情",
  //       hidden: true,
  //       component: () => import("../views/admin/grade/operation/visit"),
  //       meta: { title: "班级详情", icon: "el-icon-s-data", roles: ["grade"] },
  //     },
  //   ],
  // },
  // {
  //   path: "/teachers",
  //   redirect: "/teachers/teacherList",
  //   component: Layout,
  //   name: "教师管理",
  //   meta: {
  //     title: "教师管理",
  //     showTag: true,
  //     icon: "el-icon-s-check",
  //     roles: ["teacher"],
  //     breadcrumb: true,
  //   },
  //   children: [
  //     {
  //       path: "teacherList",
  //       name: "教师管理",
  //       component: () => import("../views/admin/teachers/teacherList"),
  //       meta: {
  //         title: "教师管理",
  //         showTag: true,
  //         icon: "el-icon-s-check",
  //         roles: ["teacher"],
  //         breadcrumb: true,
  //       },
  //     },
  //     {
  //       path: "teacherOperation",
  //       name: "编辑教师",
  //       hidden: true,
  //       component: () => import("../views/admin/teachers/operation/index"),
  //       meta: {
  //         title: "编辑教师",
  //         icon: "el-icon-s-check",
  //         roles: ["teacher"],
  //       },
  //     },
  //     {
  //       path: "teacherDetails",
  //       name: "教师详情",
  //       hidden: true,
  //       component: () => import("../views/admin/teachers/operation/visit"),
  //       meta: {
  //         title: "教师详情",
  //         icon: "el-icon-s-check",
  //         roles: ["teacher"],
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: "/students",
  //   redirect: "/students/studentList",
  //   component: Layout,
  //   name: "学生管理",
  //   meta: {
  //     title: "学生管理",
  //     showTag: true,
  //     icon: "el-icon-s-custom",
  //     roles: ["student"],
  //     breadcrumb: true,
  //   },
  //   children: [
  //     {
  //       path: "studentList",
  //       name: "学生管理",
  //       component: () => import("../views/admin/students/studentList"),
  //       meta: {
  //         title: "学生管理",
  //         showTag: true,
  //         icon: "el-icon-s-custom",
  //         roles: ["student"],
  //         breadcrumb: true,
  //       },
  //     },
  //     {
  //       path: "studentOperation",
  //       name: "编辑学生",
  //       hidden: true,
  //       component: () => import("../views/admin/students/operation/edit"),
  //       meta: {
  //         title: "编辑学生",
  //         icon: "el-icon-s-custom",
  //         roles: ["student"],
  //       },
  //     },
  //     {
  //       path: "studentOperationAdd",
  //       name: "新增学生",
  //       hidden: true,
  //       component: () => import("../views/admin/students/operation/add"),
  //       meta: {
  //         title: "新增学生",
  //         icon: "el-icon-s-custom",
  //         roles: ["student"],
  //       },
  //     },
  //     {
  //       path: "studentDetails",
  //       name: "学生详情",
  //       hidden: true,
  //       component: () => import("../views/admin/students/operation/visit"),
  //       meta: {
  //         title: "学生详情",
  //         icon: "el-icon-s-custom",
  //         roles: ["student"],
  //       },
  //     },
  //   ],
  // },
// 共用模块

  // 管理员 教师 公用模块 区分列表数据展示以及筛选条件
  {
    path: "/evaluation",
    component: Layout,
    redirect: "/evaluation/evaluationSeries",
    name: "测评中心",
    meta: {
      title: "测评中心",
      keepAlive: true,
      icon: "el-icon-s-order",
      roles: ["测评中心"],
      breadcrumb: true,
    },
    children: [
      {
        path: "/evaluation/evaluationSeries",
        component: {
          render(c) {
            return c("router-view");
          },
        },
        redirect: "/evaluation/evaluationSeries",
        name: "测评系列",
        meta: {
          title: "测评系列",
          keepAlive: true,
          showTag: true,
          icon: "el-icon-star-off",
          roles: ["reviewSeries"],
          breadcrumb: true,
        },
        children: [
          {
            path: "/evaluation/evaluationSeries",
            hidden: true,
            name: "测评系列",
            meta: {
              title: "测评系列",
              showTag: true,
              keepAlive: true,
              icon: "el-icon-star-off",
              roles: ["reviewSeries"],
              breadcrumb: true,
            },
            component: () =>
              import("../views/public/evaluation/evaluationSeries"),
          },
          {
            path: "/evaluation/evaluationSeries/mbit",
            hidden: true,
            component: () =>
              import("../views/public/evaluation/evaluationSeries/mbit"),
            name: "性格测试",
            meta: {
              title: "性格测试",
              icon: "el-icon-star-off",
              roles: ["reviewSeries"],
            },
          },
          {
            path: "/evaluation/evaluationSeries/holland",
            hidden: true,
            component: () =>
              import("../views/public/evaluation/evaluationSeries/holland"),
            name: "兴趣测试",
            meta: {
              title: "兴趣测试",
              icon: "el-icon-star-off",
              roles: ["reviewSeries"],
            },
          },
        ],
      },
      {
        path: "/evaluation/evaluationList",
        component: {
          render(c) {
            return c("router-view");
          },
        },
        redirect: "/evaluation/evaluationList",
        name: "学生测评记录",
        meta: {
          title: "学生测评记录",
          showTag: true,
          keepAlive: true,
          icon: "el-icon-star-off",
          roles: ["evaluation"],
          breadcrumb: true,
        },
        children: [
          {
            path: "/evaluation/evaluationList",
            hidden: true,
            name: "学生测评记录",
            meta: {
              title: "学生测评记录",
              showTag: true,
              keepAlive: true,
              icon: "el-icon-star-off",
              roles: ["evaluation"],
              breadcrumb: true,
            },
            component: () =>
              import("../views/public/evaluation/evaluationList"),
          },
          {
            path: "/evaluation/evaluationList/evaluationDetails",
            hidden: true,
            component: () =>
              import(
                "@/views/public/evaluation/evaluationList/evaluationDetails/index"
                ),
            name: "学生测评详情",
            meta: {
              title: "学生测评详情",
              icon: "el-icon-star-off",
              roles: ["evaluation"],
            },
          },
        ],
      },
    ],
  },
  {
    path: "/major",
    redirect: "/major/majorList",
    component: Layout,
    name: "专业库",
    meta: {
      title: "专业库",
      showTag: true,
      keepAlive: true,
      icon: "el-icon-medal",
      roles: ["professional"],
      breadcrumb: true,
    },
    children: [
      {
        path: "majorList",
        name: "专业库",
        component: () => import("../views/public/major/majorList"),
        meta: {
          title: "专业库",
          showTag: true,
          keepAlive: true,
          icon: "el-icon-medal",
          roles: ["professional"],
          breadcrumb: true,
        },
      },
      {
        path: "majorDetails",
        name: "专业详情",
        hidden: true,
        component: () => import("../views/public/major/majorDetails/index"),
        meta: {
          title: "专业详情",
          icon: "el-icon-medal",
          roles: ["professional"],
        },
      },
    ],
  },
  {
    path: "/universities",
    redirect: "/universities/universitiesList",
    component: Layout,
    name: "院校库",
    meta: {
      title: "院校库",
      showTag: true,
      keepAlive: true,
      icon: "el-icon-office-building",
      roles: ["academy"],
      breadcrumb: true,
    },
    children: [
      {
        path: "universitiesList",
        name: "院校库",
        component: () =>
          import("../views/public/universities/universitiesList"),
        meta: {
          title: "院校库",
          showTag: true,
          keepAlive: true,
          icon: "el-icon-office-building",
          roles: ["academy"],
          breadcrumb: true,
        },
      },
      {
        path: "universitiesDetails",
        name: "院校详情",
        hidden: true,
        component: () =>
          import("../views/public/universities/universitiesDetails/index"),
        meta: {
          title: "院校详情",
          icon: "el-icon-office-building",
          roles: ["academy"],
        },
      },
    ],
  },
  {
    path: "/occupation",
    redirect: "/occupation/occupationList",
    component: Layout,
    name: "职业库",
    meta: {
      title: "职业库",
      showTag: true,
      icon: "el-icon-collection-tag",
      roles: ["occupationMenu"],
      keepAlive: true,
      breadcrumb: true,
    },
    children: [
      {
        path: "occupationList",
        name: "职业库",
        component: () => import("../views/public/occupation/occupationList"),
        meta: {
          title: "职业库",
          showTag: true,
          keepAlive: true,
          icon: "el-icon-collection-tag",
          roles: ["occupationMenu"],
          breadcrumb: true,
        },
      },
      {
        path: "occupationDetails",
        name: "职业详情",
        hidden: true,
        component: () =>
          import("../views/public/occupation/occupationDetails/index"),
        meta: {
          title: "职业详情",
          icon: "el-icon-collection-tag",
          roles: ["occupationMenu"],
        },
      },
    ],
  },
  {
    path: "/newExam",
    component: Layout,
    redirect: "/newExam",
    // hidden: true,
    children: [
      {
        path: "newExam",
        name: "选科查询",
        component: () => import("../views/public/newExam"),
        meta: {
          title: "选科查询",
          showTag: true,
          keepAlive: true,
          roles: ["course"],
          icon: "el-icon-date",
        },
      },
    ],
  },
  {
    path: "/dataAnalysis",
    component: Layout,
    redirect: "/dataAnalysis/evaluationStatistics",
    name: "统计分析",
    meta: {
      title: "统计分析",
      icon: "el-icon-pie-chart",
      keepAlive: true,
      roles: ["统计分析"],
      breadcrumb: true,
    },
    children: [
      {
        path: "evaluationStatistics",
        component: () =>
          import("../views/public/dataAnalysis/evaluationStatistics"),
        name: "测评统计",
        meta: {
          title: "测评统计",
          showTag: true,
          keepAlive: true,
          icon: "el-icon-star-off",
          roles: ["统计分析"],
          breadcrumb: true,
        },
      },
      {
        path: "subjectSelectionStatistics",
        component: () =>
          import("../views/public/dataAnalysis/subjectSelectionStatistics"),
        name: "选科查询统计",
        meta: {
          title: "选科查询统计",
          showTag: true,
          keepAlive: true,
          icon: "el-icon-star-off",
          roles: ["统计分析"],
          breadcrumb: true,
        },
      },
      {
        path: "subjectSelectionTypeStatistics",
        component: () =>
          import("../views/public/dataAnalysis/subjectSelectionTypeStatistics"),
        name: "选科征集统计",
        meta: {
          title: "选科征集统计",
          showTag: true,
          keepAlive: true,
          icon: "el-icon-star-off",
          roles: ["统计分析"],
          breadcrumb: true,
        },
      },
      {
        path: "browseDataStatistics",
        component: () =>
          import("../views/public/dataAnalysis/browseDataStatistics"),
        name: "浏览数据统计",
        meta: {
          title: "浏览数据统计",
          showTag: true,
          icon: "el-icon-star-off",
          keepAlive: true,
          roles: ["browsingHistory"],
          breadcrumb: true,
        },
      },
      {
        path: "usageStatistics",
        component: () => import("../views/public/dataAnalysis/usageStatistics"),
        name: "平台使用情况",
        meta: {
          title: "平台使用情况",
          showTag: true,
          icon: "el-icon-star-off",
          roles: ["appUsage"],
          keepAlive: true,
          breadcrumb: true,
        },
      },
      // {
      //     path: 'careerStatistics',
      //     component: () => import('../views/public/dataAnalysis/careerStatistics'),
      //     name: '生涯统计报告',
      //     meta: {
      //         title: '生涯统计报告', showTag: true,
      //         keepAlive: true, icon: 'el-icon-star-off', roles: ['统计分析'], breadcrumb: true,
      //     }
      // }
    ],
  },
  // 管理员
  {
    path: "/",
    component: Layout,
    redirect: "/grade/gradeList",
    name: "系统管理",
    meta: {
      title: "系统管理",
      keepAlive: true,
      icon: "el-icon-s-order",
      roles: ["grade"],
      breadcrumb: true,
    },
    children: [
      {
        path: "/grade",
        component: {
          render(c) {
            return c("router-view");
          },
        },
        redirect: "/grade/gradeList",
        name: "",
        meta: {
          title: "班级管理",
          keepAlive: true,
          showTag: true,
          icon: "el-icon-star-off",
          roles: ["grade"],
          breadcrumb: true,
        },
        children: [
          {
            path: "gradeList",
            name: "班级管理",
            component: () => import("../views/admin/grade/gradeList"),
            meta: {
              title: "班级管理",
              showTag: true,
              icon: "el-icon-s-data",
              roles: ["grade"],
              breadcrumb: true,
            },
          },
          {
            path: "gradeOperation",
            name: "编辑班级",
            hidden: true,
            component: () => import("../views/admin/grade/operation/index"),
            meta: { title: "编辑班级", icon: "el-icon-s-data", roles: ["grade"] },
          },
          {
            path: "gradeDetails",
            name: "班级详情",
            hidden: true,
            component: () => import("../views/admin/grade/operation/visit"),
            meta: { title: "班级详情", icon: "el-icon-s-data", roles: ["grade"] },
          },
        ],
      },
      {
        path: "/teachers",
        component: {
          render(c) {
            return c("router-view");
          },
        },
        redirect: "/teachers/teacherList",
        name: "",
        meta: {
          title: "教师管理",
          keepAlive: true,
          showTag: true,
          icon: "el-icon-star-off",
          roles: ["grade"],
          breadcrumb: true,
        },
        children: [
          {
            path: "teacherList",
            name: "教师管理",
            component: () => import("../views/admin/teachers/teacherList"),
            meta: {
              title: "教师管理",
              showTag: true,
              icon: "el-icon-s-check",
              roles: ["teacher"],
              breadcrumb: true,
            },
          },
          {
            path: "teacherOperation",
            name: "编辑教师",
            hidden: true,
            component: () => import("../views/admin/teachers/operation/index"),
            meta: {
              title: "编辑教师",
              icon: "el-icon-s-check",
              roles: ["teacher"],
            },
          },
          {
            path: "teacherDetails",
            name: "教师详情",
            hidden: true,
            component: () => import("../views/admin/teachers/operation/visit"),
            meta: {
              title: "教师详情",
              icon: "el-icon-s-check",
              roles: ["teacher"],
            },
          },
        ],
      },
      {
        path: "/students",
        component: {
          render(c) {
            return c("router-view");
          },
        },
        redirect: "/students/studentList",
        name: "",
        meta: {
          title: "学生管理",
          keepAlive: true,
          showTag: true,
          icon: "el-icon-star-off",
          roles: ["grade"],
          breadcrumb: true,
        },
        children: [
          {
            path: "studentList",
            name: "学生管理",
            component: () => import("../views/admin/students/studentList"),
            meta: {
              title: "学生管理",
              showTag: true,
              icon: "el-icon-s-custom",
              roles: ["student"],
              breadcrumb: true,
            },
          },
          {
            path: "studentOperation",
            name: "编辑学生",
            hidden: true,
            component: () => import("../views/admin/students/operation/edit"),
            meta: {
              title: "编辑学生",
              icon: "el-icon-s-custom",
              roles: ["student"],
            },
          },
          {
            path: "studentOperationAdd",
            name: "新增学生",
            hidden: true,
            component: () => import("../views/admin/students/operation/add"),
            meta: {
              title: "新增学生",
              icon: "el-icon-s-custom",
              roles: ["student"],
            },
          },
          {
            path: "studentDetails",
            name: "学生详情",
            hidden: true,
            component: () => import("../views/admin/students/operation/visit"),
            meta: {
              title: "学生详情",
              icon: "el-icon-s-custom",
              roles: ["student"],
            },
          },
        ],
      },
      {
        path: "/subjectPlain",
        component: {
          render(c) {
            return c("router-view");
          },
        },
        redirect: "/subjectPlain/subjectPlainList",
        name: "",
        meta: {
          title: "选科征集计划",
          keepAlive: true,
          showTag: true,
          icon: "el-icon-star-off",
          roles: ["grade"],
          breadcrumb: true,
        },
        children: [
          {
            path: "subjectPlainList",
            name: "选科征集计划",
            component: () => import("../views/admin/subjectsPlain/subjectPlainList"),
            meta: {
              title: "选科征集计划",
              showTag: true,
              icon: "el-icon-s-data",
              roles: ["grade"],
              breadcrumb: true,
            },
          },
          {
            path: "subjectPlainOperation",
            name: "编辑选科征集计划",
            hidden: true,
            component: () => import("../views/admin/subjectsPlain/operation"),
            meta: { title: "编辑选科征集计划", icon: "el-icon-s-data", roles: ["grade"] },
          },
          // {
          //   path: "gradeDetails",
          //   name: "班级详情",
          //   hidden: true,
          //   component: () => import("../views/admin/grade/operation/visit"),
          //   meta: { title: "班级详情", icon: "el-icon-s-data", roles: ["grade"] },
          // },
        ],
      },
    ],
  },
  // 学生
  {
    path: "/studentEvaluation",
    component: Layout,
    redirect: "/studentEvaluation/evaluationSeries",
    name: "认识自我",
    meta: {
      title: "认识自我",
      showTag: true,
      icon: "el-icon-s-order",
      roles: ["学生测评中心"],
      breadcrumb: true,
    },
    children: [
      {
        path: "/studentEvaluation/evaluationSeries",
        component: {
          render(c) {
            return c("router-view");
          },
        },
        redirect: "/studentEvaluation/evaluationSeries",
        name: "测一测",
        meta: {
          title: "测一测",
          showTag: true,
          icon: "el-icon-star-off",
          roles: ["学生测评中心"],
          breadcrumb: true,
        },
        children: [
          {
            path: "/studentEvaluation/evaluationSeries",
            hidden: true,
            name: "测一测",
            meta: {
              title: "测一测",
              showTag: true,
              icon: "el-icon-star-off",
              roles: ["学生测评中心"],
              breadcrumb: true,
            },
            component: () =>
              import("../views/student/evaluation/evaluationSeries"),
          },
          {
            path: "/studentEvaluation/evaluationSeries/mbit",
            hidden: true,
            component: () =>
              import("../views/student/evaluation/evaluationSeries/mbit"),
            name: "性格测试",
            meta: {
              title: "性格测试",
              icon: "el-icon-star-off",
              roles: ["学生测评中心"],
            },
          },
          {
            path: "/studentEvaluation/evaluationSeries/holland",
            hidden: true,
            component: () =>
              import("../views/student/evaluation/evaluationSeries/holland"),
            name: "兴趣测试",
            meta: {
              title: "兴趣测试",
              icon: "el-icon-star-off",
              roles: ["学生测评中心"],
            },
          },
        ],
      },
      {
        path: "/studentEvaluation/evaluationList",
        component: {
          render(c) {
            return c("router-view");
          },
        },
        redirect: "/studentEvaluation/evaluationList",
        name: "测评记录",
        meta: {
          title: "测评记录",
          showTag: true,
          icon: "el-icon-star-off",
          roles: ["学生测评中心"],
          breadcrumb: true,
        },
        children: [
          {
            path: "/studentEvaluation/evaluationList",
            hidden: true,
            name: "测评记录",
            meta: {
              title: "测评记录",
              showTag: true,
              icon: "el-icon-star-off",
              roles: ["学生测评中心"],
              breadcrumb: true,
            },
            component: () =>
              import("../views/student/evaluation/evaluationList"),
          },
          {
            path: "/studentEvaluation/evaluationList/evaluationDetails",
            hidden: true,
            component: () =>
              import(
                "@/views/student/evaluation/evaluationList/evaluationDetails/index"
                ),
            name: "测评详情",
            meta: {
              title: "测评详情",
              icon: "el-icon-star-off",
              roles: ["学生测评中心"],
            },
          },
        ],
      },
    ],
  },
  //学生探索世界
  {
    path: "/exploreTheWrld",
    component: Layout,
    redirect: "/exploreTheWrld/occupationList",
    name: "探索世界",
    meta: {
      title: "探索世界",
      showTag: true,
      icon: "el-icon-s-order",
      roles: [
        "professional_student",
        "academy_student",
        "occupationMenu_student",
      ],
      breadcrumb: true,
    },
    children: [
      {
        path: "occupationList",
        component: () => import("../views/public/occupation/occupationList"),
        name: "认识职业",
        meta: {
          title: "认识职业",
          showTag: true,
          keepAlive: true,
          icon: "el-icon-collection-tag",
          roles: ["occupationMenu_student"],
          breadcrumb: true,
        },
      },
      {
        path: "majorList",
        name: "专业百科",
        component: () => import("../views/public/major/majorList"),
        meta: {
          title: "专业百科",
          showTag: true,
          keepAlive: true,
          icon: "el-icon-medal",
          roles: ["professional_student"],
          breadcrumb: true,
        },
      },
      {
        path: "universitiesList",
        name: "参观大学",
        component: () =>
          import("../views/public/universities/universitiesList"),
        meta: {
          title: "参观大学",
          showTag: true,
          keepAlive: true,
          icon: "el-icon-office-building",
          roles: ["academy_student"],
          breadcrumb: true,
        },
      },
    ],
  },
  //学生探索世界院校详情
  {
    path: "/universities",
    redirect: "/universities/universitiesList",
    component: Layout,
    name: "参观大学",
    hidden: true,
    meta: {
      title: "参观大学",
      showTag: true,
      keepAlive: true,
      icon: "el-icon-office-building",
      roles: ["academy_student"],
      breadcrumb: true,
    },
    children: [
      {
        path: "universitiesDetails",
        name: "院校详情",
        hidden: true,
        component: () =>
          import("../views/public/universities/universitiesDetails/index"),
        meta: {
          title: "院校详情",
          icon: "el-icon-office-building",
          roles: ["academy_student"],
        },
      },
    ],
  },
  //学生探索世界专业详情
  {
    path: "/major",
    redirect: "/major/majorList",
    component: Layout,
    name: "专业百科",
    hidden: true,
    meta: {
      title: "专业百科",
      showTag: true,
      keepAlive: true,
      icon: "el-icon-medal",
      roles: ["professional_student"],
      breadcrumb: true,
    },
    children: [
      {
        path: "majorDetails",
        name: "专业详情",
        hidden: true,
        component: () => import("../views/public/major/majorDetails/index"),
        meta: {
          title: "专业详情",
          icon: "el-icon-medal",
          roles: ["professional_student"],
        },
      },
    ],
  },
  //学生探索世界职业详情
  {
    path: "/occupation",
    redirect: "/occupation/occupationList",
    component: Layout,
    name: "认识职业",
    hidden: true,
    meta: {
      title: "认识职业",
      showTag: true,
      icon: "el-icon-collection-tag",
      roles: ["occupationMenu_student"],
      keepAlive: true,
      breadcrumb: true,
    },
    children: [
      {
        path: "occupationDetails",
        name: "职业详情",
        hidden: true,
        component: () =>
          import("../views/public/occupation/occupationDetails/index"),
        meta: {
          title: "职业详情",
          icon: "el-icon-collection-tag",
          roles: ["occupationMenu_student"],
        },
      },
    ],
  },
  {
    path: "/exam",
    component: Layout,
    redirect: "/exam/exam",
    name: "新高考选科",
    meta: {
      title: "新高考选科",
      icon: "el-icon-pie-chart",
      keepAlive: true,
      roles: ["myFiles"],
      breadcrumb: true,
    },
    children: [
      {
        path: "newExam",
        name: "选科查询",
        // name: "模拟选科",
        component: () => import("../views/public/newExam"),
        meta: {
          title: "选科查询",
          showTag: true,
          keepAlive: true,
          roles: ["myFiles"],
          icon: "el-icon-star-off",
        },
      },
      {
        path: "studentSubjectSelectionType",
        // name: "正式选科",
        name: "模拟选科",
        component: () => import("../views/student/subjectSelectionType/index"),
        meta: {
          title: "模拟选科",
          showTag: true,
          icon: "el-icon-star-off",
          roles: ["myFiles"],
          breadcrumb: true,
        },
      },
    ],
  },
  {
    path: "/studentArchives",
    component: Layout,
    redirect: "/studentArchives",
    children: [
      {
        path: "studentArchives",
        name: "我的档案",
        component: () => import("../views/student/archives/index"),
        meta: {
          title: "我的档案",
          showTag: true,
          icon: "el-icon-s-home",
          roles: ["myFiles"],
          breadcrumb: true,
        },
      },
    ],
  },
  {
    path: "/appDescription",
    component: Layout,
    redirect: "/appDescription",
    children: [
      {
        path: "appDescription",
        name: "千职鹤APP",
        component: () => import("../views/student/app/index"),
        meta: {
          title: "千职鹤APP",
          showTag: true,
          icon: "el-icon-mobile-phone",
          roles: ["AppIntroduce"],
          breadcrumb: true,
        },
      },
    ],
  },
  // 教师
  {
    path: "/teacherGrade",
    redirect: "/teacherGrade/gradeList",
    component: Layout,
    name: "我的班级",
    meta: {
      title: "我的班级",
      showTag: true,
      icon: "el-icon-s-data",
      roles: ["teacherGrade"],
      breadcrumb: true,
    },
    children: [
      {
        path: "gradeList",
        name: "我的班级",
        component: () => import("../views/teacher/teacherGrade/gradeList"),
        meta: {
          title: "我的班级",
          showTag: true,
          icon: "el-icon-s-data",
          roles: ["teacherGrade"],
          breadcrumb: true,
        },
      },
      {
        path: "gradeOperation",
        name: "编辑班级",
        hidden: true,
        component: () =>
          import("../views/teacher/teacherGrade/operation/index"),
        meta: {
          title: "编辑班级",
          icon: "el-icon-s-data",
          roles: ["teacherGrade"],
        },
      },
      {
        path: "gradeDetails",
        name: "班级详情",
        hidden: true,
        component: () =>
          import("../views/teacher/teacherGrade/operation/visit"),
        meta: {
          title: "班级详情",
          icon: "el-icon-s-data",
          roles: ["teacherGrade"],
        },
      },
      {
        path: "studentDetails",
        name: "学生详情",
        hidden: true,
        component: () =>
          import("../views/teacher/teacherGrade/operation/studentVisit"),
        meta: {
          title: "学生详情",
          icon: "el-icon-s-data",
          roles: ["teacherGrade"],
        },
      },

      {
        path: "studentOperation",
        name: "编辑学生",
        hidden: true,
        component: () =>
          import("../views/teacher/teacherGrade/operation/studentOperation"),
        meta: {
          title: "编辑学生",
          icon: "el-icon-s-data",
          roles: ["teacherGrade"],
        },
      },
    ],
  },
  { path: "*", redirect: "/404", hidden: true, meta: { title: "404" } },
];

const createRouter = () =>
  new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

export default router;
