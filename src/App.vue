<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Aa from './components/Aa.vue'
import {ref} from "vue";


let a=ref('hello1')
</script>



<template>
  <div>
    <a
      href="https://vitejs.dev"
      target="_blank"
    > vite logo
    </a> <a
      href="https://vuejs.org/"
      target="_blank"
    >
      vue logo1212
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <Aa msg="Vite + Vue22" />
  <div>{{ a }}</div>
</template>



<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
