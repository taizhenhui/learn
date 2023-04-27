<template>
  <div class="account-container">
    <SearchForm
      :data-source="searchDataSource"
      :form-data="formData"
      @search-click="searchClick"
      :label-width="80"
    />
    <div class="table-sty">
      <TableData
        :table-data="data.rows"
        :columns="columns"
        :single-select="true"
        :pagination="pagination"
        v-slot="{ row }"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        @on-select-single="handleSelectSingle"
      >
        <span>{{ row.id }}</span>
        <span> {{ row.name }}</span>
      </TableData>
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchForm from "@/components/SearchForm/index.vue";
import TableData from "@/components/TableData/index.vue";
import { Align, IDataSource, IFormData } from "@/types";
import { userList } from "@/api";
import { IUserListRes } from "@/api/types";
const searchDataSource = ref<Array<IDataSource>>([
  {
    type: "input",
    colSpan: 4,
    label: "用户名:",
    prop: "operator_name",
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
    prop: "account",
    maxlength: 32,
    place: "请输入姓名",
  },
]);
const formData: IFormData = reactive({
  pageNum: 1,
  pageSize: 10,
  operator_name: "",
  email: "",
  phone: "",
  account: "",
});
let data: IUserListRes = reactive({
  rows: [],
  total: 0,
  pageNum: 1,
  pageSize: 10,
});
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  rangeSize: [10, 20, 50, 100],
  background: true,
  layout: "prev, pager, next, total, jumper, sizes",
  total: 0,
});

const getUserList = async () => {
  const { rows, total} = await userList(formData);
  data.rows = rows;
  pagination.total = total;
};
getUserList();
const columns = [
  { label: "操作员姓名", property: "operator_name", align: Align.center },
  { label: "用户名", property: "account", align: Align.center },
  { label: "手机号", property: "phone", align: Align.center },
  { label: "邮箱", property: "email", align: Align.center },
  { label: "状态", property: "enabled", align: Align.center },
  { label: "注册时间", property: "create_time", align: Align.center },
  { label: "修改时间", property: "update_time", align: Align.center },
  { label: "创建人", property: "create_oper_username", align: Align.center },
  { label: "修改人", property: "update_oper_username", align: Align.center },
];

const searchClick = (value: IFormData) => {
  console.log("searchClick", value);
  const { operator_name, email, phone, account } = value;
  formData.operator_name = operator_name || "";
  formData.email = email || "";
  formData.phone = phone || "";
  formData.account = account || "";
  getUserList();
};
const handleSizeChange = (val: number) => {
  formData.pageSize = val;
  getUserList();
};
const handleCurrentChange = (val: number) => {
  formData.pageNum = val;
  getUserList();
};
const handleSelectSingle = (val: any ) => {
  console.log(val);
  
};
</script>

<style scoped lang="less">
.account-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  .table-sty {
    width: 100%;
    flex: 1;
    overflow: hidden;
  }
}
</style>
