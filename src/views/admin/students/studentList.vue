<template>
  <div>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">学生筛选</span>
      <!--TODO 新模块-->
      <div class="flex-search">
        <div>
          <span class="tip">班级绑定:</span>
          <el-radio-group v-model="params.isBindingGrade" @change="selectClassData">
            <el-radio :label="0">已绑定班级</el-radio>
            <el-radio :label="1">未绑定班级</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="flex-search" v-if="showDifferentSearch">
        <!--        <div>-->
        <!--          <span class="tip">班级类型:</span>-->
        <!--          <el-select v-model="params.gradeType" placeholder="请选择" clearable filterable>-->
        <!--            <template v-if="gradeTypeList && gradeTypeList.length > 0">-->
        <!--              <el-option v-for="(item, index) in gradeTypeList" :key="index" :label="item.name" :value="item.name"></el-option>-->
        <!--            </template>-->
        <!--          </el-select>-->
        <!--        </div>-->
        <div>
          <span class="tip">年级:</span>
          <el-select v-model="params.grade"
                     @change="(e) => {
                       params.graduate = ''
                       getClassType(e)
                     }"
                     placeholder="请选择" clearable filterable>
            <template v-if="gradeList && gradeList.length > 0">
              <el-option v-for="(item, index) in gradeList" :key="index" :label="item.name"
                         :value="item.name"></el-option>
            </template>
          </el-select>
        </div>
        <div>
          <span class="tip">班级:</span>
          <el-select v-model="params.graduate" placeholder="请选择" clearable filterable>
            <template v-if="classList && classList.length > 0">
              <el-option v-for="(item, index) in classList" :key="index" :label="item.name"
                         :value="item.name"></el-option>
            </template>
          </el-select>
        </div>
        <div style="display: flex;justify-content: space-between">
          <el-input style="margin-right: 10px;" v-model="params.queryOrIdOrNameOrPhone"
                    @keyup.enter.native="getData({
                    ...params,
                    page: 0
                    })"
                    placeholder="请输入学号、名称、手机号" clearable="true"/>
          <el-button type="primary" :loading="loading" @click="searchData">筛选
          </el-button>
        </div>
      </div>
      <div class="flex-search" v-else>
        <div style="display: flex; align-items: center">
          <div class="m-right">
            <span class="tip">入学年份:</span>
            <el-select v-model="params.enrollmentYear" placeholder="请选择" clearable filterable>
              <template v-if="yearList && yearList.length > 0">
                <el-option v-for="(item, index) in yearList" :key="index" :label="item.name"
                           :value="item.name"></el-option>
              </template>
            </el-select>
          </div>
          <div style="display: flex;justify-content: space-between">
            <el-input style="margin-right: 10px; width: 300px;" v-model="params.queryOrIdOrNameOrPhone"
                      @keyup.enter.native="getData({
                    ...params,
                    page: 0
                    })"
                      placeholder="请输入学号、名称、手机号" clearable="true"/>
            <el-button type="primary" :loading="loading" @click="searchData">筛选
            </el-button>
          </div>
        </div>
      </div>
    </basic-container>
    <basic-container>
      <div class="flex">
        <div>
          <span class="tip-info"></span>
          <span class="tip-title">学生列表</span>
        </div>
        <div>
<!--          <el-button type="danger" @click="deleteAllStudent">批量删除</el-button>-->
          <el-button type="primary" @click="goOperationType('add')">新增学生账号</el-button>
          <el-button type="warning" style="margin-right: 10px" @click="showDialog = !showDialog">批量导入学生账号</el-button>
          <el-link
              href="https://www.careershe.com/xls/%E5%AD%A6%E7%94%9F%E6%89%B9%E9%87%8F%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xls"
              icon="el-icon-download" :underline="false" class="link-btn">
            下载学生批量导入模版
          </el-link>
          <upload-excel
              :upload-dialog="showDialog" v-if="showDialog"
              @closeFile="showDialog = !showDialog"
              @getData="getData(params)"
          ></upload-excel>
        </div>
      </div>
      <el-table stripe :data="list"
                ref="student"
                border style="width: 100%;margin: 20px 0" v-loading="loading">
<!--        @selection-change="selectAllStudent"-->
        <!--        <el-table-column type="selection"-->
