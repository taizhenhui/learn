<template>
  <div class="login">
    <div class="login-bg">
      <img src="@/assets/login/login-bg.png" alt="" />
    </div>
    <div class="content">
      <div class="left">
        <div class="login-draw">
          <img src="@/assets/login/login-draw.png" alt="" />
        </div>
      </div>
      <div class="right">
        <el-form>
          <h1 class="title">欢迎登录</h1>
          <div class="input-sty">
            <el-input v-model="account" placeholder="请输入用户名" />
            <el-input
              v-model="password"
              type="password"
              placeholder="请输入您的密码"
              show-password
            />
            <div class="code-box">
              <el-input style="flex:1" v-model="code" placeholder="请输入验证码" />
              <div class="captcha-box" v-html="captchaSvg" @click="getCaptchaFun"></div>
            </div>
          </div>
          <button class="login-btn">登录</button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCaptcha } from "@/api";

const account = ref<string>();
const password = ref<string>();
const code = ref<string>();
const captchaSvg = ref<string>();

async function getCaptchaFun() {
  const { captcha } = await getCaptcha();
  captchaSvg.value = captcha;
}
getCaptchaFun();

</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
.login {
  .self-fill();
  height: 100vh;
  background-color: #7b89f0;
  .login-bg {
    // .self-fill();
    width: 100%;
    z-index: 0;
    img {
      width: 100%;
    }
  }
  .content {
    width: 80%;
    height: 70%;
    background: #ffffff;
    border-radius: 20px;
    overflow: hidden;
    .self-center();
    .flex-common();
    .left,
    .right {
      width: 50%;
    }
    .left {
      height: 100%;
      background-color: #e2e0f6;
      .flex-common(center, center);
      .login-draw {
        width: 70%;
        margin: auto;
        img {
          width: 100%;
        }
      }
    }
    .right {
      // .flex-common(center, center);
      // flex-direction: column;

      padding: 0 12%;
      .title {
        color: @words;
        font-size: 24px;
        font-weight: bold;
        width: 100%;
        margin-bottom: 30px;
      }
      .input-sty {
        :deep(.el-input) {
          margin-bottom: 20px;
          height: 38px;
          line-height: 38px;
        }
        :deep(.el-input__wrapper.is-focus) {
          box-shadow: 0 0 0 1px @theme inset;
        }
      }
      .code-box {
        // width: 150px;
        width: 100%;
        .flex-common(flex-start);
        .captcha-box {
          width: 100px;
          height: 38px;
          margin-left: 10px;
          border: 1px solid #dcdfe6;
          border-radius: 4px;
          overflow: hidden;
        }
      }
      .login-btn {
        width: 100%;
        height: 38px;
        border: none;
        line-height: 38px;
        text-align: center;
        border-radius: 30px;
        background-color: @theme;
        color: #fff;
      }
    }
  }
}
</style>
