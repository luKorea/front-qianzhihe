<template>
  <div>
    <basic-container-back>
      <span class="tip-info"></span>
      <span class="tip-title">基本信息</span>
      <div style="margin-top: 20px">
        <el-row :gutter="4" class="m-bottom">
          <el-col :span="10">
            <span class="teacher-title">教师名称：</span>
            <span class="teacher-info">{{ info.name }}</span>
          </el-col>
          <el-col :span="10">
            <span class="teacher-title">教师类型：</span>
            <span class="teacher-info">{{ info.teacherType }}</span>
          </el-col>
        </el-row>
        <el-row :gutter="4">
          <el-col :span="10">
            <span class="teacher-title">手机号码：</span>
            <span class="teacher-info">{{ info.phone }}</span>
          </el-col>
          <el-col :span="10">
            <span class="teacher-title">备注：</span>
            <span class="teacher-info">{{ info.comment }}</span>
          </el-col>
        </el-row>
      </div>
    </basic-container-back>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">账号信息</span>
      <div style="margin-top: 20px">
        <el-row :gutter="4" class="m-bottom">
          <el-col :span="10">
            <span class="teacher-title">登录账号：</span>
            <span class="teacher-info">{{ info.username }}</span>
          </el-col>
          <el-col :span="10">
            <span class="teacher-title">登录密码：</span>
            <span class="teacher-info">************</span>
          </el-col>
        </el-row>
      </div>
    </basic-container>
    <basic-container style="margin-bottom: 100px">
      <span class="tip-info"></span>
      <span class="tip-title">代课班级列表</span>
      <template v-if="list && list.length > 0">
        <el-table :data="list" border style="width: 100%;margin: 20px 0">
          <el-table-column prop="_id" label="班级ID" align="center" width="300"/>
          <el-table-column prop="name" label="班级名称" align="center"/>
          <el-table-column prop="gradeType" label="班级类型" align="center"/>
          <el-table-column prop="grade" label="年级" align="center"/>
          <el-table-column prop="enrollmentYear" label="入学年份" align="center"/>
          <el-table-column prop="teacherName" label="班主任" align="center"/>
          <el-table-column prop="teacher2Name" label="生涯导师1" align="center"/>
          <el-table-column prop="teacher1Name" label="生涯导师2" align="center"/>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="goOperationType('visit', scope.row._id)">查看班级详情</el-button>
              <el-button type="text" size="small" @click="goOperationType('edit', scope.row._id)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
          <basic-pagination
            :total="params.total"
            @handleCurrentChange="handleCurrentChange"
            @handleSizeChange="handleSizeChange"
        />
      </template>
      <basic-nothing v-else title="教师绑定班级需要在 班级管理-新增/编辑班级处添加"></basic-nothing>
    </basic-container>
    <div class="footer-btn">
      <el-button style="color: #475B75" @click="goBack">返回</el-button>
      <el-button type="primary" @click="goEdit(params.teacherId)">编辑</el-button>
    </div>
  </div>
</template>

<script>
import {getTeacherInfo} from "../../../../api/admin/taecher";

export default {
  name: "visit",
  data() {
    return {
      params: {
        page: 0,
        size: 10,
        total: 0,
        teacherId: ''
      },
      info: {},
      list: []
    }
  },
  mounted() {
    let {teacherId} = this.$route.query;
    this.params.teacherId = teacherId;
    this.getInfo(this.params);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getInfo(params) {
      getTeacherInfo(params)
          .then(res => {
            if (res.errorCode === 200) {
              let data = res.data;
              this.info = data.object;
              this.list = data.result;
              console.log(this.info);
              this.params.total = data.pageResult.total || 0;
            }
          })
    },
    goEdit(id) {
      this.$router.push({
        path: '/teachers/teacherOperation',
        query: {
          type: 'edit',
          id
        }
      })
    },
    goOperationType(type, id) {
      if (type === 'visit') {
        this.$router.push({
          path: '/grade/gradeDetails',
          query: {
            id: id
          }
        })
      } else {
        this.$router.push({
          path: '/grade/gradeOperation',
          query: {
            type,
            id
          }
        })
      }
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.getInfo(this.params);
    },
    handleSizeChange(val) {
      this.params.size = val;
      this.getInfo(this.params);
    }
  }
}
</script>

<style scoped lang="scss">
.teacher-title {
  height: 22px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #2E415B;
  line-height: 22px;
  margin-right: 20px;
  margin-bottom: 20px;
}

.teacher-info {
  height: 22px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #506889;
  line-height: 22px;
}
</style>