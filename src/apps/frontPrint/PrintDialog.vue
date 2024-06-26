<template>
  <div
    v-if="modelValue"
    class="so_modal"
  >
    <div class="mask" />
    <div
      class="content"
    >
      <div class="header">
        <div class="title">
          打印设置
        </div>
        <i
          class="close-icon"
          @click="close"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke-width="1.5"
          >
            <g
              id="group-0"
              stroke="#757575"
              fill="#757575"
            >
              <path
                d="M3 13L13 3M3 3L13 13"
                stroke-linecap="round"
                stroke-linejoin="miter"
                fill="none"
                vector-effect="non-scaling-stroke"
              />
            </g>
          </svg>
        </i>
      </div>
      <div class="sub-title">
        打印范围
      </div>

      <div>

      </div>
      <div>

      </div>
      <div class="row3">
        <div class="kd-input-wrap">
          <input
            type="text"
            class="input"
            placeholder="例如：1-3，5，7-9"
            :value="inputValue"
          >
        </div>
      </div>
      <div
        class="input-error"
        :class="{show: !inputValid}"
      >
        指定页输入范围值不正确
      </div>
      <div style="display: flex;justify-content: end;margin-top: 26px;">
        <button
          class="btn-common"
          @click="close"
        >
          取消
        </button>
        <button
          class="btn-primary"
          style="margin-left: 16px;"
          @click="print"
        >
          下一步
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'


defineProps<{
  label: string
  value: string
  modelValue: boolean

}>()
const emit = defineEmits(['update:modelValue', 'print'])

const range = ref('全部')
const inputValue = ref('')
const inputValid = ref(true)
const close = () => {
  emit('update:modelValue', false)
  range.value='全部'
  inputValue.value=''
  inputValid.value=true
}
const checkInput = () => {
  if (range.value !== '指定页') return;
  const exp = /^(\d+-\d+|\d+)(,\d+-\d+|,\d+)*$/
  if (inputValue.value.match(exp)) {
    inputValid.value = true
  } else {
    inputValid.value = false
  }
}
const print = () => {
  checkInput()
  if (!inputValid.value) return;
  emit('update:modelValue', false)
  // 完善格式校验
  if (range.value === '指定页') {
    emit('print', inputValue.value)
  } else {
    emit('print', range.value)
  }
}
</script>

<style scoped lang="less">
div, input {
  box-sizing: border-box;
}

.so_modal {
  .mask {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: .5;
    position: fixed;
    z-index: 1000;
  }

  font-family: BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, PingFang SC, Microsoft Yahei, Hiragino Sans GB, sans-serif, apple color emoji, Noto Color Emoji, segoe ui emoji, segoe ui symbol;
}

.content {
  position: absolute;
  width: 480px;
  background: white;
  left: 50vw;
  top: 50vh;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  //filter: drop-shadow(2px 2px 2px #ccc);
  padding: 24px;
  z-index: 1001;

  .header {
    display: flex;
    justify-content: space-between;
    //padding:0 24px 20px;
    .title {
      font-size: 16px;
      line-height: 24px;
      font-weight: 600;
      color: rgba(13, 13, 13, 0.9);
    }

    .close-icon {
      padding: 3px;
    }
  }

  .sub-title {
    margin-top: 20px;
    font-size: 14px;
    line-height: 22px;
    color: rgba(13, 13, 13, 0.9);
    padding: 3px 0;
    margin-bottom: 8px;
    font-weight: 600;
  }


  .btn-close {
    margin-top: 26px;
  }
}

.row3 {
  display: flex;
  align-items: center;
}

.kd-input-wrap {
  position: relative;
  top: 5px;
  left: 10px;
  border-radius: 6px;
  padding: 0 12px;
  border: 1px solid rgba(13, 13, 13, 0.48);
  height: 32px;
  box-sizing: border-box;

  &.disabled {
    background: rgba(238, 238, 238, 0.3);
  }


  width: 226px;

  .input {
    padding: 4px 0;
    height: 30px;
    box-sizing: border-box;
    border: none;
    width: 100%;
    outline: none;

    &:disabled {
      color: #767c85;
      //background: #eff1f3;
    }
  }
}

.input-error {
  margin-top: 4px;
  font-size: 12px;
  line-height: 20px;
  color: #bb2726;
  color: rgba(187, 39, 38, 1);
  visibility: hidden;
  margin-left: 77px;

  &.show {
    visibility: initial;
  }
}

.btn-common {
  width: 72px;
  height: 32px;
}

</style>
