<template>
  <div>
    <h1 class="aa">
      Home
    </h1>
    <router-link to="/about">
      Go About
    </router-link>
    <HelloWorld msg="hello world" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import { http } from '@/service/request'

onMounted(async () => {
  const aa = await http.get('/about')
  console.log(aa)
})
</script>

<style lang="scss" scoped>
h1{
  font-size: 16px;
}
.aa{
  color: red;
}
</style>
