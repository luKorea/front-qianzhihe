<template>
  <div>
    <basic-container>
      <span class="tip-info"></span>
      <span class="tip-title">兴趣测试</span>
      <div class="m-top percent">
        <span class="title"
        >测试进度：{{ startNumber }} / {{ dataList.length }}</span
        >
        <el-progress :percentage="startNumber / 0.3" :show-text="false"/>
      </div>
    </basic-container>
    <basic-container>
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
    </basic-container>

    <div class="footer-btn">
      <el-button v-if="startNumber > 1" @click="prev">上一题</el-button>
      <el-button @click="next" v-if="!submitBtn" type="primary"
                 :disabled="selectList.selectedIndex === -1">下一题
      </el-button>
      <el-button @click="submitForm" v-else type="primary">提交</el-button>
    </div>
  </div>
</template>

<script>
import {hollandAnswerList} from "../../../../utils/list";

export default {
  name: "holland",
  data() {
    return {
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
    console.log(this.oData);
    this.initUserSelectList(this.startNumber);
  },
  methods: {
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
      this.startNumber++;
      this.initUserSelectList(this.startNumber);
      if (this.startNumber === this.dataList.length) {
        this.submitBtn = true;
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
      console.log(this.oData);
      this.list = [];
      for (let key in this.oData) {
        let selectedIndex = this.oData[key].selectedIndex;
        let item = this.oData[key].answer[selectedIndex];
        this.list.push({
          name: this.oData[key].name,
          value: item && item.value,
          saveIndex: selectedIndex,
        });
      }
      console.log(this.list);
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
</style>