<template>
  <div id="app">
    <router-view v-if="show"></router-view>
  </div>
</template>
<script>
import {indexChecked} from '@/mixins/indexChecked.mixins'
export default {
  name: 'app',
  mixins:[indexChecked],
  data(){
    return {
    }
  },
}
</script>
<style type="text/css">

</style>
