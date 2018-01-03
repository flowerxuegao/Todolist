<template>
  <div>
    <div class="main">
      <div class="f-catgory">
        <div class="m-left">快速记录</div>
        <div class="m-right"></div>
      </div>
      <div class="login-warp">
        <form action="javascript:;">
          <label>
            <span>心情</span><input type="text" placeholder="请输入心情" id="name">
          </label>
          <label>
            <span>内容</span>
            <textarea cols="30" rows="10" id="con"></textarea>
          </label>
          <label>
            <span>类型</span><input type="text" placeholder="请输入类型" id="type">
          </label>
          <label>
            <span>时间</span><input type="text" placeholder="请选择时间" id="time" @click="nofocus()">
          </label>
          <div class="protocol">
            <input type="checkbox" id="qx">所有人可看
          </div>
          <button type="submit" class="reg-btn"  @click = "reg()">写入</button>
        </form>
      </div>
    </div>
    <foot-guide is-flag2="true"></foot-guide>
  </div>
</template>

<script>
  import footGuide from 'src/components/footer/footGuide'
  import $ from 'src/plugins/jquery.min'
  import 'src/plugins/lCalendar'

  export default {
    data(){
      return{
        isFlag:true,
      }
    },
    created () {
      let that=this;
    },
    mounted(){
      let that=this;
      var calendar = new LCalendar();
      calendar.init({
        'trigger': '#time',
        'type': 'date',
        'minDate': (new Date().getFullYear()-3) + '-' + 1 + '-' + 1, //最小日期
        'maxDate': (new Date().getFullYear()+3) + '-' + 12 + '-' + 31 //最大日期
      });
    },
    components:{
      footGuide,
    },
    methods:{
      nofocus(){
        $("#time").blur();
      },
      reg(){
        let msg;let that=this;
        let name=$("#name").val();
        let con=$("#con").val();
        let type=$("#type").val();
        let time=$("#time").val();
        let qx;
        let cid=localStorage.getItem('cid');
        if($("#qx").is(':checked')){
          qx=1;
        }else{
          qx=0;
        }
        if(name==='' || con==='' || type==='' || time===''){
          alert('没添完整');
          return false;
        }
        $.post("http://palpitation.shop/api/todolist/write.php", { name:name,con:con,type:type,time:time,qx:qx,cid:cid,token:'f2abb3bd197166def142dc83dbe2b862' },
          function(data){
            if(data === '1'){
              let peruse=localStorage.getItem('perusenum');
              peruse++;
              localStorage.setItem('perusenum',peruse);
              msg=confirm("添加成功,是否前往备忘录");
              if(msg){
                that.$router.push('/home');
              }else{
                $("form").reset();
              }
            }else{
              alert('网络错误');
            }
          }
        )
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/mixin';
  @import "../../style/lCalendar.css";

  .main{
    top: 0;
  }

  .f-catgory{
    width: 100%;height: .88rem;display: flex;justify-content: center;align-items: center;
    padding: 0 .24rem;background-color: #f5b76e;font-size: .3rem;color: #fff;
  }

  .login-warp{
    width: 100%;padding: 1rem .44rem 0;
    label{
      display: block;width: 100%;height: auto;
      position: relative;padding-left: 1.2rem;margin-bottom: .2rem;
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
      :-ms-input-placeholder {color: #bbb;}
      input{
        display: block;width: 100%;height:.8rem;padding-right: .6rem;padding-left: .2rem;
        border: 1px solid #ddd;color: #282828;font-size: .28rem;border-radius: 0;
      }
      textarea{
        display: block;width: 100%;height:3rem;
        color: #282828;font-size: .28rem;border-radius: 0;
        border: 1px solid #ddd;padding: .2rem;
      }
    }
    .reg-btn{
      display: block;width:100%;height:1rem;background-color:#f93;color: #fff;margin-top: 1rem;
      font-size: .3rem;text-align: center;line-height: 1rem;border-radius: 5px;
    }
  }
  .protocol {
    margin-top: .12rem;width: 100%;height: .6rem;position: relative;
    font-size: .26rem;color: #666;text-align: center;line-height: .6rem;
    display: flex;justify-content: center;align-items: center;
  }
  .protocol input {
    display: block;
    width: .3rem;height: .3rem;margin-right: .12rem;
    position: relative;background-image: url(../../images/noselect.png);background-position: center;background-repeat: no-repeat;background-size: contain;
    -webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;
  }
  .protocol input:checked {
    background-image: url(../../images/select.png);
  }
</style>
