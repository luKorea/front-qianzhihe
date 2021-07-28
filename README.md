# 系统权限划分 (根据菜单接口，返回用户拥有的接口权限)
1. 管理员
   1. 专科库 (professional)
   2. 职业库 (occupationMenu)
   3. 院校库 (academy)
   4. 班级管理 (grade)
   5. 教师管理 (teacher)
   6. 学生管理 (student)
   7. 测评中心 ()
   8. 统计分析 ()
   9. 选科管理 ()
2. 教师
    1. 专科库 (professional)
    2. 职业库 (occupationMenu)
    3. 院校库 (academy)
    4. 我的班级 (teacherGrade) 
    5. 测评中心 ()
    6. 统计分析 ()
    7. 选科管理 ()
3. 学生
    1. 专科库 (professional)
    2. 职业库 (occupationMenu)
    3. 院校库 (academy)
    4. 我的档案 ()
    5. 测评中心 ()
5. 公共权限，在学生端需要区分非会员与会会员，显示内容不同
   1. 专科库 (professional)
   2. 职业库 (occupationMenu)
   3. 院校库 (academy)
6. 数据埋点 （只针对学生进行数据埋点，教师管理员通过诸葛io全局埋点）
   1. point/pointData