<!--                         :selectable="isDisabled"-->
<!--                         align="center"/>-->
        <el-table-column prop="studentId" label="学号" align="center"/>
        <el-table-column label="头像" align="center">
          <template slot-scope="scope">
            <el-avatar size="32" :src="scope.row.profilePicture"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="schoolUserName" label="姓名" align="center">
          <template slot-scope="scope">
            <span class="inline-text"
                  @click="goOperationType('visit', scope.row._id, scope.row.gradeId)"
                  v-if="scope.row.schoolUserName !== '-'">{{ scope.row.schoolUserName }}</span>
            <span v-else>{{ scope.row.schoolUserName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.gender === 'F' ? '女' : '男' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="手机号" align="center"/>
        <el-table-column prop="activationDate" width="200" label="激活日期" align="center"/>
        <el-table-column prop="enrollmentYear" label="入学年份" align="center"/>
        <el-table-column prop="grade" label="年级" align="center"/>
        <el-table-column prop="gradeName" label="所属班级" align="center">
          <template slot-scope="scope">
            <span class="inline-text"
                  @click="goGradeDetail(scope.row.gradeId)"
                  v-if="scope.row.gradeName !== '-'">{{ scope.row.gradeName }}</span>
            <span v-else>{{ scope.row.gradeName }}</span>
          </template>
        </el-table-column>
        <!--        <el-table-column prop="gradeType" label="班级类型" align="center"/>-->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="goOperationType('visit', scope.row._id, scope.row.gradeId)">查看
            </el-button>
            <el-button type="text" size="small" @click="goOperationType('edit', scope.row._id, scope.row.gradeId)">编辑
            </el-button>
            <el-button type="text" size="small" style="color: red"
                       @click="deleteData(scope.row._id, scope.row.username)">删除
            </el-button>
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
import {deleteStudent, getStudentList} from "../../../api/admin/students";
import {selectTypeList, selectClassList} from "../../../api/common/search";
import uploadExcel from '../../../components/upload/index';
import {errorTip} from "../../../utils/tip";

export default {
  name: "teacherList",
  components: {
    uploadExcel
  },
  data() {
    return {
      loading: true,
      showDialog: false,
      showDifferentSearch: true,
      params: {
        isBindingGrade: 0,
        page: 0,
        size: 10,
        gradeType: '', //	年级
        graduate: '', // 班级
        grade: '', //班级类型
        enrollmentYear: '',
        queryOrIdOrNameOrPhone: '',
        total: 0
      },
      classList: [],
      gradeTypeList: [],
      gradeList: [],
      yearList: [],
      list: [],
      selectAllStudentList: []
    }
  },
  mounted() {
    this.getData(this.params);
    this.getGradeType();
    this.getGrade();
    this.getYear();
    this.getClassType();
  },
  methods: {
    selectClassData(e) {
      this.showDifferentSearch = +e !== 1;
      this.getData({
        ...this.params,
        page: 0,
        isBindingGrade: e
      })
    },
    searchData() {
      this.params.page = 0;
      this.getData(this.params);
    },
    goGradeDetail(id) {
      this.$router.push({
        path: '/grade/gradeDetails',
        query: {
          id: id
        }
      })
    },
    goOperationType(type, studentId, gradeId) {
      if (type === 'visit') {
        this.$router.push({
          path: '/students/studentDetails',
          query: {
            studentId: studentId,
            gradeId: gradeId ? gradeId : ''
          }
        })
      } else if (type === 'edit') {
        this.$router.push({
          path: '/students/studentOperation',
          query: {
            type,
            studentId,
            gradeId: gradeId ? gradeId : ''
          }
        })
      } else {
        this.$router.push({
          path: '/students/studentOperationAdd'
        })
      }
    },
    getGrade() {
      selectTypeList('grade')
          .then(res => {
            if (res.errorCode === 200) {
              this.gradeList = res.data;
            }
          })
    },
    getYear() {
      selectTypeList('vintage')
          .then(res => {
            if (res.errorCode === 200) {
              this.yearList = res.data;
            }
          })
    },
    getGradeType() {
      selectTypeList('gradeType')
          .then(res => {
            if (res.errorCode === 200) {
              this.gradeTypeList = res.data;
            }
          })
    },
    getClassType(grade) {
      selectClassList(grade)
          .then(res => {
            if (res.errorCode === 200) {
              this.classList = res.data;
            }
          })
    },

    getData(params) {
      this.loading = true;
      getStudentList(params)
          .then(res => {
            if (res.errorCode === 200) {
              let data = res.data;
              this.list = data.result;
              this.loading = false;
              this.params.total = data.pageResult.total || 0;
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
    },
    deleteData(id, phone) {
      const _this = this;
      console.log(id);
      if (phone) {
        this.$notify.error({
          title: '删除学生',
          message: '该账号已激活, 无法删除'
        })
      } else {
        this.$confirm('此操作将永久删除该学生, 是否继续?', '删除学生', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.deleteStudentApi(id);
        }).catch(() => {
        });
      }
    },
    deleteStudentApi(ids) {
      let id = typeof ids === 'string' ? [ids] : ids;
      deleteStudent(id).then(res => {
        if (res.errorCode === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.selectAllStudentList = [];
          this.getData({
            ...this.params,
            page: 0
          });
        } else {
          errorTip(res.msg)
        }
      })
    },
    isDisabled(row) {
      if (row.username) {
        return 0;
      } else {
        return 1;
      }
    },
    selectAllStudent(val) {
      if (val.length > 0) {
        val.forEach(item => {
          this.selectAllStudentList.push(item._id);
        })
      }
    },
    deleteAllStudent() {
      if (this.selectAllStudentList.length === 0) {
        this.$message.info('最少选择一条');
      } else {
        this.$confirm('此操作将永久删除该学生, 是否继续?', '删除学生', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteStudentApi(this.selectAllStudentList)
        }).catch(() => {
        });
      }
    }
  }
}
</script>

<style scoped lang="scss">
.tip {
  margin-right: 10px;
  height: 22px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #2E415B;
  line-height: 22px;
}

.link-btn {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #FFF;
  border: 1px solid #DCDFE6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: .1s;
  transition: .1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
</style>
