<template>
  <div class="table-data">
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      fit
      @row-click="singleElection"
      highlight-current-row
    >
      <el-table-column align="center" width="85" label="选择">
        <template #default="scope">
          <!-- 可以手动的修改label的值，从而控制选择哪一项 -->
          <el-radio v-model="templateSelection" :label="scope.row.id">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column label="Date" align="center">
        <template #default="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column property="name" label="Name" align="center" />
      <el-table-column property="address" label="Address" show-overflow-tooltip />
    </el-table>
  </div>
</template>

<script setup lang="ts">
interface User {
  id: string;
  date: string;
  name: string;
  address: string;
}
const templateSelection = ref("");
const tableData: User[] = [
  {
    id: "0001",
    date: "2016-05-02",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1518 弄",
  },
  {
    id: "0002",
    date: "2016-05-04",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1517 弄",
  },
  {
    id: "0003",
    date: "2016-05-01",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1519 弄",
  },
  {
    id: "0004",
    date: "2016-05-03",
    name: "王小虎",
    address: "上海市普陀区金沙江路 1516 弄",
  },
];
const checkList = ref<Array<User>>([]);
const singleElection = (row: User) => {
  console.log("val", row);
  templateSelection.value = row.id;
  checkList.value = tableData.filter((item) => item.id === row.id);
  console.log(`该行的编号为${row.id}`, checkList.value);
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
.table-data {
  :deep(.el-radio__label) {
    padding-left: 0;
  }
  :deep(.el-radio__inner) {
    border-radius: 2px;
  }
  :deep(.el-radio__input.is-checked .el-radio__inner::after){
    transform: rotate(45deg) scaleY(1);
  }
  :deep(.el-radio__inner::after) {
    border: none;
    box-sizing: content-box;
    content: "";
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 4px;
    position: absolute;
    top: 1px;
    transform: rotate(45deg) scaleY(0);
    width: 3px;
    transition: transform 0.15s ease-in 50ms;
    transform-origin: center;
    background-color: rgba(0,0,0,0);
    border-radius:0;
  }
}
</style>
