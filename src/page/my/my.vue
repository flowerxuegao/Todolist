<template>
  <div>
    <div class="main main-bg">
      <div class="f-catgory">
        <div class="m-left"></div>
      </div>
      <div class="f-imgtx">
        <span class="m-l">{{motto_l}}</span>
        <div class="imgbox">
          <img src="../../images/3.png">
        </div>
        <span class="m-r">{{motto_r}}</span>
      </div>
      <ul class="f-info">
        <li><a href="javascript:;">发表数（{{info.appear}}）</a></li>
        <li><a href="javascript:;">收藏数（{{info.house}}）</a></li>
        <li><a href="javascript:;">可阅数（{{info.delnum}}）</a></li>
      </ul>
      <ul class="f-grid">
        <li>Losing</li>
        <li>大餐一顿<br>A&nbsp;big&nbsp;meal</li>
        <li>Losing</li>
        <li>饿一顿<br>Starve</li>
        <li class="grid_center" @click = "godraw()">抽奖<br>Start</li>
        <li>周末一日游<br>One-day&nbsp;Tour</li>
        <li>Losing</li>
        <li>两天不许买东西<br>Not Buy</li>
        <li>Losing</li>
      </ul>
      <a class="loginout"  @click = "loginout('/login')">退出登录</a>
    </div>
    <foot-guide is-flag3="true"></foot-guide>
  </div>
</template>

<script>
  import footGuide from 'src/components/footer/footGuide'
  import $ from 'src/plugins/jquery.min'

  export default {
    data(){
      return{
        isFlag:true,
        motto_l:'大鹏振翅举山岳',
        motto_r:'翔龙过影超九天',
        info:{
          appear:'',
          house:'0',
          delnum:localStorage.getItem('perusenum'),
        },
        drawflag:true,
      }
    },
    created () {
      let that=this;
      $.get("http://palpitation.shop/api/todolist/listnum.php",
        { cid:localStorage.getItem('cid'),token:'f2abb3bd197166def142dc83dbe2b862' },
        function(data){
          that.info.appear=eval ("(" + data + ")").length;
        });

    },
    components:{
      footGuide,
    },
    methods:{
      loginout(path){
        localStorage.clear();
        this.$router.push(path)
      },
      godraw(){
        let that=this;
        let listnum=[0,1,2,5,8,7,6,3];let m=0;
        let activenum=-1;let timenum=0;let t;
        if(that.drawflag){
          that.drawflag=false;
          t=setInterval(_ => {
            activenum++;
            if(activenum>7){
              activenum=0;
              timenum++;m++;
            }
            if(timenum>3){
              clearInterval(t);
              $.post("http://palpitation.shop/api/todolist/lottery.php",
                function(data) {
                  $(".f-grid li").removeClass("active").eq(listnum[data]).addClass("active");
                  that.drawflag=true;
                }
              )
            }else{
              $(".f-grid li").removeClass("active").eq(listnum[activenum]).addClass("active");
            }
          }, 50);
        }else{
          return false;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';

  .main{
    top: 0;
  }

  .f-catgory{
    width: 100%;height: .88rem;display: flex;justify-content: center;align-items: center;
    padding: 0 .24rem;background-color: #f5b76e;font-size: .3rem;color: #fff;
  }

  .f-imgtx{
    width: 100%;height: 3rem;padding:.5rem .24rem;background-color: #f5b76e;position: relative;
    .imgbox{
      width: 2rem;height: 2rem;margin: 0 auto;border-radius: 50%;overflow: hidden;
      border:2px solid #f8f8f8;
      img{
        display: block;width: 100%;height: 100%;
      }
    }
    span{
      display: block;padding: .2rem 0;height: auto;
      position: absolute;font-size: .2rem;color: #666;width: .2rem;font-weight: 600;
    }
    .m-l{
      left: 1rem;top: 0;bottom: 0;margin: auto;
    }
    .m-r{
      right: 1rem;top: 0;bottom: 0;margin: auto;
    }
  }

  .f-info{
    width: 100%;height: .88rem;background-color: #fff;display: flex;justify-content: space-between;align-items: center;margin-top: .12rem;
    li{
      width: 33.3rem;text-align: center;line-height: .88rem;font-size: .24rem;color: #2D93CA;
      border-right: 2px solid #f8f8f8;
    }
    li:last-child{
      border-right: none;
    }
  }

  .f-grid{
    width: 100%;display: flex;justify-content: space-between;align-items: center;
    flex-wrap: wrap;margin-top: .12rem;background-color: #fff;
    li{
      width: 33.3%;height: 2rem;display: flex;align-items: center;justify-content: center;
      font-size: .28rem;text-align: center;
      &:nth-child(1),&:nth-child(3),&:nth-child(7),&:nth-child(9){
        background-color: #f5b76e;color: #fff;
      }
    }
    .active{
      border: 2px solid #fd0034;
    }
    .grid_center{
      background-color: #000;color: #fff;
    }
  }

  .loginout{
    display: block;margin: .5rem auto 0;
    width: 80%;height: .88rem;line-height: .88rem;background-color: #f5b76e;font-size: .32rem;color: #fff;border-radius: 5px;text-align: center;
  }

</style>
