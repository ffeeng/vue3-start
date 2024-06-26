<template>
  <div
    v-show="isOpen"
    class="plugin-container"
  >
    <h1>Hello Plugin</h1>
    <br>
    <HelloWebOffice />
    <button
      class="btn-primary btn-close"
      @click="close"
    >
      关闭
    </button>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import HelloWebOffice from '@/components/HelloWorld.vue'

const isOpen = ref(true)
const close = () => {
  isOpen.value = false
}
</script>

<style scoped lang="less">
.plugin-container {
  position: absolute;
  width: 400px;
  height: 200px;
  background: #e1e6ed;
  left: 50vw;
  top: 50vh;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  filter: drop-shadow(2px 2px 2px #ccc);
  padding: 20px;
  z-index: 99;

  .btn-close{
    margin-top: 26px;
  }
}

</style>
