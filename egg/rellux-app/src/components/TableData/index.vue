<template>
  <div class="table-data">
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      stripe
      border
      fit
      @row-click="singleElection"
      :highlight-current-row="isHighlightCurrentRow"
    >
      <el-table-column align="center" width="55" label="选择" v-if="singleSelect">
        <template #default="scope">
          <el-radio v-model="templateSelection" :label="scope.row.id">&nbsp;</el-radio>
        </template>
      </el-table-column>
      <el-table-column
        v-for="item in columns"
        :property="item.property"
        :label="item.label"
        :align="item.align || 'center'"
      />
      <el-table-column fixed="right" label="操作" width="120" v-if="isOperate">
        <template #default="scope">
          <slot :row="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-model:current-page="pagination.currentPage"
      v-model:page-size="pagination.pageSize"
      :page-sizes="pagination.rangeSize"
      :background="pagination.background"
      :layout="pagination.layout"
      :total="pagination.total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script setup lang="ts">
import { Align } from "@/types";

interface ITableData {
  [propsName: string]: any;
}

interface Columns {
  label: string; // 表头
  property: string; // 表格字段
  align?: Align; // 文本对齐方式 center left right
  [propsName: string]: any;
}
interface IPagination {
  currentPage?: number; // 当前页数
  pageSize?: number; // 每页显示条目个数
  rangeSize?: number[]; // 每页显示个数选择器的选项设置
  background?: boolean; // 是否为分页按钮添加背景色
  layout?: string; // 组件布局，子组件名用逗号分隔
  total?: number; // 总条目数
}

interface IProps {
  tableData: ITableData[]; // 表格数据
  singleSelect?: boolean; // 是否需要单选
  isOperate?: boolean; // 是否需要操作
  isHighlightCurrentRow?: boolean; // 是否当前行是否高亮
  columns: Columns[]; // 表格的字段和名称
  pagination: IPagination; // 分页数据
}

const props = withDefaults(defineProps<IProps>(), {
  singleSelect: false,
  isOperate: false,
  isHighlightCurrentRow: false,
});
const emit = defineEmits(["current-change", "size-change", "on-select-single"]);

const templateSelection = ref("");
const checkList = ref<Array<ITableData>>([]);
const singleElection = (row: ITableData) => {
  if (row.id === templateSelection.value) {
    templateSelection.value = "";
    checkList.value = [];
    return;
  }
  templateSelection.value = row.id;
  checkList.value = props.tableData.filter((item) => item.id === row.id);
  emit("on-select-single", row);
};

const handleSizeChange = (val: number) => {
  emit("size-change", val);
  templateSelection.value = "";
};
const handleCurrentChange = (val: number) => {
  emit("current-change", val);
  templateSelection.value = "";
};
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
.table-data {
  width: 100%;
  height: 96%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
// 单选样式修改
.table-data {
  :deep(.el-radio__label) {
    padding-left: 0;
  }
  :deep(.el-radio__inner) {
    border-radius: 2px;
  }
  :deep(.el-radio__input.is-checked .el-radio__inner::after) {
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
    background-color: rgba(0, 0, 0, 0);
    border-radius: 0;
  }
}
// 分页样式修改
.table-data {
  :deep(.el-pagination) {
    margin-top: 30px;
  }
}
// 表格样式修改
.table-data {
  :deep(.el-table--border th.el-table__cell) {
    background-color: darken(@subtopic, 10%);
    color: #333333;
    height: 45px;
  }
  :deep(.el-table__cell) {
    padding: 0;
    height: 45px;
  }
  :deep(.el-table__body tr.current-row > td.el-table__cell) {
    background-color: @subtopic;
  }
}
</style>
