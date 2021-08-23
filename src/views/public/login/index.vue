<template>
  <div class="login-container">
    <!--教师管理员登录-->
    <div class="login-wrap" v-if="showLoginContainer">
      <div class="img-wrap animate__animated animate__backInLeft" v-if="showLoginImg">
        <img :src="loginImg" alt="img">
      </div>
      <div class="login-from animate__animated animate__backInRight">
        <div class="form-logo animate__animated animate__tada animate__delay-2s">
          <el-tooltip class="item" effect="dark" content="千职鹤" placement="top">
            <img :src="logo" alt="">
          </el-tooltip>
        </div>
        <div class="form-title">{{ defaultSettingsTitle }}</div>
        <el-tabs v-model="activeName" stretch>
          <el-tab-pane label="教师登录" name="teacher">
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
                    <img :src="captureImg" alt class="codeImg" @click="getCodeData"/>
                  </div>
                </el-col>
              </el-row>
              <div class="form-info">
                <el-tooltip content="勾选后可在7天内免登录进入系统" placement="top"class="item">
                  <el-checkbox v-model="loginForm.is7Ssh">7天免登录</el-checkbox>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="忘记密码" placement="top">
                  <el-link type="info" @click="showImg">忘记密码?</el-link>
                </el-tooltip>
              </div>
              <el-button
                  type="primary"
                  style="width: 100%; margin: 20px 0 30px 0;"
                  :loading="loading"
                  @click.native.prevent="handleLogin">登录
              </el-button>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="学生登录" name="student">
            <el-form
                status-icon
                ref="loginFormStudent"
                :model="studentLoginForm"
                :rules="loginRules"
                class="login-form"
                auto-complete="on"
                label-position="left"
            >
              <el-form-item prop="username">
                <el-input
                    ref="username"
                    v-model="studentLoginForm.username"
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
                    v-model="studentLoginForm.password"
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
                        v-model="studentLoginForm.code"
                        placeholder="请输入右边验证码"
                        name="code"
                        auto-complete="on"
                        @keyup.enter.native="handleStudentLogin"
                        prefix-icon="el-icon-chat-dot-square"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <div class="codeContainer">
                    <img :src="captureImg" alt class="codeImg" @click="getCodeData"/>
                  </div>
                </el-col>
              </el-row>
              <div class="form-info">
                <!--                <el-checkbox v-model="checked">7天免登录</el-checkbox>-->
                <el-tooltip class="item" effect="dark" content="忘记密码" placement="top">
                  <el-link type="info" @click="showImg">忘记密码?</el-link>
                </el-tooltip>
              </div>
              <el-button
                  type="primary"
                  style="width: 100%; margin: 20px 0 30px 0;"
                  :loading="loading"
                  @click.native.prevent="handleStudentLogin">登录
              </el-button>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!--学生信息认证-->
    <div class="info-wrap" v-else>
      <div class="info-img-wrap">
        <div class="img">
          <img :src="logo" alt="">
        </div>
        <div class="title">欢迎登陆{{ defaultSettingsTitle }}</div>
      </div>
      <div class="info-form-wrap">
        <div class="form-container">
          <div class="title">请完善个人资料</div>
          <el-form ref="infoForm" :label-width="labelWidth"
                   status-icon
                   :model="infoFrom" :rules="infoRules" label-position="right" style="width: 50%">
            <el-form-item prop="name" label='用户名'>
              <el-input style="width: 447px" ref="username" v-model="infoFrom.schoolUserName" placeholder="请输入姓名"
                        :clearable="true"
                        name="name"
                        disabled
              />
            </el-form-item>
            <el-form-item prop="gender" label="性别">
              <el-select v-model="infoFrom.gender" placeholder="请选择性别" style="width: 100%" clearable filterable>
                <el-option label="男" value="M"/>
                <el-option label="女" value="F"/>
              </el-select>
            </el-form-item>
            <el-form-item prop="phone" label='手机号'>
              <el-input
                  style="width: 447px"
                  ref="username"
                  v-model="infoFrom.phone"
                  placeholder="请输入手机号"
                  :clearable="true"
                  name="username"
              />
              <span class="tip">·请填写真实有效手机号，手机号可用于电脑端生涯管理系统及千职鹤App账号登录</span>
            </el-form-item>
            <el-form-item prop="grade" label="班级">
              <el-input v-model="infoFrom.gradeName" disabled></el-input>
              <span class="tip">注意：若姓名或班级信息错误请及时联系老师</span>
            </el-form-item>
            <el-button
                type="primary"
                style="width: 100%; margin: 20px 0 30px 0;"
                :disabled='isOK(infoFrom)'
                :loading="loadingConfirm"
                @click.native.prevent="studentLogin">确认登录
            </el-button>
          </el-form>
        </div>
      </div>
    </div>
    <div class="login-footer">
      <span class="animate__animated animate__backInUp">{{ copyRight }}</span>
      <span class="animate__animated animate__backInUp">{{ company }}</span>
    </div>

  </div>
