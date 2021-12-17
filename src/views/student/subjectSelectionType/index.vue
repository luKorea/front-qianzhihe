<template>
  <div>
    <div class="title">模拟选科</div>
    <basic-skeleton :loading="loading" :number="10"></basic-skeleton>
    <div v-if="!loading">
      <template v-if="info && info.length > 0">
        <div class="modal" v-for="(subjectItem, index) in info" :key="subjectItem._id">
          <div class="left">
            <div class="state">
              <span v-if="subjectItem.state === 1" class="no-start">未开始</span>
              <span v-if="subjectItem.state === 2" class="starting">已开始</span>
              <span v-if="subjectItem.state === 3" class="close">已截止</span>
              <div class="state-name">{{ subjectItem.name }}</div>
              <div class="state-time">(提交选科时间：{{ subjectItem.startTime }}—{{ subjectItem.endTime }})</div>
            </div>
            <div class="m-top">
              <div class="m-bottom">
                <span class="tip-title">首选科目（2选1）</span>
                <el-radio-group v-model="subjectItem.firstChoice">
                  <el-radio
                      v-for="item in firstList"
                      :key="item.id"
                      :label="item.name"
                      :disabled="showBtn || subjectItem.state !== 2 || selectIndex !== index"
                  />
                </el-radio-group>
              </div>
              <div style="display: flex; align-items: center">
                <span class="tip-title">再选科目（4选2）</span>
                <el-checkbox-group v-model="subjectItem.checkList" :max="2" @change="handleChange">
                  <el-checkbox v-for="item in recleaningList"
                               v-model="subjectItem.checkList"
                               :disabled="showBtn || subjectItem.state !== 2 || selectIndex !== index"
                               :label="item.name" :key="item.id">{{ item.name }}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="right" v-if="subjectItem.state === 2">
            <div class="btn">
              <el-button v-if="!showBtn && selectIndex === index" style="color: #475B75" @click="closeBtn">取消</el-button>
              <el-button v-if="!showBtn && selectIndex === index" type="primary" @click="operationData">保存</el-button>
              <el-button v-if="showBtn" type="primary"
                         @click="editOperation(subjectItem._id, index)">编辑
              </el-button>

            </div>
          </div>
          <div class="modal-title" v-if="subjectItem.state !== 2">
            <div>{{ subjectItem.name }} ({{ subjectItem.state === 1 ? '未开始' : '已截止' }})</div>
            <div>{{ subjectItem.startTime }}-{{ subjectItem.endTime }}</div>
          </div>
        </div>
      </template>
      <template v-else>
        <basic-nothing title="您的年级暂未创建模拟选科计划"></basic-nothing>
      </template>
    </div>
  </div>
</template>
<script>
import { selectTypeList } from "../../../api/common/search";
import { editInfo, getCourseSelection } from "../../../api/student/archives";
import { errorTip, successTip } from "../../../utils/tip";
import { nanoid } from 'nanoid'

export default {
  name: "index",
  data () {
    return {
      showBtn: true,
      loading: true,
      info: [],
      firstList: [],
      recleaningList: [],
      selectId: '',
      selectIndex: ''
    }
  },
  mounted () {
    this.getData();
    this.getFirstSelectData();
    this.getRecleaningData();
  },
  methods: {
    handleChange (e) {
      console.log(e, 'e')
    },
    editOperation (id, index) {
      this.selectIndex = index;
      this.selectId = id;
      this.selectIndex === index ? this.showBtn = false : this.showBtn = true;
    },
    closeBtn () {
      this.showBtn = !this.showBtn;
      this.initValue();
    },
    getData () {
      this.loading = true;
      getCourseSelection().then(res => {
        if (res.errorCode === 200) {
          console.log(res.data, 'res')
          this.info = res.data;
          this.initValue();
          this.loading = false;
        }
      })
    },
    initValue () {
      this.info.forEach((item, index) => {
        this.$set(item, 'checkList', item.recleaning1 && item.recleaning2 ? [item.recleaning1, item.recleaning2] : [])
      })
    },
    getFirstSelectData () {
      selectTypeList('firstChoice').then(res => {
        if (res.errorCode === 200) {
          res.data.forEach(item => {
            item['id'] = nanoid();
          })
          this.firstList = res.data;
        }
      })
    },
    getRecleaningData () {
      selectTypeList('recleaning').then(res => {
        if (res.errorCode === 200) {
          res.data && res.data.length > 0 && res.data.forEach(item => {
            item['id'] = nanoid(8);
            this.recleaningList.push(item);
          })
        }
      })
    },
    goBack () {
      this.$emit('changeShowEdit');
    },
    operationData () {
      let that = this;
      that.info.forEach(item => {
        if (item._id === that.selectId) {
          if (item.checkList.length === 0) {
            errorTip('再选科目不能为空')
          } else if (item.checkList.length === 1) {
            errorTip('再选科目需选择两个')
          } else {
            item['courseSelectionPlanId'] = item._id;
            item['recleaning1'] = item.checkList[0];
            item['recleaning2'] = item.checkList[1];
            editInfo(item).then(res => {
              if (res.errorCode === 200) {
                successTip('修改成功');
                that.showBtn = true;
                that.getData();
              } else {
                errorTip(res.msg)
              }
            })
          }
        }
      })
    },
  },
}
</script>

<style scoped lang="scss">
.title {
  margin-left: 10px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #AFB8C6;
  line-height: 22px;
}

.modal {
  border-radius: 4px;
  position: relative;
  margin: 10px 10px 20px 10px;
  padding: 20px;
  background: #FFFFFF;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .modal-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.65);
    transform: translate(-50%, -50%);
    //text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #c1bdbd;
    border-radius: 4px;
    z-index: 2;
    line-height: 30px;
  }
}

.btn {
  margin: 10px 6px;
}
</style>
