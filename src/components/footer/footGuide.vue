<template>
      <footer  id='footGuide'>
        <ul class="clear">
          <li  v-bind:class="{ 'active' : isFlag1}" @click = "gohref({path: '/home'})">
              <div class="b-icon b-icon1"></div>
              <div class="b-wen">备忘录</div>
          </li>
          <li v-bind:class="{ 'active' : isFlag2}" @click = "gohref({path: '/write'})">
              <div class="b-icon b-icon2"></div>
              <div class="b-wen">写入</div>
          </li>
          <li v-bind:class="{ 'active' : isFlag3}" @click = "gohref({path: '/my'})">
              <div class="b-icon b-icon3"></div>
              <div class="b-wen">资料</div>
          </li>
        </ul>
      </footer>
</template>

<script>
    export default {
    	data(){
            return{

            }
        },
        props: ['isFlag1','isFlag2','isFlag3','isFlag4'],
        methods: {
          gohref(path){
            if(localStorage.getItem('loginstatus')){
              this.$router.push(path)
            }else{
              this.$router.push('/login')
            }
          }
        },

    }

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  footer{
    width: 100%;height: 1rem;background-color: #fff;border-top: 1px solid #f2f2f2;
    position: fixed;bottom: -1px;left: 0;z-index: 999;
    ul{
      width: 100%;height: 100%;
      li{
        width: 33.3%;height: 100%;float: left;
        .b-icon{
          width: .42rem;height: .42rem;margin: .1rem auto .05rem;
          background-repeat: no-repeat;background-position: center;background-size: contain;
        }
        .b-wen{
          width: 100%;font-size: .24rem;color: #989898;text-align: center;
        }
      }
      li:nth-child(1) .b-icon{
        background-image: url(../../images/icon_position.png);
      }
      li:nth-child(2) .b-icon{
        background-image: url(../../images/icon_zhushou.png);
      }
      li:nth-child(3) .b-icon{
        background-image: url(../../images/icon_wode.png);
      }
      .active{
        .b-icon1{
          background-image: url(../../images/ico_position.png) !important;
        }
        .b-icon2{
          background-image: url(../../images/ico_zhushou.png) !important;
        }
        .b-icon3{
          background-image: url(../../images/ico_wode.png) !important;
        }
        .b-wen{
          color: #FF9933;
        }
      }
    }
  }
</style>
