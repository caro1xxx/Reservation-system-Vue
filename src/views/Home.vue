<template>
<div id="tips" v-if="istip.state" class="fixed-top">
    {{istip.msg}}
    <svg @click="closetip" t="1632540240609" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2515" width="30" height="30"><path d="M512 1024C229.248 1024 0 794.752 0 512S229.248 0 512 0s512 229.248 512 512-229.248 512-512 512z m0-572.330667L300.629333 240.213333a42.538667 42.538667 0 0 0-60.16 0.213334 42.410667 42.410667 0 0 0-0.213333 60.16L451.669333 512 240.213333 723.370667a42.538667 42.538667 0 0 0 0.213334 60.16 42.410667 42.410667 0 0 0 60.16 0.213333L512 572.330667l211.370667 211.413333a42.538667 42.538667 0 0 0 60.16-0.213333 42.410667 42.410667 0 0 0 0.213333-60.16L572.330667 512l211.413333-211.370667a42.538667 42.538667 0 0 0-0.213333-60.16 42.410667 42.410667 0 0 0-60.16-0.213333L512 451.669333z" fill="#ffffff" p-id="2516"></path></svg>
</div>
  <div style="margin-top:60px">
    <div id="home">
      <div class="home_back text-light">
        <span id="title" class="fw-bold position-absolute top-0 start-0 translate-middle-y ">
          交通运输实验中心预约系统
        </span>
        <span id="content" class="position-absolute top-0 start-0 translate-middle-y ">
          “交融世界、通达古今”<br/>
          交通运输实验中心预约系统，帮助交通运输学院师生<br/>
          轻松管理、使用实验中心<br/>
          详细操作流程&nbsp;&nbsp;<span class="badge bg-primary" @click="help">点我</span>
        </span>
        <span @click="yuyue" id="login" class="position-absolute top-0 start-0 translate-middle-y rounded-pill d-flex justify-content-center">
          预约
        </span>
      </div>
    </div>
    <div class="container">
      <div id="bottom" class="d-flex justify-content-center">
        Copyright &copy; 北京交通大学交通运输学院 Version 1.0.0
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue-demi";
name:'Home'
import { get, post } from "@/http/api";
import Cookies from "js-cookie";
import { useRouter } from 'vue-router'
const Router = useRouter()
const istip = reactive({
  state:true,
  msg:'',
});
onMounted(()=>{
  if (Cookies.get('token') != undefined)
  {
    GetNot()
  }
  else
  {
    istip.state=false;
  }
})
// 获取消息
const GetNot = () =>{
    let data = {token:Cookies.get('token')};
    post('api/v1/GetNotice/',data).then((res)=>{
      // console.log(res.data.msg);
        if (res.data.code == 200)
        {
            istip.state=true;
            istip.msg = res.data.data;
        }
        else
        {
          istip.state=false;
        }
    })
};
// 关闭提示
const closetip = () =>{
    istip.state = false;
};
const help = ()=>{
  Router.push('/help')
};
const yuyue=()=>{
  if (Cookies.get('token') != undefined)
  {
    Router.push('/apply')
  }
  else
  {
    Router.push('/login')
  }
}
</script>

<style lang="scss" scoped>
#home{
  background-image: url('../assets/img/home.png');
  height:800px;
  position:relative;
  .home_back{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(65, 65, 65, 0.5);
    opacity: 0.9;
    #title{
      margin-top: 150px;
      margin-left:200px;
      font-size: 50px;
      text-shadow: 5px 5px 5px #000000;
    }
    #content{
      margin-top: 300px;
      margin-left:200px;
      font-size: 30px;
      text-shadow: 5px 5px 5px #000000;
    }
    #login{
      margin-top: 440px;
      margin-left:200px;
      font-size: 30px;
      width: 600px;
      height: 50px;
      background-color: #2477F6;
    }
  }
}
#bottom{
  margin-top: 20px;
  color: rgb(190, 190, 190);
  font-size:15px;
}
#tips{
    width: 100%;
    height:40px;
    background-color: #59a8e9;
    text-align: center;
    line-height: 40px;;
    color:rgb(0, 0, 0);
    font-size: 18px;
    margin-top:60px;
    svg{
        float: right;
        margin:5px 10px;
    }
}
</style>
