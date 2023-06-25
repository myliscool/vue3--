// 管理用户数据相关
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import {useCartStore} from './cart'
import { mergeCartAPI } from '@/apis/cart'

export const useUserStore = defineStore('user', () => {

  const cartStore = useCartStore()
  // 1. 定义管理用户数据的state
  const userInfo = ref({})
  // 2. 定义获取接口数据的action函数
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
    await mergeCartAPI(cartStore.cartList.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
      cartStore.updateNewList()
  }

  const clearInfo =()=> {
    userInfo.value = {}
    cartStore.clearCart()
  }
  // 3. 以对象的格式把state和action return
  return {
    getUserInfo,
    userInfo,
    clearInfo
  }
}, {
  persist: true,
})