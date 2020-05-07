<template>
  <div class="login w-100 h-100">
    <div class="d-flex d-column ai-center login_select" v-show="!ifshow_phone_login">
      <div class="icon_wrapper">
        <span class="iconfont icon-tubiaozhizuomoban"></span>
      </div>
      <button class="mt-6 text-red font-w" @click="PhoneLogin">手机号登陆</button>
      <button class="mt-2 text-white">立即体验</button>
    </div>
    <div class="phone_login px-2 h-100" v-show="ifshow_phone_login">
      <div class="top">
        <span class="iconfont icon-arrow-lift fs-xxxl"></span>
        <span class="font-w ml-2">手机号登陆</span>
      </div>
      <div class="content">
        <p >没有注册手机号登录后将自动创建帐号</p>
        <div class="input_wrapper">
<!--          <div class="select_country">-->
<!--            <span>+ 86</span>-->
<!--          </div>-->
          <div>
            <label for="phonenumber"></label><input type="text" placeholder="请输入手机号" id="phonenumber" v-model="username">
          </div>
          <div class="mt-4">
            <label for="password"></label><input type="password" placeholder="请输入密码" id="password" v-model="password">
          </div>
        </div>
        <button class="mt-6 w-100 fs-sm" @click="Login">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      ifshow_phone_login: true,
      username: '',
      password: ''
    }
  },
  methods: {
    PhoneLogin () {
      this.ifshow_phone_login = true
    },
    async Login () {
      console.log(this.username, this.password)
      await this.$http.get(`/login/cellphone?phone=${this.username}&password=${this.password}`).then((res) => {
        console.log(res)
        if (res.status === 200) {
          this.$router.push('/find')
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '@scss/_variable.scss';
@import '@scss/mixin.scss';
.login {
  background: #e92b21;
  .login_select {
    .icon_wrapper {
      width: pxtorem(100);
      height: pxtorem(100);
      border-radius: 50%;
      background: #f00;
      text-align: center;
      margin: pxtorem(100) 0;
      span {
        line-height: pxtorem(100);
        color: #fff;
        font-size: pxtorem(60);
        font-weight: bold;
      }
    }
    button {
      width: pxtorem(250);
      border-radius: pxtorem(20);
      padding: pxtorem(10) 0;
      &:last-child {
        background: #e92b21;
        border: 1px solid rgb(241, 190, 190);
      }
    }
  }
  .phone_login {
    background: #fff;
    overflow: hidden;
    .top {
      margin-top: pxtorem(20);
      display: flex;
      align-items: center;
    }
    .content {
      p {
        margin: pxtorem(50) 0;
        color: #acaca9;
        font-size: pxtorem(15);
      }
      .input_wrapper {
        /*border-bottom: 1px solid #a0a0a0;*/
        position: relative;
        div.select_country {
          position: absolute;
          left: 0;
          top: pxtorem(14);
        }
        input {
          width: 100%;
          padding: pxtorem(10) pxtorem(10) pxtorem(10) pxtorem(20);
          box-sizing: border-box;
          font-size: pxtorem(16);
          border: 1px solid #d9d7d7;
          border-radius: pxtorem(5);
        }
      }
      button {
        background: #f00;
        color: #fff;
        padding: pxtorem(10) 0;
        border-radius: pxtorem(16);
        font-weight: bold;
      }
    }
  }
}
</style>
