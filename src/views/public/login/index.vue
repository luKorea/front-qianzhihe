<template>
  <div class="login-container">
    <div class="login-wrap">
      <div class="img-wrap" v-if="showLoginImg">
        <img :src="loginImg" alt="img">
      </div>
      <div class="login-from">
        <div class="form-logo">
          <img :src="logo" alt="">
        </div>
        <div class="form-title">{{ defaultSettingsTitle }}</div>
        <div class="form-tip">账号密码登录</div>
        <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            auto-complete="on"
            label-position="left"
        >
          <el-form-item prop="username">
            <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="请输入用户名"
                :clearable="true"
                name="username"
                auto-complete="on"
                prefix-icon="el-icon-user"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
                ref="password"
                v-model="loginForm.password"
                type="password"
                :clearable="true"
                :show-password="true"
                placeholder="请输入登录密码"
                name="password"
                auto-complete="on"
                prefix-icon="el-icon-key"
            />
          </el-form-item>
          <el-row>
            <el-col :span="15">
              <el-form-item prop="code">
                <el-input
                    ref="code"
                    v-model="loginForm.code"
                    placeholder="请输入右边验证码"
                    name="code"
                    auto-complete="on"
                    @keyup.enter.native="handleLogin"
                    prefix-icon="el-icon-chat-dot-square"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <div class="codeContainer">
                <img :src="captureImg" alt class="codeImg" @click="getCodeData" />
              </div>
            </el-col>
          </el-row>
          <div class="form-info">
            <el-checkbox v-model="checked">7天免登录</el-checkbox>
            <el-link type="info">忘记密码?</el-link>
          </div>
          <el-button
              type="primary"
              style="width: 100%; margin: 20px 0 30px 0;"
              @click.native.prevent="handleLogin">登录</el-button>
        </el-form>

      </div>
    </div>
    <div class="login-footer">
      <span>{{ copyRight }}</span>
      <span>{{ company }}</span>
    </div>
  </div>
</template>

<script>
import defaultSettings from '@/settings.js';
import {getCode} from "../../../api/common/login";
import {validateUsername, validatePassword, validateCode} from "../../../utils/validate";

/**
 * TODO:登录页面
 */
export default {
  name: 'Login',
  data() {
    return {
      showLoginImg: true,
      screenWidth: document.body.clientWidth, // 屏幕宽度
      loginForm: {
        username: '北京大学',
        password: '123456',
        code: '',
        uuid: ''
      },
      captureImg: '',
      loginRules: {
        username: [{required: true, trigger: 'blur', validator: validateUsername}],
        password: [{required: true, trigger: 'blur', validator: validatePassword}],
        code: [{required: true, trigger: 'blur', validator: validateCode}]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      checked: false,
      defaultSettingsTitle: defaultSettings.title,
      logo: require('../../../assets/logo.png'),
      loginImg: require('../../../assets/login/login-bg.png'),
      copyRight: defaultSettings.copyRight || '',
      company: defaultSettings.company || ''
    }
  },
  mounted() {
    const that = this;
    that.getCodeData();
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        //重定向
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    },
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.showLoginImg = this.screenWidth >= 1154;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          that.timer = false;
        }, 0);
      }
    }
  },
  created() {
    console.log(this.screenWidth);
    if (this.screenWidth <= 1154) {
      this.showLoginImg = false;
    }
    this.loginForm.username = window.localStorage.getItem('account_' + defaultSettings.KEY) || '';
    this.loginForm.password = window.localStorage.getItem('password_' + defaultSettings.KEY) || '';
  },
  methods: {
    getCodeData() {
      getCode()
          .then(res => {
            console.log(res);
            this.captureImg = res.img;
            this.loginForm.uuid = res.uuid;
            console.log(this.loginForm.uuid, this.captureImg);
          }).catch(err => {
        console.log(err);
      })
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      let that = this;
      //验证
      that.$refs.loginForm.validate(valid => {
        if (valid) {
          //验证成功，调用接口
          that.loading = true
          let params = {
            username: that.loginForm.username,
            password: that.loginForm.password,
            code: that.loginForm.code,
            uuid: that.loginForm.uuid
          }
          that.$store.dispatch('user/login', params).then(() => {
            //获取权限
            that.$store.dispatch('user/getControl', {}).then(() => {
              that.$router.push({ path: '/' })
            }).catch(() => {
              that.loading = false
            })
          }).catch(() => {
          })
        } else {
          //验证失败
          console.log('错误提交')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin flexContainer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  background: linear-gradient(135deg, #4D51F9 0%, #0A6FE8 100%);

  .login-wrap {
    @include flexContainer();
    width: 100%;
    height: 100%;

    .img-wrap {
      margin-right: 100px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .login-from {
      padding: 10px 20px;
      width: 350px;
      height: 435px;
      //text-align: center;
      background: #FFFFFF;
      border: 1px solid #D9E0E6;

      .form-logo {
        @include flexContainer();
      }
      .form-title {
        height: 28px;
        font-size: 20px;
        text-align: center;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #4D97FF;
        line-height: 28px;
      }

      .form-tip {
        margin-top: 20px;
        margin-bottom: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #2E415B;
        line-height: 20px;
      }
      .form-info {
        display: flex;
        justify-content: space-between;
      }
    }
  }

  .login-footer {
    @include flexContainer();
    flex-direction: column;
    //height: 46px;
    text-align: center;
    //width: 100%;
    margin: 0 10px;
    font-size: 13px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 30px;
  }
}
</style>
