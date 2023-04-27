<template>
  <div class="search-form">
    <el-form
      ref="ruleFormRef"
      class="demo-form-inline"
      :inline="true"
      :model="formInfo"
      :label-width="labelWidth"
      @submit.prevent
    >
      <el-row class="search-wrap">
        <el-col v-for="item in dataSource" :key="item.prop" :span="item.colSpan">
          <el-form-item :label="item.label" :prop="item.prop">
            <el-input
              v-if="item.type === 'input'"
              v-model.trim="formInfo[item.prop]"
              :maxlength="item.maxlength"
              :disabled="item.disabled"
              :placeholder="item.place || '请输入'"
            />
            <el-select
              v-if="item.type === 'select'"
              v-model="formInfo[item.prop]"
              clearable
              :filterable="item.isfilter"
              :placeholder="item.place || '请选择'"
            >
              <el-option
                v-for="op in item.options"
                :key="op.code"
                :label="op.name"
                :value="op.code"
              >
              </el-option>
            </el-select>

            <el-date-picker
              v-if="item.type === 'date'"
              v-model="formInfo[item.prop]"
              type="daterange"
              range-separator="至"
              start-placeholder="请选择开始日期"
              end-placeholder="请选择结束日期"
              :format="item.format || 'YYYY-MM-DD'"
              :value-format="item.format || 'YYYY-MM-DD'"
            />
          </el-form-item>
        </el-col>
        <slot> </slot>
        <el-form-item class="btns">
          <div :style="{ marginLeft: labelWidth + 'px' }">
            <button @click="search" class="searchBox_button_style search-btn">
              查询
            </button>
            <button
              @click="() => reset(ruleFormRef)"
              class="searchBox_button_style reset-btn"
            >
              重置
            </button>
          </div>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { IDataSource, IFormData } from "@/types";
import { FormInstance } from "element-plus/lib/components/index";

interface Iprops {
  dataSource: Array<IDataSource>;
  formData: IFormData;
  labelWidth: string | number;
}

let formInfo: IFormData = reactive({});
const ruleFormRef = ref<FormInstance>();
const props = withDefaults(defineProps<Iprops>(), {
  labelWidth: 0,
});
const emit = defineEmits(["searchClick"]);

onMounted(() => (formInfo = Object.assign(formInfo, props.formData)));

const search = () => emit("searchClick", formInfo);

const reset = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  search();
};
// {
//     type: "input",
//     colSpan: 4,
//     label: "姓名:",
//     prop: "name",
//     maxlength: 32,
//     place: "请输入姓名",
//   },
//   {
//     type: "date",
//     colSpan: 8,
//     label: "变更时间:",
//     prop: "time",
//     format: "YYYY-MM-DD",
//     place: "请选择时间",
//   },
//   {
//     type: "select",
//     colSpan: 4,
//     isfilter: true,
//     label: "状态:",
//     prop: "status",
//     place: "请选择状态",
//     options: [
//       { code: 0, name: "禁用" },
//       { code: 1, name: "启用" },
//     ],
//   },
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
.demo-form-inline {
  :deep(.el-col) {
    flex: 0 0 auto;
    width: 100%;
  }
  :deep(.el-form-item) {
    margin-bottom: 15px;
    width: 100%;
  }
  :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px @theme inset;
  }
  :deep(.el-select .el-input.is-focus .el-input__wrapper) {
    box-shadow: 0 0 0 1px @theme inset !important;
  }
  :deep(.selected) {
    color: @theme!important;
  }
  @height: 32px;
  .searchBox_button_style {
    border: none;
    padding: 0 25px;
    height: @height;
    line-height: @height;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
  }
  .search-btn {
    background-color: @theme;
    color: #fff;
    &:hover {
      background-color: darken(@theme, 4%);
    }
  }
  .reset-btn {
    color: #999;
    border: 1px solid #999;
    background-color: #fff;
    margin-left: 14px;
  }
  .btns {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
