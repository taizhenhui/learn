<template>
  <div class="index">
    <SearchForm
      :dataSource="searchDataSource"
      :formData="formData"
      @searchClick="searchClick"
      :labelWidth="80"
    />
  </div>
</template>

<script setup lang="ts">
import SearchForm from "@/components/SearchForm/index.vue";
import { IDataSource, IFormData } from "@/types";

const searchDataSource = ref<Array<IDataSource>>([
  {
    type: "input",
    colSpan: 4,
    label: "用户名:",
    prop: "username",
    maxlength: 32,
    place: "请输入用户名",
  },
  {
    type: "input",
    colSpan: 4,
    label: "邮箱:",
    prop: "email",
    maxlength: 32,
    place: "请输入邮箱",
  },
  {
    type: "input",
    colSpan: 4,
    label: "手机号:",
    prop: "phone",
    maxlength: 11,
    place: "请输入手机号",
  },
  {
    type: "input",
    colSpan: 4,
    label: "姓名:",
    prop: "name",
    maxlength: 32,
    place: "请输入姓名",
  },
]);
const formData: IFormData = reactive({
  username: "阿萨德",
  email: "",
  phone: "",
  name: "",
});
const searchClick = (value: IFormData) => {
  console.log("searchClick", value);
};

</script>

<style scoped lang="less"></style>
