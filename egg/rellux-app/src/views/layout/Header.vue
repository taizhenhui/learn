<template>
  <div class="Header">
    <h1 class="title">商户权益管理平台</h1>
    <div class="right">
      <div class="user-info">
        <Icon type="user" />
        <span>欢迎您，admin</span>
      </div>
      <div class="user-operate">
        <Icon type="edit" />
        <span>修改密码</span>
      </div>
      <div class="user-operate" @click="handleLogout">
        <Icon type="out" />
        <span>退出</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon/index.vue";
import { useUserStore } from "@/store";
const userStore = useUserStore();
const router = useRouter();
const handleLogout = async () => {
  await userStore.logout();
  await ElMessage({
    message: "退出成功",
    type: "success",
  });
  await router.push("/login");
};
</script>

<style scoped lang="less">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
@height: 60px;
.Header {
  width: 100%;
  height: @height;
  background: #515151;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    // line-height: @height;
    font-weight: 500;
    font-size: 24px;
    color: #ffffff;
  }
  .right {
    display: flex;
    justify-content: flex-end;
    .user-info,
    .user-operate {
      margin-left: 42px;
      font-size: 14px;
      color: #ffffff;
      font-weight: 300;
      display: flex;

      span {
        margin-left: 5px;
      }
    }
    .user-operate {
      cursor: pointer;
    }
  }
}
</style>
