<script setup>
import LayoutNav from '@/views/Layout/components/LayoutNav/index.vue'
import LayoutHeader from '@/views/Layout/components/LayoutHeader/index.vue'
import LayoutFooter from '@/views/Layout/components/LayoutFooter/index.vue'
import LayoutFixed from '@/views/Layout/components/LayoutFixed/index.vue'
import {useCategoryStore} from '@/stores/category.js'
import { onMounted} from 'vue'
const category =useCategoryStore()
  onMounted(()=>{
    category.getlist()
  })
</script>

<template>
<LayoutFixed/>
<LayoutNav/>
<LayoutHeader/>
<RouterView/>
<LayoutFooter/>
</template>