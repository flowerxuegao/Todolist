<template>
  	<div>
      <header></header>
      <div class="main main-bg">
        <div class="f-banner">
          <img src="../../images/timg.jpg">
        </div>
        <div class="f-catgory" v-if="loginstatus===1">
          <div class="m-left">欢迎你的到来</div>
          <div class="m-right">{{username}}</div>
        </div>
        <div class="f-catgory-no" v-if="loginstatus===0">
          <div class="m-con">好伤心，你还没有<a @click="gohref('/login')">登录</a></div>
        </div>
        <div class="f-warp">
          <div class="m-list"  v-for="list in lists">
            <div class="m-time"><span>{{list.time}}</span><span>{{list.name}}</span></div>
            <div class="m-content">{{list.con}}</div>
            <div class="m-bot"><span>{{list.type}}</span><a @click="edit(list.id,list.cid)"  :id="list.id">编辑</a></div>
            <div class="m-mask">
              <div class="btn-del" @click="del(list.id)">删除</div>
              <div class="btn-cancel"  @click="cancel(list.id)">取消</div>
            </div>
          </div>
        </div>
      </div>
      <foot-guide is-flag1="true"></foot-guide>
    </div>
</template>

<script>
  import footGuide from 'src/components/footer/footGuide'
  import $ from 'src/plugins/jquery.min.js'

export default {
  data(){
    return{
      isFlag:true,
      username:localStorage.getItem('loginname'),
      lists:'',
      loginstatus:'',
    }
  },
  created () {
    let that=this;
    $.get("http://palpitation.shop/api/todolist/list.php",
      { cid:localStorage.getItem('cid'),token:'f2abb3bd197166def142dc83dbe2b862' },
      function(data){
        that.lists=eval ("(" + data + ")");
        localStorage.setItem('perusenum',that.lists.length);
      });
    if(localStorage.getItem('loginstatus')){
      that.loginstatus=1;
    }else{
      that.loginstatus=0;
    }
  },
  mounted(){
    let that=this;
  },
  components:{
    footGuide,
  },
  methods:{
    gohref(path){
      this.$router.push(path);
    },
    edit(id,cid){
      if(cid !== localStorage.getItem('cid')){
        alert('权限不够,只可以操作自己发表的内容');
        return false;
      }
      $('.m-mask').hide();
      $("#"+id).parent().parent().children('.m-mask').fadeIn(500);
    },
    del(id){
      $.post("http://palpitation.shop/api/todolist/del.php",
        { id:id,token:'f2abb3bd197166def142dc83dbe2b862' },
        function(data){
          if(data === '1'){
            let peruse=localStorage.getItem('perusenum');
            peruse--;
            localStorage.setItem('perusenum',peruse);
            $('.m-mask').hide();
            location.reload();
          }else{
            alert('网络错误，请重试')
          }
        });
    },
    cancel(id){
      $('.m-mask').hide();
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  @import "../../style/swiper.min.css";

  .main{
    top: 0;
  }

  .f-catgory{
    width: 100%;height: .88rem;display: flex;justify-content: space-between;align-items: center;
    padding: 0 .24rem;background-color: #f5b76e;
    .m-left{
      font-size: .3rem;color: #fff;
    }
    .m-right{
      font-size: .3rem;color: #fff;
    }
  }
  .f-catgory-no{
    width: 100%;height: .88rem;display: flex;justify-content: center;align-items: center;
    padding: 0 .24rem;background-color: #eaeaea;
    .m-con{
      font-size: .3rem;color: #666;
    }
    a{
      color: #f5b76e;text-decoration: underline;margin-left: .15rem;
    }
  }

  .f-banner{
    width: 100%;height: 3.6rem;
    img{
      display: block;width: 100%;height: 100%;
    }
  }
  .f-warp{
    width: 100%;
    .m-list{
      width: 100%;margin-top: .12rem;background-color: #fff;
      padding:.3rem .24rem;position: relative;
    }
    .m-time{
      font-size: .24rem;display: flex;justify-content: space-between;align-items: center;
      height: .5rem;border-bottom: 1px solid #ddd;margin-bottom: .15rem;
      span:nth-child(1){
        color: #666;
      }
      span:nth-child(2){
        color: #f5b76e;border-left: 1px solid #f5b76e;padding-left: .15rem;
      }
    }
    .m-bot{
      font-size: .24rem;display: flex;justify-content: space-between;align-items: center;
      border-top: 1px solid #ddd;margin-bottom: .15rem;margin-top: .2rem;padding-top: .2rem;
      span{
        color: #f5b76e;
      }
      a{
        padding: .05rem .1rem;border-radius: 3px;color: #fff;background-color: #f5b76e;
      }
    }
    .m-content{
      font-size: .32rem;color: #666;line-height: 1.4;
    }
    .m-mask{
      position: absolute;right: 0;top: 0;bottom: 0;margin: auto;width: 1.5rem;
      background-color: #fff;display: none;border: 2px solid #f5b76e;border-right: 0;
      div{
        height: 50%;width: 100%;display: flex;justify-content: center;align-items: center;
        font-size: .24rem;cursor: pointer;
      }
      .btn-del{
        color:#f5b76e;border-bottom: 2px solid #eaeaea;
      }
      .btn-cancel{
        color: #999;
      }
    }
  }

</style>
