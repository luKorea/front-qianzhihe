# 文件目录说明
|-- node_modules [依赖文件]
|-- public [公共文件]
|-- |-- favicon.ico [项目ico图标]
|-- |-- index.html [项目打包时会以该文件为母板]
|-- src [资源文件夹]
|-- |-- assets [资源文件夹，存放图片之类的资源]
|-- |-- components [组件文件夹，自己写的组件都放在这个文件夹下]
|-- |-- views [我们所写的页面都放在这里]
|-- |-- login 登录页面
|-- |-- major 专业库
|-- |-- universities 院校库
|-- |-- occupation 职业库
|-- |-- search 公用搜索
|-- |-- App.vue [应用组件，所有自己写的组件都是在这个组件之上运行]
|-- |-- main.js [webpack入口文件]
|-- |-- router.js [路由文件夹，决定了页面的跳转规则]
|-- |-- store.js [vuex状态管理文件]
|-- package.json [项目描述文件]
|-- postcss.config.js [autoprefixer浏览器前缀处理]
|-- babel.config.js[兼容低版本浏览器]
|-- vue.config.js [webpack配置]



dataAnalysis 数据分析
    1. browseDataStatistics 浏览数据统计
    2. careerStatistics 生涯统计报告
    3. evaluationStatistics 测评统计
    4. subjectSelectionStatistics 选科统计
    5. usageStatistics App使用情况
evaluation 测评中心
    1. evaluationList 学生测评记录
    2. evaluationSeries 测评系列

