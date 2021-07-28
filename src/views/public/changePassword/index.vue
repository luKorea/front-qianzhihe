<template>
  <basic-container>
    <div class="password-container">
      <template v-if="showInfo">
        <div class="success-wrap">
          <i class="el-icon-circle-check green"></i>
          <span>您已成功修改密码，现将在三秒内跳转到登录页面</span>
        </div>
      </template>
      <template v-else>
        <el-form ref="form" status-icon :model="form" label-width="120px" :rules="formRules">
          <el-form-item label="用户名：">
            <el-input v-model="name" disabled></el-input>
          </el-form-item>
          <el-form-item label="旧密码：" prop="oldPassword" required>
            <el-input v-model="form.oldPassword" type="password" clearable show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码：" prop="newPassword" required>
            <el-input v-model="form.newPassword" type="password" clearable show-password></el-input>
            <span class="tip">密码必须有8-16位，包含大写、小写字母、数字</span>
          </el-form-item>
          <el-form-item label="再次确认密码：" prop="affirmNewPassword" required>
            <el-input v-model="form.affirmNewPassword" type="password" clearable show-password></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary"
                   :disabled="isOK(form)"
                   :loading="loading"
                   @click="editPassword">确认</el-button>
      </template>
    </div>
  </basic-container>
</template>

<script>
import {validateEditPassword} from "../../../utils/validate";
import {mapGetters} from 'vuex'
import {changePassword} from "../../../api/common/login";
import {errorTip} from "../../../utils/tip";
import {isFormReady} from "../../../utils";

export default {
  name: "index",
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('再次确认密码不能为空'));
      } else if (value != this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      showInfo: false,
      form: {
        affirmNewPassword: "", //确认密码
        newPassword: "", //新密码
        oldPassword: "" //旧密码
      },
      formRules: {
        oldPassword: [
          {
            required: true, trigger: 'blur', validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入密码'));
              } else {
                callback();
              }
            }
          }
        ],
        newPassword: [{required: true, trigger: 'blur', validator: validateEditPassword}],
        affirmNewPassword: [{required: true, trigger: 'blur', validator: validatePass2}]
      }
    }
  },
  mounted() {

  },
  methods: {
    // 判断学生是否输入完整
    isOK(data) {
      return isFormReady(data);
    },
    editPassword() {
      console.log(this.form);
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true;
          changePassword(this.form)
              .then(res => {
                if (res.errorCode === 200) {
                  this.showInfo = true;
                  this.loading = false;
                  setTimeout(() => {
                    this.$store.dispatch('user/logout')
                    this.$router.push(`/login`);
                    location.reload();//刷新页面，重置vue-router
                  },  3000)
                } else {
                  this.loading = false;
                  errorTip(res.msg)
                }
              })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.password-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
  .el-form {
    width: 800px;
  }

  .el-input {
    width: 100%;
  }

  .el-button {
    width: 400px;
  }

  .tip {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #B8C3D6;
  }
}
.success-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .green {
    font-size: 60px;
    color: #52C41A;
    margin-bottom: 40px;
  }
  span {
    height: 22px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #475B75;
    line-height: 22px;
  }
}
</style>