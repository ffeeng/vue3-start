import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = reactive({
    name: 'John Doe',
    age: 30,
    email: '11@qq.com',
  })

  const sayHello = () => {
    console.log(`Hello, ${user.name}`)
  }

  return { user, sayHello }
})
