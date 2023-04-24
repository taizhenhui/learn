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
        <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef">
          <h1 class="title">欢迎登录</h1>
          <div class="input-sty">
            <el-form-item prop="account">
              <el-input
                v-model="ruleForm.account"
                placeholder="请输入用户名"
                maxlength="32"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="ruleForm.password"
                type="password"
                placeholder="请输入您的密码"
                show-password
                maxlength="32"
              />
            </el-form-item>
            <div class="code-box">
              <el-form-item prop="code">
                <el-input
                  style="width: 100%"
                  v-model="ruleForm.code"
                  placeholder="请输入验证码"
                  maxlength="4"
                />
              </el-form-item>
              <div class="captcha-box" v-html="captchaSvg" @click="getCaptchaFun"></div>
            </div>
          </div>
        </el-form>
        <button class="login-btn" @click="() => handleLogin(ruleFormRef)">登录</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCaptcha, login } from "@/api";
import { FormInstance, FormRules } from "element-plus/lib/components/index";

const captchaSvg = ref<string>();
const ruleForm = reactive({
  account: "",
  password: "",
  code: "",
});
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  account: [{ required: true, message: "账号不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
  code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
});

async function getCaptchaFun() {
  const { captcha } = await getCaptcha();
  captchaSvg.value = captcha;
}
getCaptchaFun();

async function handleLogin(formEl: FormInstance | undefined) {
  if (!formEl) return;
  await formEl.validate(async (valid: any) => {
    if (valid) {
      getCaptchaFun()
      const data = await login(ruleForm);
      console.log(data);
    }
  });
}
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
      padding: 0 12%;
      .title {
        color: @words;
        font-size: 24px;
        font-weight: bold;
        width: 100%;
        margin-bottom: 10px;
      }
      .input-sty {
        :deep(.el-input) {
          margin-top: 20px;
          height: 38px;
          line-height: 38px;
        }
        :deep(.el-input__wrapper.is-focus) {
          box-shadow: 0 0 0 1px @theme inset;
        }
        .el-form-item {
          margin-bottom: 0;
          flex: 1;
        }
      }
      .code-box {
        // width: 150px;
        // width: 100%;
        .flex-common(flex-end);
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
        margin-top: 20px;
      }
    }
  }
}
</style>
