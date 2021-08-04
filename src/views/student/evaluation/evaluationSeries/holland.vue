<template>
  <div class="modal">
    <basic-student-back @goBack="goBack">
      <span class="tip-info"></span>
      <span class="tip-title">兴趣测试</span>
      <div class="m-top percent">
        <span class="title">测试进度：{{ startNumber }} / {{ dataList.length }}</span>
        <el-progress :percentage="startNumber / 0.42" :show-text="false"/>
      </div>
    </basic-student-back>
    <basic-container>
      <div class="modal">
        <span class="tip-title">{{ selectList.id }}. {{ selectList.name }}</span>
        <div class="m-top answer-list">
          <div
              v-for="(item, index) in selectList.answer"
              :key="index"
              :class="selectList.selectedIndex === index ? 'select' : ''"
              @click="selectItem(item, index)"
          >
            {{ item.type }}. {{ item.value }}
          </div>
        </div>
      </div>
    </basic-container>
    <div class="footer-btn">
      <el-button v-if="startNumber > 1" @click="prev">上一题</el-button>
      <el-button @click="next" v-if="!submitBtn" type="primary"
                 :disabled="selectList.selectedIndex === -1">下一题
      </el-button>
      <el-button @click="submitForm" v-else type="primary" :loading="loading">提交</el-button>
    </div>
<!--    <div class="modal-title">该功能即将完成</div>-->
  </div>
</template>

<script>
import {hollandAnswerList} from "../../../../utils/list";
import {deleteTeacher} from "../../../../api/admin/taecher";
import {examSendToHolland} from "../../../../api/student/evaluation";
import {errorTip} from "../../../../utils/tip";

export default {
  name: "holland",
  data() {
    return {
      loading: false,
      list: [], // 用户选中题目，以及对应题目选中的值
      dataList: hollandAnswerList, // 题目
      selectList: {}, // 用户选择的题目
      selectedIndex: -1, // 用户选中的题目
      startNumber: 1, // 第几题
      submitBtn: false, // 提交按钮
      oData: {},
    };
  },
  mounted() {
    //使用oData对象以id为key
    this.dataList.forEach((v) => {
      this.oData[v.id] = {...v, selectedIndex: -1};
    });
    this.initUserSelectList(this.startNumber);
  },
  methods: {
    goBack() {
      this.$confirm('您确定退出当前测试吗?退出之后数据不会被保存', '退出测试', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch("tagsView/delView", this.$route);
        this.$router.go(-1);
      }).catch(() => {
        this.$notify({
          title: '兴趣测试',
          message: '接着答题吧~~~~',
          type: 'success'
        });
      });
    },
    initUserSelectList(number) {
      //加载题目
      // this.selectList当前题目，应该保存一个选择状态，不然上下题 会丢失状态
      this.selectList = this.oData[this.dataList[number - 1].id];
    },
    // 上一题
    prev() {
      this.startNumber--;
      this.initUserSelectList(this.startNumber);
      if (this.startNumber < this.dataList.length) {
        this.submitBtn = false;
      }
    },
    // 下一题
    next() {
      if (this.startNumber === this.dataList.length) {
        this.submitBtn = true;
      } else {
        this.startNumber++;
        this.initUserSelectList(this.startNumber);
      }
    },
    //  用户选中答案
    selectItem(item, index) {
      //上面点击多次，数据会冗余list会添加重复数据
      this.selectList.selectedIndex = index;
      setTimeout(() => {
        this.next();
      }, 100);
    },
    //   提交用户所答的题
    submitForm() {
      this.list = [];
      this.loading = true;
      if (this.oData) {
        for (let key in this.oData) {
          let selectedIndex = this.oData[key].selectedIndex;
          let item = this.oData[key].answer[selectedIndex];
          this.list.push({
            score: `q${key}`,
            satisfaction: item.scope
          });
        }
      }
      this.$store.dispatch('point/pointData', {
        activityName: `完成测试 -【兴趣测试】`,
        activityType: '兴趣测试',
        params: this.$route.query
      }).then(res => {
        console.log(res, 'data');
      })
      console.log(this.list);
      examSendToHolland(this.list)
      .then(res => {
        console.log(res);
        if (res.errorCode === 200) {
          this.loading = false;
          this.$store.dispatch("tagsView/delView", this.$route);
          this.$message.success('恭喜您完成测试，快来看看您的测试结果吧')
          localStorage.setItem('holland', JSON.stringify(res.data))
          this.$router.push({
            path: '/studentEvaluation/evaluationList/evaluationDetails',
            query: {
              type: 'holland'
            }
          })
        } else {
          this.loading = false;
          errorTip(res.msg)
        }
      })
    },
  },
};
</script>


<style scoped lang="scss">
.percent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 72px;
  background: #f0f6ff;
  border-radius: 4px;
  padding: 0 20px;

  .title {
    height: 22px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #475b75;
    line-height: 22px;
    margin-bottom: 10px;
  }

  .el-progress {
    width: 100%;
  }
}

.answer-list {
  div {
    width: 100%;
    height: 54px;
    line-height: 54px;
    background: #f2f2f2;
    border-radius: 4px;
    margin-bottom: 20px;
    padding-left: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #2e415b;
    cursor: pointer;
  }

  .select {
    border: 1px solid #1e81ff;
  }
}
.modal {
  width: 100%;
  position: relative;
  .modal-title {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.65);
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    border-radius: 4px;
    z-index: 2;
  }
}
</style>
