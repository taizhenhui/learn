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
      <div class="right"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
    // width: calc(100% - 280px);
    // height: calc(100% - 228px);
    background: #ffffff;
    border-radius: 20px;
    overflow: hidden;
    .self-center();
    .flex-common();
    .left, .right{
     width: 50%;
    }
    .left{
      height: 100%;
      background-color: #E2E0F6;
      .flex-common(center, center);
      .login-draw{  
        width: 70%;
        margin: auto;
        img{
          width: 100%;
        }
      }
    }
  }
}
</style>
