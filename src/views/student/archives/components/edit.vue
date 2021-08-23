<template>
  <div>
    <el-form status-icon label-width="80px" :model="info" :rules="rules" ref="form">
      <basic-container>
        <span class="tip-info"></span>
        <span class="tip-title">基本信息</span>
        <div style="margin-top: 20px">
          <el-row :gutter="4">
            <el-col :span="10">
              <el-form-item label="学号">
                <el-input v-model="info.studentId" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="头像">
                <el-avatar :size="30" :src="info.profilePicture"></el-avatar>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="4">
            <el-col :span="10">
              <el-form-item label="姓名" required prop="name">
                <el-input v-model="info.schoolUserName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="性别">
                <el-select v-model="info.gender" style="width: 100%" disabled>
                   <el-option value="F" label="女"></el-option>
                   <el-option value="M" label="男"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="4">
            <el-col :span="10">
              <el-form-item label="手机号">
                <el-input v-model="info.username" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="激活日期">
                <el-input v-model="info.activationDate" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </basic-container>
<!--      <div class="modal">-->
<!--        <span class="tip-info"></span>-->
<!--        <span class="tip-title">选科征集信息</span>-->
<!--        <div class="m-top">-->
<!--          <div class="m-bottom">-->
<!--            <span class="tip-title">首选科目（2选1）</span>-->
<!--            <el-radio-group v-model="info.firstChoice">-->
<!--              <el-radio v-for="(item, index) in firstList" :label="item.name"/>-->
<!--            </el-radio-group>-->
<!--          </div>-->
<!--          <div style="display: flex; align-items: center">-->
<!--            <span class="tip-title">再选科目（4选2）</span>-->
<!--            <el-checkbox-group v-model="checkList" :max="2">-->
<!--              <el-checkbox v-for="(item, index) in recleaningList" :label="item.name" :key="index">{{ item.name }}-->
<!--              </el-checkbox>-->
<!--            </el-checkbox-group>-->
<!--          </div>-->
<!--        </div>-->
<!--        <span class="modal" v-if="info.gradeDto === 'null'">您暂未绑定班级，请联系管理员</span>-->
<!--        <span class="modal-title" v-if="info.isChoose === false">您的班级未开启志愿征集功能，如有需要请联系班级教师</span>-->
<!--      </div>-->
    </el-form>
    <div class="footer-btn">
      <el-button style="color: #475B75" @click="goBack">返回</el-button>
      <el-button type="primary" @click="operationData">保存</el-button>
    </div>
  </div>
</template>

<script>
import {
  validateUsername
} from "../../../../utils/validate";
import {editInfo} from "../../../../api/student/archives";
import {selectTypeList} from "../../../../api/common/search";
import {errorTip, operationTip, successTip} from "../../../../utils/tip";

export default {
  name: "index",
  props: {
    info: {
      type: Object,
      default: () => {

      }
    }
  },
  data() {
    return {
      form: {},
      rules: {
        name: [{required: true, trigger: 'blur', validator: validateUsername}],
      },
      firstList: [],
      recleaningList: [],
      checkList: []
    }
  },
  mounted() {
    this.info.recleaning1 && this.info.recleaning2
        ? this.checkList = [this.info.recleaning1, this.info.recleaning2]
        : this.checkList = [];
    this.info['gender'] = this.info.gender === 'F' ? '女' : '男';
    this.getFirstSelectData();
    this.getRecleaningData();
  },
  methods: {
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
      // that.info['recleaning1'] = that.checkList[0];
      // that.info['recleaning2'] = that.checkList[1];
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
.student-table-title {
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-items: center;
  height: 54px;
  background-color: #FFFFFF;

  span {
    width: 33.33%;
    height: 54px;
    line-height: 54px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #475B75;
    border-top: 1px solid #dddee2;
    border-right: 1px solid #dddee2;
  }
}

.m-right {
  margin-right: 20px;
}

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


</style>
