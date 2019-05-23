<template>
  <div id="app" v-wechat-title="$route.meta.title">
    <router-view v-if="show"></router-view>
  </div>
</template>
<script>
import {CheckedParams} from '@/mixins/checkedParams.mixin'
export default {
  name: 'app',
  mixins:[CheckedParams],
  data(){
    return {
    }
  },
  created () {
    
  }
}
</script>
<style type="text/css">
@import '~assets/css/reset.css';
@import '~assets/css/common.css';
</style>


