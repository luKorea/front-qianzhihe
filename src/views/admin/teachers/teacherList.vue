<template>
  <div>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">教师筛选</span>
      <div class="search-wrap m-top">
        <div>
          <span class="tip">教师类型:</span>
          <el-select v-model="params.teacherType" placeholder="请选择" :clearable="true" :filterable="true">
            <template v-if="teacherList && teacherList.length > 0">
              <el-option v-for="item in teacherList" :label="item.name" :value="item.name"></el-option>
            </template>
          </el-select>
        </div>
        <div>
          <span class="tip">代课年级:</span>
          <el-select v-model="params.grade" placeholder="请选择" :clearable="true" :filterable="true">
            <template v-if="gradeList && gradeList.length > 0">
              <el-option v-for="item in gradeList" :label="item.name" :value="item.name"></el-option>
            </template>
          </el-select>
        </div>
        <div>
          <el-input style="margin-right: 10px"
                    @keyup.enter.native="getData({
                    ...params,
                    page: 0
                    })"
                    v-model="params.queryOrTeacherNameOrPhone" placeholder="请输入教师名称、手机号"
                    :clearable="true"/>
          <el-button type="primary" :loading="loading" @click="searchData">筛选</el-button>
        </div>
      </div>
    </basic-container>
    <basic-container>
      <div style="display: flex; justify-content: space-between;align-items: center;margin-bottom: 10px">
        <div>
          <span class="tip-info"></span>
          <span class="tip-title">教师列表</span>
        </div>
       <div>
         <el-button type="primary" @click="goOperationType('add')">添加老师</el-button>
<!--         <el-button type="danger" @click="deleteAllTeacher">批量删除</el-button>-->
       </div>
      </div>
      <el-table stripe :data="list"
                border style="width: 100%;margin-bottom: 20px" v-loading="loading">
<!--        @selection-change="selectAllTeacher"-->
<!--        <el-table-column type="selection" align="center" />-->
        <el-table-column type="index" width="60px" label="编号" align="center"/>

        <!--        <el-table-column prop="_id" label="教师ID" align="center" />-->
        <el-table-column prop="name" label="教师名称" align="center">
          <template slot-scope="scope">
            <span class="inline-text"
                  @click="goOperationType('visit', scope.row._id)"
                  v-if="scope.row.name !== '-'">{{scope.row.name}}</span>
            <span v-else>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="teacherType" label="教师类型" align="center" />
        <el-table-column prop="phone" label="手机号" align="center" />
        <el-table-column label="代课班级" align="center">
          <template slot-scope="scope" v-if="scope.row.teacherGradeDtoList && scope.row.teacherGradeDtoList.length > 0">
            <span class="inline-text"
                  @click="goGradeDetail(item._id)"
                  v-for="item in scope.row.teacherGradeDtoList" :key="item._id">
              {{item.name}};
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="goOperationType('visit', scope.row._id)">查看</el-button>
            <el-button type="text" size="small" @click="goOperationType('edit', scope.row._id)">编辑</el-button>
            <el-button type="text" size="small" style="color: red" @click="deleteData(scope.row._id)">删除</el-button>
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
import {getTeacherList, deleteTeacher} from "../../../api/admin/taecher";
import {selectTypeList} from "../../../api/common/search";
import {errorTip} from "../../../utils/tip";

export default {
  name: "teacherList",
  data() {
    return {
      loading: true,
      params: {
        page: 0,
        size: 10,
        queryOrTeacherNameOrPhone: '',
        grade: '',
        teacherType: '',
        total: 0
      },
      teacherList: [],
      gradeList: [],
      list: [],
      teacherAllList: []
    }
  },
  mounted() {
    this.getData(this.params);
    this.getGradeType();
    this.getTeacherType();
  },
  methods: {
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
    goOperationType(type, id) {
      if (type === 'visit') {
        this.$router.push({
          path: '/teachers/teacherDetails',
          query: {teacherId: id}
        })
      } else {
        this.$router.push({
          path: '/teachers/teacherOperation',
          query: {
            type,
            id
          }
        })
      }
    },
    deleteData(id) {
      this.$confirm('此操作将永久删除该老师, 是否继续?', '删除教师', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteTeacherApi(id);
      }).catch(() => {
      });
    },
    deleteTeacherApi(ids) {
      let id = typeof ids === 'string' ? [ids] : ids;
      deleteTeacher(id).then(res => {
        if (res.errorCode === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.teacherAllList = [];
          this.getData({
            ...this.params,
            page: 0
          });
        } else {
          errorTip(res.msg)
        }
      })
    },
    selectAllTeacher(val) {
      if (val.length > 0) {
        val.forEach(item => {
          this.teacherAllList.push(item._id);
        })
      }
    },
    deleteAllTeacher() {
      if (this.teacherAllList.length === 0) {
        this.$message.info('最少选择一条');
      } else {
        this.$confirm('此操作将永久删除该老师, 是否继续?', '删除教师', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteTeacherApi(this.teacherAllList);
        }).catch(() => {
        });
      }
    },
    getTeacherType() {
      selectTypeList('teacherType')
      .then(res => {
        if (res.errorCode === 200) {
          this.teacherList = res.data;
        }
      })
    },
    getGradeType() {
      selectTypeList('grade')
      .then(res => {
        if (res.errorCode === 200) {
          this.gradeList = res.data;
        }
      })
    },
    getData(params) {
      this.loading = true;
      getTeacherList(params)
      .then(res => {
        this.loading = false;
        if (res.errorCode === 200) {
          let data = res.data;
          this.list = data.result;
          this.params.total = data.pageResult.total || 0;
        } else errorTip(res.msg)
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
