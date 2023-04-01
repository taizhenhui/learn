<template>
  <form
    id="data-form-container"
    ref="formRef"
    class="data-form-container"
    @submit.prevent="handleSubmit"
  >
    <div class="form-item">
      <div class="input-area">
        <input
          type="text"
          maxlength="10"
          placeholder="用户昵称"
          v-model="formData.nickname"
        />
        <span class="tip">{{ formData.nickname.length }}/10</span>
      </div>
      <div class="error">{{ error.nickname }}</div>
    </div>

    <div class="form-item">
      <div class="text-area">
        <textarea
          maxlength="300"
          placeholder="输入内容"
          v-model="formData.content"
        ></textarea>
        <span class="tip">{{ formData.content.length }}/300</span>
      </div>
      <div class="error">{{ error.content }}</div>
    </div>

    <div class="form-item">
      <div class="button-area">
        <button :disabled="isSubmitingRef">
          {{ isSubmitingRef ? '提交中...' : '提交' }}
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { showMessage } from '@/utils'
import { ErrorType, FormDataType } from '@/types';

const emit = defineEmits(['submit'])
let isSubmitingRef = ref<boolean>(false)

const formRef = ref<any>(null)

const formData: FormDataType = reactive({
  nickname: '',
  content: '',
})

const error: ErrorType = reactive({
  nickname: '',
  content: '',
})



const handleSubmit = () => {
  error.nickname = formData.nickname ? '' : '请填写昵称'
  error.content = formData.content ? '' : '请填写内容'
  if (error.nickname || error.content) return
  isSubmitingRef.value = true // 正在提交，防止重复点击
  emit('submit', formData, (successMsg: string) => {
    showMessage({
      content: successMsg,
      type: 'success',
      duration: 1500,
      container: formRef.value,
      callback: () => {
        isSubmitingRef.value = false
        formData.nickname = ''
        formData.content = ''
      },
    })
  }) // 让父组件处理事件
}
</script>

<style scoped lang="less">
@import '~@/styles/var.less';

.data-form-container {
  margin-bottom: 20px;
  overflow: hidden;
}

.form-item {
  margin-bottom: 8px;
}

.input-area {
  width: 50%;
  position: relative;
}

.text-area {
  position: relative;
}

.tip {
  position: absolute;
  right: 5px;
  bottom: 5px;
  color: #b4b8bc;
  font-size: 12px;
}

input,
textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  border: 1px dashed @gray;
  outline: none;
  color: @words;
  font-size: 14px;
  border-radius: 4px;

  &:focus {
    border-color: @primary;
  }
}

input {
  padding: 0 15px;
  height: 40px;
}

textarea {
  resize: none;
  padding: 8px 15px;
  height: 120px;
}

.error {
  margin-top: 6px;
  color: @danger;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}

button {
  position: relative;
  cursor: pointer;
  border: none;
  outline: none;
  width: 100px;
  height: 34px;
  color: #fff;
  border-radius: 4px;
  background: @primary;

  &:hover {
    background: darken(@primary, 10%);
  }

  &:disabled {
    background: lighten(@primary, 20%);
    cursor: not-allowed;
  }
}
</style>
