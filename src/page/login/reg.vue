<template>
  <div>
    <head-top :header="headerHtml"></head-top>
    <div class="main">
      <div class="login-warp">
        <form action="javascript:;">
          <label>
            <span>用户名</span><input type="tel" placeholder="请输入手机号码" maxlength="11" id="user">
          </label>
          <label>
            <span>密码</span><input type="password" placeholder="请输入6-20位密码" id="password">
          </label>
          <button type="submit" class="reg-btn"  @click = "reg()">注册</button>
          <div class="go-reg">
            已有账号？<a  @click = "gohref({path: '/login'})">立即登录</a>
          </div>
        </form>
      </div>
    </div>

    <protocol-mask></protocol-mask>
  </div>
</template>

<script>
  import headTop from 'src/components/header/head-login'
  import protocolMask from 'src/components/maskalert/protocol-mask'
  import $ from 'src/plugins/jquery.min.js'
  import verifyCode from 'src/plugins/gVerify.js'

  export default {
    data(){
      return{
        //账户信息
        addinfo:'',
        res:"",
        //输入次数
        num:0,
        headerHtml:'注册'
      }
    },
    mounted(){
      $(".close-mask").click(function () {
        $(".mask-warp").hide();
      })
    },
    components:{
      headTop,protocolMask
    },
    methods:{
      //跳转
      gohref(path){
        this.$router.push(path)
      },
      //查看用户协议
      protocol(){
        $(".mask-warp").show();
      },
      reg(){
        let that=this;
        let user=$("#user").val();
        let password=$("#password").val();

        $.post("http://palpitation.shop/api/todolist/reg.php", { user: user, password:password,token:'f2abb3bd197166def142dc83dbe2b862' },
          function(data){
            if(data === '1'){
              //初始化完成-->跳转首页
              $.get("http://palpitation.shop/api/todolist/select.php", {user: user,token: 'f2abb3bd197166def142dc83dbe2b862'}, function(a){
                  localStorage.setItem('cid',a);
                  localStorage.setItem('loginstatus','已登录');
                  localStorage.setItem('loginname',user);
                  //跳转首页
                  that.$router.push({ path:'/home'});
                }
              );
            }else{
              alert('用户名已存在')
            }
          })
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  //首页
  .main{
    bottom: 0;
  }
  .login-warp{
    margin-top: 1.2rem;width: 100%;padding: 0 .44rem;
    label{
      display: block;width: 100%;height: 1rem;
      position: relative;margin-bottom: .2rem;
      span{
        font-size: .28rem;color: #282828;padding-top: 1px;
        display: block;width: 1.2rem;height: 1rem;line-height: 1rem;
        position: absolute;left:0;top:0;
      }
      #v_container{
        position: absolute;right: 0;top: 0;
        width:2.3rem;height: 1rem;cursor: pointer;
      }
      ::-webkit-input-placeholder {color: #bbb;}
      :-moz-placeholder {color: #bbb;}
      ::-moz-placeholder {color: #bbb;}
      :-ms-input-placeholder {color: #bbb;}
      input{
        display: block;width: 100%;height:1rem;padding-left: 1.2rem;padding-right: .6rem;
        border-bottom: 1px solid #ddd;color: #282828;font-size: .28rem;border-radius: 0;
      }
      i{
        width: .6rem;text-align: center;color: #bbb;
        position: absolute;right: 0;top: 0;bottom: 0;margin: auto;line-height: 1rem;
      }
    }
    .reg-btn{
      display: block;width:100%;height:1rem;background-color:#f5b76e;color: #fff;
      font-size: .3rem;text-align: center;line-height: 1rem;border-radius: 5px;
    }
    .go-reg{
      width: 100%;height:1rem;text-align: center;line-height: 1rem;
      font-size: .3rem;
      a{
        color:#f5b76e;
      }
    }
  }
</style>
