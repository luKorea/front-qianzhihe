<template>
  <div>
    <div>
      <basic-container-back>
        <span class="tip-info"></span>
        <span class="tip-title">基本信息</span>
        <div style="margin-top: 20px">
          <el-row :gutter="4" class="m-bottom">
            <el-col :span="8">
              <span class="student-title">学号：</span>
              <span class="student-info">{{ info.studentId }}</span>
            </el-col>
            <el-col :span="8">
              <div style="display: flex;align-items: center; margin-top: -10px">
                <span class="student-title">头像：</span>
                <el-avatar size="30" :src="info.profilePicture"/>
              </div>
            </el-col>
            <el-col :span="8">
              <span class="student-title">姓名：</span>
              <span class="student-info">{{ info.schoolUserName }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="4" style="margin-bottom: 30px">
            <el-col :span="8">
              <span class="student-title">性别：</span>
              <span class="student-info" v-if="info.gender">{{ info.gender === 'F' ? '女' : '男' }}</span>
            </el-col>
            <el-col :span="8">
              <div>
                <span class="student-title">手机号：</span>
                <span class="student-info">{{ info.username }}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <span class="student-title">班级：</span>
              <span class="student-info">{{ info.gradeName }}</span>
            </el-col>
          </el-row>
          <el-row :gutter="4" class="m-bottom">
            <el-col :span="8">
              <span class="student-title">测评类型：</span>
              <span class="student-info">{{ info.type }}</span>
            </el-col>
            <el-col :span="8">
              <div>
                <span class="student-title">测评时间：</span>
                <span class="student-info">{{ info.testTime }}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </basic-container-back>
      <holland-detail :major-list="majorList"
                      :type-list="typeList"
                      :random-info="randomInfo" v-if="params.type === 'holland'"/>
      <mbit-detail v-else
                   :major-list="majorList"
                   :mbit-info="mbitInfo"
      />
    </div>
    <div class="footer-btn-no-fixed">
      <el-button style="color: #475B75" @click="goBack">取消</el-button>
    </div>
  </div>
</template>

<script>
import {getEvaluationDetails, getEvaluationMajor} from "../../../../../api/common/evaluation";
import hollandDetail from "./hollandDetail";
import mbitDetail from "./mbitDetail";

export default {
  name: "index",
  components: {
    hollandDetail,
    mbitDetail
  },
  data() {
    return {
      params: {
        type: '',
        hollandId: ''
      },
      info: {},
      mbitInfo: {},
      majorList: [],
      randomInfo: {},
      typeList: []
    }
  },
  mounted() {
    let {type, hollandId} = this.$route.query;
    this.params.type = type;
    this.params.hollandId = hollandId;
    this.getData(this.params);
    this.getMajor(this.params);

  },
  methods: {
    getData(params) {
      getEvaluationDetails(params)
          .then(res => {
            if (res.errorCode === 200) {
              this.info = res.data.user;
              this.mbitInfo = res.data.personality;
              this.randomInfo = res.data.hollandType;
              this.typeList = res.data.result;
              console.log(res, 'randomInfo');
            }
          })
    },
    getMajor(params) {
      getEvaluationMajor(params)
          .then(res => {
            if (res.errorCode === 200) {
              this.majorList = res.data;
            }
          })
    },
    goBack() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>

</style>