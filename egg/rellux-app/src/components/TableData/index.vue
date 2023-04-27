<template>
  <div class="index">
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      fit
      @row-click="singleElection"
      highlight-current-row
    >
      <el-table-column align="center" width="55" label="选择">
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

<style scoped lang="less"></style>
