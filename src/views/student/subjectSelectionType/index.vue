<template>
  <div>
    <basic-skeleton :loading="loading" :number="1"></basic-skeleton>
    <div v-if="!loading">
      <div class="modal">
        <span class="tip-info"></span>
        <span class="tip-title">选科征集信息</span>
        <div class="m-top">
          <div class="m-bottom">
            <span class="tip-title">首选科目（2选1）</span>
            <el-radio-group v-model="info.firstChoice">
              <el-radio v-for="(item, index) in firstList" :label="item.name"/>
            </el-radio-group>
          </div>
          <div style="display: flex; align-items: center">
            <span class="tip-title">再选科目（4选2）</span>
            <el-checkbox-group v-model="checkList" :max="2">
              <el-checkbox v-for="(item, index) in recleaningList" :label="item.name" :key="index">{{ item.name }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <span class="modal" v-if="info.gradeDto === 'null'">您暂未绑定班级，请联系管理员</span>
        <span class="modal-title" v-if="info.isChoose === false">您的班级未开启志愿征集功能，如有需要请联系班级教师</span>
      </div>
      <div class="btn">
        <!--      <el-button style="color: #475B75" @click="goBack">取消</el-button>-->
        <!--      <el-button type="primary" @click="operationData">保存</el-button>-->
        <el-button type="primary" @click="operationData">编辑</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {selectTypeList} from "../../../api/common/search";
import {editInfo, getInfo} from "../../../api/student/archives";
import {errorTip, successTip} from "../../../utils/tip";

export default {
  name: "index",
  data() {
    return {
      loading: true,
      info: {},
      firstList: [],
      recleaningList: [],
      checkList: []
    }
  },
  mounted() {
    this.getData();
    this.getFirstSelectData();
    this.getRecleaningData();
  },
  methods: {
    getData() {
      this.loading = true;
      getInfo()
          .then(res => {
            if (res.errorCode === 200) {
              this.info = res.data;
              this.info.recleaning1 && this.info.recleaning2
                  ? this.checkList = [this.info.recleaning1, this.info.recleaning2]
                  : this.checkList = [];
              this.loading = false;
            }
          })
    },
    getFirstSelectData() {
      selectTypeList('firstChoice')
          .then(res => {
            if (res.errorCode === 200) this.firstList = res.data;
          })
    },
    getRecleaningData() {
      selectTypeList('recleaning')
          .then(res => {
            if (res.errorCode === 200) {
              this.recleaningList = res.data;
            }
          })
    },
    goBack() {
      this.$emit('changeShowEdit');
    },
    operationData() {
      let that = this;
      that.info['gender'] = this.form.gender === '男' ? 'M' : 'F';
      that.info['recleaning1'] = that.checkList[0];
      that.info['recleaning2'] = that.checkList[1];
      that.$refs['form'].validate(valid => {
        if (valid) {
          editInfo(that.info)
              .then(res => {
                if (res.errorCode === 200) {
                  successTip('修改成功');
                  that.goBack();
                } else {
                  errorTip(res.msg)
                }
              })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.modal {
  border-radius: 4px;
  position: relative;
  margin: 6px;
  padding: 20px;
  background: #FFFFFF;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
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
.btn {
  margin: 10px 6px;
}
</style>
