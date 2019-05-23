<template>
  <div id="app" v-wechat-title="$route.meta.title">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
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


