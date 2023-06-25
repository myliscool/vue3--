import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import {useUserStore} from './user'
import {insertCartAPI,findNewCartListAPI,delCartAPI} from '@/apis/cart.js'

export const useCartStore = defineStore('cart', () => {
  const useUser = useUserStore()
  const isLogin = computed(()=>useUser.userInfo.token)
  const cartList = ref([])
  const updateNewList = async () => {
    const res = await findNewCartListAPI()
    cartList.value = res.result
  }
  const cartAdd = async (goods)=>{
    const {skuId,count} = goods
    if(isLogin.value){
     await insertCartAPI({skuId,count})
     updateNewList()
    }else{
      const item = cartList.value.find((item)=>goods.skuId === item.skuId)
      if(item){
        item.count += goods.count
      }else{
        cartList.value.push(goods)
      }
    }

  }

  const removeCart = async (id)=>{
    if(isLogin.value){
     await delCartAPI([id])
     updateNewList()
    }else{
      const inx = cartList.value.findIndex((item)=>item.skuId===id)
      cartList.value.splice(inx,1)
    }
  }

  const clearCart = ()=>{
    cartList.value = []
  }

  const allCount = computed(()=>cartList.value.reduce((a,c)=>a+c.count,0))
  const allPrice = computed(()=>cartList.value.reduce((a,c)=>a+c.count*c.price,0))

  const singleSelected = (i,selected)=>{
    const item = cartList.value.find((item)=>item.skuId===i.skuId)
    item.selected = selected
  }

  const isAll = computed(()=>cartList.value.every((item)=>item.selected))


  const AllCheck = (selected)=>{
    cartList.value.forEach((item)=>item.selected = selected)
  }

  const selectCount = computed(()=>cartList.value.filter((item)=>item.selected).reduce((a,c)=>a+c.count,0))
  const selectPrice = computed(()=>cartList.value.filter((item)=>item.selected).reduce((a,c)=>a+c.count*c.price,0))
  return { 
     cartList,
     allCount,
     allPrice,
     isAll,
     selectCount,
     selectPrice,
     updateNewList,
     clearCart,
     AllCheck,
     singleSelected,
     cartAdd,
     removeCart,
    }
},{
  persist: true,
})
