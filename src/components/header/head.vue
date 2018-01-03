<template>
    <header id='head_top'>
      <div class="h-return">
        <i class="iconfont icon-tixing" @click = "gotoAddress({path: '/'})"></i>
      </div>
      <div class="h-qd">
        <i @click = "goSign()"></i>
      </div>
    </header>
</template>

<script>
    import $ from 'src/plugins/jquery.min.js'

    export default {
        methods: {
          gotoAddress(path){
            this.$router.push(path)
          },
          goSign(){
            $(".mask-warp-index").show();
          },
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

</style>
