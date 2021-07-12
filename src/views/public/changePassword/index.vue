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
          <el-form-item label="旧密码：">
            <el-input v-model="form.oldPassword" type="password" clearable show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码：" prop="password">
            <el-input v-model="form.password" type="password" clearable show-password></el-input>
            <span class="tip">密码必须有8-16位，包含大写、小写字母、数字</span>
          </el-form-item>
          <el-form-item label="再次确认密码：" prop="passwordRules">
            <el-input v-model="form.passwordRules" type="password" clearable show-password></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="editPassword">确认</el-button>
      </template>
    </div>
  </basic-container>
</template>

<script>
import {validateEditPassword} from "../../../utils/validate";
import {mapGetters} from 'vuex'

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
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      showInfo: false,
      form: {
        oldPassword: '',
        password: '',
        passwordRules: ''
      },
      formRules: {
        password: [{required: true, trigger: 'blur', validator: validateEditPassword}],
        passwordRules: [{required: true, trigger: 'blur', validator: validatePass2}]
      }
    }
  },
  mounted() {
    console.log(validateEditPassword('Aa1234'));
  },
  methods: {
    editPassword() {
      this.form['name'] = this.name;
      this.showInfo = true;
      setTimeout(() => {
        this.$store.dispatch('user/logout')
        this.$router.push(`/login`);
        location.reload();//刷新页面，重置vue-router
      },  3000)
      console.log(this.form);
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