<template>
  <div>
    <basic-skeleton :loading="loading"></basic-skeleton>
    <div v-if="!loading">
      <el-form label-width="80px" :model="form" :rules="rules" ref="form">
        <basic-container>
          <span class="tip-info"></span>
          <span class="tip-title">填写选科征集计划</span>
          <div style="margin-top: 20px">
            <el-row :gutter="10">
              <el-col :span="10">
                <el-form-item label="计划名称" required prop="name">
                  <el-input v-model="form.name"/>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="入学年份" required prop="enrollmentYear">
                  <el-select v-model="form.enrollmentYear"
                             :clearable="true" :filterable="true"
                             placeholder="请选择" style="width: 100%">
                    <el-option
                        v-for="(item, index) in yearList"
                        :key="index"
                        :label="item.name"
                        :value="item.name"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="10">
                <el-form-item label="开始时间" required prop="startTime">
                  <el-date-picker
                      style="width: 100%"
                      v-model="form.startTime"
                      type="date"
                      placeholder="选择开始时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="结束时间" required prop="endTime">
                  <el-date-picker
                      style="width: 100%"
                      v-model="form.endTime"
                      type="date"
                      placeholder="选择结束时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </basic-container>
      </el-form>
      <div class="footer-btn">
        <el-button style="color: #475B75" @click="goBack">返回</el-button>
        <el-button type="primary" :loading="loading" @click="operationData">{{ text }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  validateClassType, validateEndTime, validateStartTime,
  validateYear,
} from "../../../../utils/validate";
import { selectTypeList } from "../../../../api/common/search";
import { successTip, errorTip } from "../../../../utils/tip";
import { addOrEditSubjectPlain, getEditInfo } from '../../../../api/admin/subjectPlain'

export default {
  name: "index",
  data () {
    return {
      loading: false,
      text: '立即添加',
      type: '',
      id: '',
      form: {},
      rules: {
        name: [{ required: true, trigger: 'blur', validator: validateClassType }],
        enrollmentYear: [{ required: true, trigger: 'blur', validator: validateYear }],
        startTime: [{ required: true, trigger: 'blur', validator: validateStartTime }],
        endTime: [{ required: true, trigger: 'blur', validator: validateEndTime }],
      },
      yearList: [],
    }
  },
  mounted () {
    let { type, id } = this.$route.query;
    this.$route.meta.title = type === 'add' ? '新增选科征集计划' : '编辑选科征集计划';
    this.type = type;
    this.id = id;
    this.text = type === 'add' ? '立即添加' : '保存';
    this.getYear();
    this.switchData();
  },
  methods: {
    getYear () {
      selectTypeList('vintage').then(res => {
        if (res.errorCode === 200) {
          this.yearList = res.data;
        }
      })
    },
    switchData () {
      switch (this.type) {
        case "add":
          break;
        case "edit":
          this.getEditData(this.id);
          break;
      }
    },
    getEditData (params) {
      this.loading = true;
      getEditInfo(params).then(res => {
        console.log(res, 'res')
        if (res.errorCode === 200) {
          this.form = res.data;
          this.loading = false;
        } else {
          errorTip(res.msg)
          this.loading = false;
        }
      })
    },
    goBack () {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.go(-1);
    },
    operationData () {
      let that = this;
      that.$refs['form'].validate(valid => {
        if (valid) {
          that.addOrEditData(that.form)
        } else {
          return false;
        }
      })
    },
    addOrEditData (data) {
      addOrEditSubjectPlain(data).then(res => {
        if (res.errorCode === 200) {
          successTip(this.type === 'add' ? '新增成功' : '修改成功');
          this.loading = false;
          this.goBack();
        } else {
          errorTip(res.msg)
        }
      })
    },
  },
}
</script>

<style scoped>
</style>
