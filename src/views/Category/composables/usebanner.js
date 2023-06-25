import {getBannerAPI} from '@/apis/home.js'
import {ref,onMounted} from 'vue'

export function getbanner(){
  const bannerList = ref([])
const getBannerList = async ()=>{
 const res = await getBannerAPI()
 bannerList.value = res.result
} 
onMounted(()=>{
  getBannerList()
})

return{
  bannerList
}
}