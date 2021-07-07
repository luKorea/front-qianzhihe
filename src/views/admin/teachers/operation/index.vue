<template>
  <div>
    <el-form status-icon label-width="80px" :model="form" :rules="rules" ref="form">
      <basic-container>
        <span class="tip-info"></span>
        <span class="tip-title">基本信息</span>
        <div style="margin-top: 20px">
          <el-row :gutter="4">
            <el-col :span="10">
              <el-form-item label="教师名称" required prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="教师类型" required prop="teacherType">
                <el-select v-model="form.teacherType" placeholder="请选择" filterable clearable style="width: 100%">
                  <template v-if="teacherList && teacherList.length > 0">
                    <el-option v-for="item in teacherList" :label="item.name" :value="item.name"></el-option>
                  </template>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="4">
            <el-col :span="10">
              <el-form-item label="手机号" required prop="phone">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="备注">
                <el-input v-model="form.comment"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </basic-container>
      <basic-container>
        <span class="tip-info"></span>
        <span class="tip-title">账号信息</span>
        <div style="margin-top: 20px">
          <el-row :gutter="4">
            <el-col :span="10">
              <el-form-item label="登录账号" required prop="username">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="登录密码" required prop="password">
                <el-input v-model="form.password" type="password" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </basic-container>
    </el-form>
    <div class="footer-btn">
      <el-button style="color: #475B75" @click="goBack">取消</el-button>
      <el-button type="primary" @click="operationData">{{text}}</el-button>
    </div>
  </div>
</template>

<script>
import {selectTypeList} from "../../../../api/common/search";
import {
  validatePassword,
  validatePhone,
  validateTeacherName,
  validateTeacherType,
  validateUsername
} from "../../../../utils/validate";
import {addTeacher, getEditInfo, updateTeacher} from "../../../../api/admin/taecher";
import {successTip} from "../../../../utils/tip";

export default {
  name: "index",
  data() {
    return {
      type: 'add',
      text: '立即添加',
      form: {
        name: '', // 教师名称
        password: '', // 密码
        phone: '', //手机号
        teacherType: '', //教师类型
        username: '', // 用户名
        comment: ''
      },
      rules: {
        username: [{required: true, trigger: 'blur', validator: validateUsername}],
        password: [{required: true, trigger: 'blur', validator: validatePassword}],
        name: [{required: true, trigger: 'blur', validator: validateTeacherName}],
        teacherType: [{required: true, trigger: 'blur', validator: validateTeacherType}],
        phone: [{required: true, trigger: 'blur', validator: validatePhone}],
      },
      teacherList: []
    }
  },
  mounted() {
    let {type, id} = this.$route.query;
    this.type = type;
    this.text = type === 'add' ? '立即添加' : '保存';
    this.$route.meta.title = type === 'add' ? '新增教师' : '编辑教师';
    this.id = id;
    this.getTeacherType();
    this.switchData();
  },
  methods: {
    switchData() {
      switch (this.type) {
        case "add":
          break;
        case "edit":
          this.getEditData(this.id);
          break;
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
    getEditData(id) {
      getEditInfo(id)
      .then(res => {
        if (res.errorCode === 200) {
          this.form = res.data;
        }
      })
    },
    goBack() {
      this.$router.go(-1);
    },
    operationData() {
      let that = this;
      that.$refs['form'].validate(valid => {
        if (valid) {
          if (that.type === 'add') {
            that.addData(that.form)
          } else {
            that.updateData(that.form)
          }
        } else {
          return false;
        }
      })
    },
    addData(data) {
      addTeacher(data)
      .then(res => {
        if (res.errorCode === 200) {
          successTip('新增成功');
          this.goBack();
        }
      })
    },
    updateData(data) {
      updateTeacher(data)
      .then(res => {
        console.log(res);
        if (res.errorCode === 200) {
          successTip('修改成功')
          this.goBack();
        }
      })
    }
  }
}
</script>

<style scoped>
</style>