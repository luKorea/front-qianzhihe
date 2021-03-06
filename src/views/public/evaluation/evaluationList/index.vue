<template>
  <div>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">测评记录筛选</span>
      <div class="m-top search">
        <div class="search-item">
          <span class="search-title">测评类型:</span>
          <el-select v-model="params.type" placeholder="请选择" clearable filterable>
            <template v-if="evaluationTypeList && evaluationTypeList.length > 0">
              <el-option v-for="(item, index) in evaluationTypeList"
                         :key="index"
                         :label="item.label" :value="item.value"></el-option>
            </template>
          </el-select>
        </div>
        <div class="search-item">
          <span class="search-title">班级:</span>
          <el-select v-model="params.graduate" placeholder="请选择" clearable filterable>
            <template v-if="classList && classList.length > 0">
              <el-option v-for="item in classList" :label="item.name" :value="item.name"></el-option>
            </template>
          </el-select>
        </div>
        <div class="search-item">
          <el-input style="width: 280px" v-model="params.searchText"
                    clearable
                    @keyup.enter.native="searchData"
                    placeholder="请输入学号、名称、手机号"/>
        </div>
        <div class="search-item">
          <el-button type="primary" :loading="loading" @click="searchData">筛选</el-button>
        </div>
      </div>
    </basic-container>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">测评记录列表</span>
      <el-table stripe :data="list" border style="width: 100%;margin: 20px 0" v-loading="loading">
        <el-table-column prop="user.studentId" label="学号" align="center"></el-table-column>
        <el-table-column label="头像" align="center">
          <template slot-scope="scope">
            <el-avatar :size="32" :src="scope.row.user.profilePicture"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="user.schoolUserName" label="姓名" align="center">
          <template slot-scope="scope">
            <span class="inline-text"
                  @click="goStudentDetail(scope.row.user._id, scope.row.user.gradeId)"
                  v-if="scope.row.user.schoolUserName !== '-'">{{ scope.row.user.schoolUserName }}</span>
            <span v-else>{{ scope.row.user.schoolUserName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.user.gender === 'F' ? '女' : '男' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="user.username" label="手机号" align="center"/>
        <el-table-column prop="user.gradeName" label="班级" align="center">
          <template slot-scope="scope">
            <span class="inline-text"
                  @click="goGradeDetail(scope.row.user.gradeId)"
                  v-if="scope.row.user.gradeName !== '-'">{{ scope.row.user.gradeName }}</span>
            <span v-else>{{ scope.row.user.gradeName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="测评内容" align="center"/>
        <el-table-column prop="testTime" label="测评时间" align="center"/>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="goDetail(scope.row._id, scope.row.name)">查看测评结果</el-button>
          </template>
        </el-table-column>
      </el-table>
      <basic-pagination
          :page="params.page + 1"
          :total="params.total"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
      />
    </basic-container>
  </div>
</template>

<script>
import {selectTypeList, selectClassList} from "../../../../api/common/search";
import {getStudentEvaluationList} from "../../../../api/common/evaluation";
import {errorTip} from "../../../../utils/tip";


export default {
  name: "index",
  data() {
    return {
      loading: true,
      params: {
        page: 0,
        size: 10,
        searchText: '',
        type: '',
        total: 0,
        graduate: ''
      },
      teacherId: '',
      classList: [],
      evaluationTypeList: [
        {
          label: '不限',
          value: ''
        },
        {
          label: '性格测试',
          value: 'mbti'
        }, {
          label: '兴趣测试',
          value: 'holland'
        }
      ],
      list: []
    }
  },
  mounted() {
    this.getData(this.params);
    this.getGrade();
    this.getClassData();
  },
  methods: {
    searchData() {
      this.params.page = 0;
      this.getData(this.params);
    },
    goStudentDetail(studentId, gradeId) {
      const {user_type} = this.$store.state.user;
      console.log(user_type);
      if (user_type === '学校管理员') {
        this.$router.push({
          path: '/students/studentDetails',
          query: {
            studentId: studentId,
            gradeId: gradeId ? gradeId : ''
          }
        })
      } else {
        this.$router.push({
          path: '/teacherGrade/studentDetails',
          query: {
            studentId: studentId,
            gradeId: gradeId ? gradeId : ''
          }
        })
      }
    },
    goGradeDetail(gradeId) {
      const {user_type} = this.$store.state.user;
      console.log(user_type);
      if (user_type === '学校管理员') {
        this.$router.push({
          path: '/grade/gradeDetails',
          query: {
            id: gradeId
          }
        })
      } else {
        this.$router.push({
          path: '/teacherGrade/gradeDetails',
          query: {
            id: gradeId
          }
        })
      }
    },
    goDetail(id, type) {
      this.$router.push({
        path: '/evaluation/evaluationList/evaluationDetails',
        query: {
          hollandId: id,
          type: type === '兴趣测试' ? 'holland' : 'mbti'
        }
      })
    },
    getGrade() {
      selectTypeList('grade')
          .then(res => {
            if (res.errorCode === 200) {
              this.gradeList = res.data;
            }
          })
    },
    getClassData() {
      selectClassList()
          .then(res => {
            if (res.errorCode === 200) {
              this.classList = res.data;
            }
          })
    },
    getData(params) {
      this.loading = true;
      getStudentEvaluationList(params)
          .then(res => {
            if (res.errorCode === 200) {
              this.list = res.data.result;
              this.loading = false;
              this.params.total = res.data.pageResult.total || 0;
            } else {
              errorTip(res.msg)
              this.loadin = false;
            }
          })
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.getData(this.params);
    },
    handleSizeChange(val) {
      this.params.size = val;
      this.getData(this.params);
    }
  }
}
</script>

<style scoped lang="scss">
.search {
  display: flex;

  .search-item {
    margin-right: 20px;

    .search-title {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #2E415B;
      margin-right: 20px;
    }
  }
}
</style>
