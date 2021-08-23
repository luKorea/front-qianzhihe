<template>
  <div>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">班级筛选</span>
      <div class="search-wrap m-top">
<!--        <div>-->
<!--          <span class="tip">班级类型:</span>-->
<!--          <el-select v-model="params.gradeType" placeholder="请选择" clearable filterable>-->
<!--            <template v-if="gradeTypeList && gradeTypeList.length > 0">-->
<!--              <el-option v-for="item in gradeTypeList" :label="item.name" :value="item.name"></el-option>-->
<!--            </template>-->
<!--          </el-select>-->
<!--        </div>-->
        <div>
          <span class="tip">年级:</span>
          <el-select v-model="params.grade"
                     @change="(e) => {
                       params.graduate = ''
                       getClassData(e)
                     }"
                     placeholder="请选择" :clearable="true" :filterable="true">
            <template v-if="gradeList && gradeList.length > 0">
              <el-option v-for="item in gradeList" :label="item.name" :value="item.name"></el-option>
            </template>
          </el-select>
        </div>
        <div>
          <span class="tip">班级:</span>
          <el-select v-model="params.graduate"
                     placeholder="请选择"
                     :clearable="true" :filterable="true"
          >
            <template v-if="classList && classList.length > 0">
              <el-option v-for="item in classList" :label="item.name" :value="item.name"></el-option>
            </template>
          </el-select>
        </div>
        <div>
          <el-input style="margin-right: 10px; width: 300px" v-model="params.searchText"
                    @keyup.enter.native="getData({
                    ...params,
                    page: 0
                    })"
                    placeholder="请输入班主任、生涯导师" :clearable="true"/>
          <el-button type="primary" :loading="loading" @click="searchData">筛选</el-button>
        </div>
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
      <el-table stripe :data="list" border style="width: 100%;margin: 20px 0" v-loading="loading">
        <el-table-column type="index" width="60px" label="编号" align="center"/>
        <el-table-column prop="name" label="班级名称" align="center">
          <template slot-scope="scope">
            <span class="inline-text"
                  @click="goOperationType('visit', scope.row._id)"
                  v-if="scope.row.name !== '-'">{{ scope.row.name }}</span>
            <span v-else>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="gradeCount" label="班级人数" align="center"/>
<!--        <el-table-column prop="gradeType" label="班级类型" align="center"/>-->
        <el-table-column prop="grade" label="年级" align="center"/>
        <el-table-column prop="enrollmentYear" label="入学年份" align="center"/>
        <el-table-column prop="teacherName" label="班主任" align="center">
          <template slot-scope="scope">
            <span class="inline-text"
                  @click="goTeacherDetail(scope.row.teacherId)"
                  v-if="scope.row.teacherName !== '-'">{{ scope.row.teacherName }}</span>
            <span v-else>{{ scope.row.teacherName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="teacher1Name" label="生涯导师1" align="center">
          <template slot-scope="scope">
            <span class="inline-text"
                  @click="goTeacherDetail(scope.row.teacher1Id)"
                  v-if="scope.row.teacher1Name !== '-'">{{ scope.row.teacher1Name }}</span>
            <span v-else>{{ scope.row.teacher1Name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="teacher2Name" label="生涯导师2" align="center">
          <template slot-scope="scope">
            <span class="inline-text"
                  @click="goTeacherDetail(scope.row.teacher2Id)"
                  v-if="scope.row.teacher2Name !== '-'">{{ scope.row.teacher2Name }}</span>
            <span v-else>{{ scope.row.teacher2Name }}</span>
          </template>

        </el-table-column>
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="goOperationType('edit', scope.row._id)">编辑</el-button>
            <el-button type="text" size="small" style="color: red" @click="openOrClose(scope.row._id, false)"
                       v-if="scope.row.openCourseSelectionFor">
              关闭选科征集
            </el-button>
            <el-button type="text" size="small" @click="openOrClose(scope.row._id, true)" v-else>
              开启选科征集
            </el-button>
            <el-button type="text" size="small" @click="goOperationType('visit', scope.row._id)">查看班级详情</el-button>
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
import {getGradeList, updateCourseSelectionFor} from "../../../api/admin/grade";
import {selectTypeList, selectClassList} from "../../../api/common/search";
import {errorTip, operationTip, successTip} from "../../../utils/tip";

export default {
  name: "gradeList",
  data() {
    return {
      loading: true,
      params: {
        page: 0,
        size: 10,
        gradeType: '', //	年级
        graduate: '',
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
    this.getClassData();
    this.getGradeType();
    this.getGrade();
  },
  methods: {
    searchData() {
      this.params.page = 0;
      this.getData(this.params);
    },
    openOrClose(id, flag) {
      let that = this;
      operationTip({
        message: flag ? '是否开启选科征集' : '是否关闭选科征集',
        title: '选科征集'
      }, () => {
        updateCourseSelectionFor({
          _id: id,
          openCourseSelectionFor: flag
        }).then(res => {
          if (res.errorCode === 200) {
            successTip();
            that.getData(this.params);
          } else {
            errorTip(res.msg)
          }
        })
      })
    },
    goTeacherDetail(teacherId) {
      this.$router.push({
        path: '/teachers/teacherDetails',
        query: {teacherId: teacherId}
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
    getClassData(grade) {
      selectClassList(grade)
          .then(res => {
            if (res.errorCode === 200) {
              this.classList = res.data;
            }
          })
    },
    getData(params) {
      this.loading = true;
      getGradeList(params)
          .then(res => {
            if (res.errorCode === 200) {
              let data = res.data;
              this.list = data.result;
              this.loading = false;
              this.params.total = data.pageResult.total || 0;
            } else {
              errorTip(res.msg);
              this.loading = false;
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
