<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">
      count is {{ count }}
    </button>
    <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" @click="sayHello">
    {{ user.name }}
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from '@/store/user'

defineProps<{ msg: string }>()
const { user } = storeToRefs(useUserStore())
const { sayHello } = useUserStore()

const count = ref(0)
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
