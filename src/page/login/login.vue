<template>
  <div>
    <head-top :header="headerHtml"></head-top>
    <div class="main">
      <div class="login-warp">
        <form action="javascript:;">
          <label>
            <span>用户名</span><input type="text" placeholder="请输入用户名" class="l-phone">
          </label>
          <label>
            <span>密码</span><input type="password" placeholder="请输入密码" class="l-password">
          </label>
          <button class="login-btn"  @click = "login()">登录</button>
          <div class="go-reg">
            没有账号？<a  @click = "gohref({path: '/reg'})">立即注册</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import headTop from 'src/components/header/head-login'
  import $ from 'src/plugins/jquery.min.js'

  export default {
    data(){
      return{
        //账户信息
        headerHtml:'登录'
      }
    },
    components:{
      headTop,
    },
    methods:{
      gohref(path){
        this.$router.push(path)
      },
      login(){
        let that=this;
        let user=$(".l-phone").val();
        let password=$(".l-password").val();
        //判断输入次数
        if(user){
          if(password){
            $.post("http://palpitation.shop/api/todolist/login.php", { user: user, password: password,token:'f2abb3bd197166def142dc83dbe2b862' },
              function(data){
                if(data === 'ok'){
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
                  alert('用户名或密码错误')
                }
              });
          }else{
            alert('密码不能为空')
          }
        }else {
          alert('用户号不能为空')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  @import "../../style/swiper.min.css";
  //首页
  .main{
    bottom: 0;
  }
  .login-warp{
    margin-top: 1.2rem;width: 100%;padding: 0 .44rem;
    label{
      display: block;width: 100%;height: 1rem;
      position: relative;
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
    .login-btn{
      display: block;width:100%;height:1rem;background-color:#f5b76e;color: #fff;
      font-size: .3rem;text-align: center;line-height: 1rem;border-radius: 5px;
      margin-top: .82rem;
    }
    .fg-btn{
      display: block;width:100%;height:1rem;background-color:#f5b76e;color: #fff;
      font-size: .3rem;text-align: center;line-height: 1rem;border-radius: 5px;
      margin-top: .82rem;
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
