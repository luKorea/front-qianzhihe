<template>
  <div>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">学生筛选</span>
      <div class="flex-search">
        <div>
          <span class="tip">班级类型:</span>
          <el-select v-model="params.gradeType" placeholder="请选择" clearable filterable>
            <template v-if="gradeTypeList && gradeTypeList.length > 0">
              <el-option v-for="item in gradeTypeList" :label="item.name" :value="item.name"></el-option>
            </template>
          </el-select>
        </div>
        <div>
          <span class="tip">年级:</span>
          <el-select v-model="params.grade" placeholder="请选择" clearable filterable>
            <template v-if="gradeList && gradeList.length > 0">
              <el-option v-for="item in gradeList" :label="item.name" :value="item.name"></el-option>
            </template>
          </el-select>
        </div>
        <div>
          <span class="tip">班级:</span>
          <el-select v-model="params.graduate" placeholder="请选择" clearable filterable>
            <template v-if="classList && classList.length > 0">
              <el-option v-for="item in classList" :label="item.name" :value="item.name"></el-option>
            </template>
          </el-select>
        </div>
        <div style="display: flex;justify-content: space-between">
          <el-input style="margin-right: 10px;" v-model="params.queryOrIdOrNameOrPhone"
                    @keyup.enter.native="getData(params)"
                    placeholder="请输入学号、名称、手机号" clearable="true"/>
          <el-button type="primary" @click="getData(params)">筛选</el-button>
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
          <el-button type="primary" @click="goOperationType('add')">新增学生账号</el-button>
          <el-button type="warning" style="margin-right: 10px" @click="showDialog = !showDialog">批量导入学生账号</el-button>
          <el-link
              href="https://www.careershe.com/xls/%E5%AD%A6%E7%94%9F%E6%89%B9%E9%87%8F%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx"
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
      <el-table stripe :data="list" border style="width: 100%;margin: 20px 0">
        <el-table-column prop="studentId" label="学号" align="center"/>
        <el-table-column label="头像" align="center">
          <template slot-scope="scope">
            <el-avatar size="32" :src="scope.row.profilePicture"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="schoolUserName" label="姓名" align="center"/>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.gender === 'F' ? '女' : '男' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="手机号" align="center"/>
        <el-table-column prop="activationDate" width="200" label="激活日期" align="center"/>
        <el-table-column prop="enrollmentYear" label="入学年份" align="center"/>
        <el-table-column prop="educationLevel" label="年级" align="center"/>
        <el-table-column prop="gradeName" label="所属班级" align="center"/>
        <el-table-column prop="gradeType" label="班级类型" align="center"/>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="goOperationType('visit', scope.row._id, scope.row.gradeId)">查看
            </el-button>
            <el-button type="text" size="small" @click="goOperationType('edit', scope.row._id, scope.row.gradeId)">编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <basic-pagination
          :total="params.total"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
      />
    </basic-container>
  </div>
</template>

<script>
import {getStudentList} from "../../../api/admin/students";
import {selectTypeList, selectClassList} from "../../../api/common/search";
import {xhrGetFile} from "../../../utils/req";
import uploadExcel from '../../../components/upload/index';

export default {
  name: "teacherList",
  components: {
    uploadExcel
  },
  data() {
    return {
      showDialog: false,
      params: {
        page: 0,
        size: 10,
        gradeType: '', //	年级
        graduate: '', // 班级
        grade: '', //班级类型
        queryOrIdOrNameOrPhone: '',
        total: 0
      },
      classList: [],
      gradeTypeList: [],
      gradeList: [],
      list: []
    }
  },
  mounted() {
    this.getData(this.params);
    this.getGradeType();
    this.getGrade();
    this.getClassType();
  },
  methods: {
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
    getGradeType() {
      selectTypeList('gradeType')
          .then(res => {
            if (res.errorCode === 200) {
              this.gradeTypeList = res.data;
            }
          })
    },
    getClassType() {
      selectClassList()
          .then(res => {
            if (res.errorCode === 200) {
              this.classList = res.data;
            }
          })
    },

    getData(params) {
      getStudentList(params)
          .then(res => {
            if (res.errorCode === 200) {
              let data = res.data;
              this.list = data.result;
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
    downFile() {
      xhrGetFile('https://www.careershe.com/xls/%E5%AD%A6%E7%94%9F%E6%89%B9%E9%87%8F%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx', '学生批量导入模板', '下载成功')
          .then(res => {
          })
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