</template>

<script>
import defaultSettings from '@/settings.js';
import {bindPhone, getCode, getStudentInfo} from "../../../api/common/login";
import {
  validateUsername,
  validatePassword,
  validateCode,
  validatePhone,
  validateClassType,
  validateGender
} from "../../../utils/validate";
import {isFormReady} from "../../../utils";
import {errorTip} from "../../../utils/tip";

/**
 * TODO:登录页面
 */
export default {
  name: 'Login',
  data() {
    return {
      backInfo: null,
      activeName: 'teacher',
      showLoginContainer: true, // 显示登录界面，控制显示学生登录时信息填写弹框切换
      labelWidth: '80px',
      showLoginImg: true,
      screenWidth: document.body.clientWidth, // 屏幕宽度
      loginForm: {
        username: '',
        password: '',
        code: '',
        uuid: '',
        is7Ssh: false
      },
      studentLoginForm: {
        username: '',
        password: '',
        code: '',
        uuid: ''
      },
      infoFrom: {
        schoolUserName: '',
        username: '',
        gender: '',
        phone: '',
        gradeName: ''
      },
      captureImg: '',
      loginRules: {
        username: [{required: true, trigger: 'blur', validator: validateUsername}],
        password: [{required: true, trigger: 'blur', validator: validatePassword}],
        code: [{required: true, trigger: 'blur', validator: validateCode}]
      },
      infoRules: {
        // name: [{required: true, trigger: 'blur', validator: validateUsername}],
        // gender: [{required: true, trigger: 'blur', validator: validateGender}],
        phone: [{required: true, trigger: 'blur', validator: validatePhone}],
        // grade: [{required: true, trigger: 'blur', validator: validateClassType}]
      },
      loading: false,
      loadingConfirm: false,
      passwordType: 'password',
      redirect: undefined,
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
    if (window.history && window.history.pushState) {
      // 向历史记录中插入了当前页
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.goBack, false);
    }
  },
  destroyed () {
    window.removeEventListener('popstate', this.goBack, false);
  },
  watch: {
    $route: {
      handler: function (route) {
        //重定向
        // this.redirect = route.query && route.query.redirect
      },
      immediate: true
    },
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.showLoginImg = this.screenWidth >= 1154;
        this.timer = true;
        let that = this;
        setTimeout(function () {
          that.timer = false;
        }, 0);
      }
    }
  },
  created() {
    if (this.screenWidth <= 1154) {
      this.showLoginImg = false;
    }
    this.loginForm.username = window.localStorage.getItem('account_' + defaultSettings.KEY) || '';
    this.loginForm.password = window.localStorage.getItem('password_' + defaultSettings.KEY) || '';
  },
  methods: {
    goBack () {
      // console.log("点击了浏览器的返回按钮");
      history.pushState(null, null, document.URL);
      console.log(document.URL);
    },
    showImg() {
      this.$notify.info({
        title: '忘记密码',
        message: '请联系学校管理员',
        duration: 2000
      });
    },
    // 判断学生是否输入完整
    isOK(data) {
      return isFormReady(data);
    },
    getCodeData() {
      getCode()
          .then(res => {
            this.captureImg = res.img;
            this.loginForm.uuid = res.uuid;
            this.studentLoginForm.uuid = res.uuid;
          }).catch(err => {
        console.log(err);
      })
    },
    // 教师管理员登录
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
            uuid: that.loginForm.uuid,
            is7Ssh: that.loginForm.is7Ssh
          }
          that.$store.dispatch('user/login', params).then((res) => {
            //获取权限
            that.$store.dispatch('user/getControl', {}).then(() => {
              that.$router.push({path: '/'})
            }).catch(() => {
              that.loading = false
            })
          }).catch(() => {
            that.loading = false
            that.getCodeData();
          })
        } else {
          //验证失败
          return false
        }
      })
    },
    // 学生登录
    handleStudentLogin() {
      let that = this;
      that.$refs['loginFormStudent'].validate(valid => {
        if (valid) {
          that.loading = true
          let params = {
            username: that.studentLoginForm.username,
            password: that.studentLoginForm.password,
            code: that.studentLoginForm.code,
            uuid: that.studentLoginForm.uuid,
            type: 'student'
          }
          that.$store.dispatch('user/login', params).then((res) => {
            const {user} = res;
            if (res.isBindingPhone) {
              getStudentInfo(params.username)
                  .then(res => {
                    if (res.errorCode === 200) {
                      that.backInfo = user;
                      that.infoFrom['username'] = res.data.schoolUserNameLogin;
                      that.infoFrom['schoolUserName'] = res.data.schoolUserName;
                      that.infoFrom['gender'] = res.data.gender;
                      that.infoFrom['gradeName'] = res.data.gradeName;
                      this.showLoginContainer = false;
                    } else {
                      this.loading = false;
                      errorTip(res.msg);
                    }
                  })
            } else {
              //获取权限
              console.log(user, '用户信息');
              // 诸葛埋点
              zhuge.track('WEB端用户埋点'); //事件名称不能超过20个字符
              console.log(zhuge);
              zhuge.identify(String(user._id),
                  {
                    name: user.schoolUserName,
                    gender: user.gender,
                    class_level: user.grade,
                    school: user.createBy,
                    phone: user.phone,
                  },
                  function () {
                    that.$store.dispatch('user/getControl', {}).then(() => {
                      that.$router.push({path: '/'})
                    }).catch(() => {
                      that.loading = false
                    })
                  }
              );
            }
          }).catch(() => {
            that.loading = false
            that.getCodeData();
          })
        } else {
          //验证失败
          return false
        }
      });
    },
    studentLogin() {
      let _this = this;
      _this.$refs['infoForm'].validate(valid => {
        if (valid) {
          _this.loadingConfirm = true;
          bindPhone({
            phone: _this.infoFrom.phone,
            username: _this.infoFrom.username,
            gender: _this.infoFrom.gender
          })
              .then(res => {
                if (res.errorCode === 200) {
                  window.localStorage.setItem(
                      "USERINFO_" + defaultSettings.KEY,
                      JSON.stringify(_this.backInfo)
                  );
                  console.log('用户信息', _this.backInfo);
                  // 诸葛埋点
                  zhuge.track('WEB端用户埋点'); //事件名称不能超过20个字符
                  zhuge.identify(String(_this.backInfo._id),
                      {
                        name: _this.backInfo.schoolUserName,
                        gender: _this.backInfo.gender,
                        class_level: _this.backInfo.grade,
                        school: _this.backInfo.createBy,
                        phone: _this.backInfo.phone
                      },
                      function () {
                        _this.$store.dispatch('user/getControl', {}).then(() => {
                          _this.$router.push({path: '/'})
                        }).catch(() => {
                          _this.loadingConfirm = false;
                        })
                      }
                  );
                } else {
                  _this.loadingConfirm = false;
                  errorTip(res.msg);
                }
              })
        } else {
          return false;
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
        margin: 5px 0;
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

  .info-wrap {
    @include flexContainer();
    flex-direction: column;
    width: 100%;
    height: 100%;

    .info-img-wrap {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 1056px;
      margin-bottom: 20px;

      .img {
        width: 60px;
        height: 48px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .title {
        font-size: 20px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
      }
    }

    .info-form-wrap {
      width: 1056px;
      height: 500px;
      background: #FFFFFF;
      border-radius: 12px;
      border: 1px solid #D9E0E6;

      .form-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 40px 0;

        .title {
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #2E415B;
          line-height: 22px;
          margin-bottom: 20px;
        }

        .tip {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #B8C3D6;
        }
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
