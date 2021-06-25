<template>
  <div>
    <basic-container>
      <div style="margin-top: 20px">
        <el-row>
          <el-col :span="6">
            <span class="tip">班级类型:</span>
            <el-select v-model="params.gradeType" placeholder="请选择" clearable>
              <template v-if="gradeTypeList && gradeTypeList.length > 0">
                <el-option v-for="item in gradeTypeList" :label="item.name" :value="item.name"></el-option>
              </template>
            </el-select>
          </el-col>
          <el-col :span="6">
            <span class="tip">年级:</span>
            <el-select v-model="params.grade" placeholder="请选择" clearable>
              <template v-if="gradeList && gradeList.length > 0">
                <el-option v-for="item in gradeList" :label="item.name" :value="item.name"></el-option>
              </template>
            </el-select>
          </el-col>
          <el-col :span="6">
            <span class="tip">班级:</span>
            <el-select v-model="params.grade" placeholder="请选择" clearable>
              <template v-if="gradeList && gradeList.length > 0">
                <el-option v-for="item in gradeList" :label="item.name" :value="item.name"></el-option>
              </template>
            </el-select>
          </el-col>
          <el-col :span="6">
            <div style="display: flex">
              <el-input style="margin-right: 10px" v-model="params.searchText"
                        placeholder="请输入班主任、生涯导师" clearable="true"/>
              <el-button type="primary" @click="getData(params)">筛选</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </basic-container>
    <basic-container>
      <div class="flex">
        <div>
          <span class="tip-info"></span>
          <span class="tip-title">班级列表</span>
        </div>
        <div>
          <el-button type="primary" @click="goOperationType('add')">新增班级</el-button>
        </div>
      </div>
      <el-table :data="list" border style="width: 100%;margin: 20px 0">
        <el-table-column prop="_id" label="班级ID" align="center" />
        <el-table-column prop="name" label="班级名称" align="center" />
        <el-table-column prop="gradeCount" label="班级人数" align="center" />
        <el-table-column prop="gradeType" label="班级类型" align="center" />
        <el-table-column prop="grade" label="年级" align="center" />
        <el-table-column prop="enrollmentYear" label="入学年份" align="center" />
        <el-table-column prop="teacherName" label="班主任" align="center" />
        <el-table-column prop="teacher1Name" label="生涯导师1" align="center" />
        <el-table-column prop="teacher2Name" label="生涯导师2" align="center" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="goOperationType('edit', scope.row._id, scope.row.gradeId)">编辑</el-button>
            <el-button type="text" size="small" @click="goOperationType('visit', scope.row._id, scope.row.gradeId)">查看班级详情</el-button>
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
import {getGradeList} from "../../api/grade";
import {selectTypeList} from "../../api/search";
export default {
  name: "teacherList",
  data() {
    return {
      params: {
        page: 0,
        size: 10,
        gradeType: '', //	年级
        grade: '', //班级类型
        searchText: '',
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
  },
  methods: {
    goOperationType(type, studentId, gradeId) {
      if (type === 'visit') {
        this.$router.push({
          path: '/grade/gradeDetails',
          query: {
            studentId: studentId,
            gradeId: gradeId ? gradeId : ''
          }
        })
      } else {
        this.$router.push({
          path: '/grade/gradeOperation',
          query: {
            type,
            studentId,
            gradeId: gradeId ? gradeId : ''
          }
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
    getData(params) {
      getGradeList(params)
      .then(res => {
        if (res.errorCode === 200) {
          let data = res.data;
          this.list = data.result;
          console.log(res);
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
</style>