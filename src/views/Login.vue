<template>
  <div style="margin-top:60px">
    <div id="login">
      <div class="login_back text-light">
        <div class="alert alert-light d-flex justify-content-center" role="alert">
          首次登录时请使用网上办公系统的用户名密码,欢迎您提出宝贵的意见或建议,反馈邮箱:liju@jtys.bjtu.edu.cn
        </div>
        <div id="body" class="rounded-3 position-absolute top-50 end-0 translate-middle-y">
          <div id="title" class="col-md-12">
            <svg @click="back" t="1632311502730" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6017" width="30" height="30"><path d="M512 0a512 512 0 1 0 512 512 512 512 0 0 0-512-512z m0 896a384 384 0 1 1 384-384 384 384 0 0 1-384 384z" fill="#383B48" p-id="6018"></path><path d="M616.96 272.64a58.24 58.24 0 0 0-81.92 0l-198.4 198.4a58.88 58.88 0 0 0 0 81.92l198.4 198.4a58.24 58.24 0 1 0 81.92-81.92L459.52 512l157.44-157.44a58.24 58.24 0 0 0 0-81.92z" fill="#383B48" p-id="6019"></path></svg>
            登录
          </div>
          <div class="col-md-12">
            <label class="form-label">用户名</label>
            <input v-model="userform.username" placeholder="用户名" type="text" class="form-control" aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text">&nbsp;</div>
          </div>
          <div class="col-md-12">
            <label class="form-label">密码</label>
            <input v-model="userform.password" placeholder="密码" type="password" class="form-control" aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text">请牢记密码，暂不支持找回密码</div>
          </div>
          <div class="col-md-12">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">&nbsp;记住账号</label>
          </div>
          <div v-if="tips.isshow" class="col-md-12 rounded" style="background-color:rgb(139, 208, 253);padding:10px">
            提示:{{ tips.msg }}
          </div>
          <div class="col-md-12">
            &nbsp;
          </div>
          <div class="col-md-12">
            <button @click="Login" type="button" class="btn btn-primary" style="width:100%;">登录</button>
          </div>
        </div>
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
name: "Login";
import { useRouter } from 'vue-router'
import { get, post } from "@/http/api";
import { reactive,ref } from 'vue-demi';
import Cookies from "js-cookie";
import { useStore } from 'vuex'
const Store = useStore()
const Router = useRouter()
const back = () =>{
  Router.back()
};
const userform = reactive({
  username:'',
  password:'',
})
const tips = reactive({
  isshow:false,
  msg:'',
})
// 登录
const Login = () =>{
    let data = {username:userform.username,password:userform.password}
    post('api/v1/Login/',data).then((res)=>{
       tips.isshow = false;
      if (res.data.code==200)
      {
        Cookies.set("token",res.data.token, { expires: 7 });
        Cookies.set("name",res.data.name, { expires: 7 });
        Cookies.set("authority",res.data.authority, { expires: 7 });
        Store.commit('ChangeTokenState',res.data.token);
        Router.push('/situation');
      }
      else if (res.data.code==403)
      {
        tips.isshow = true;
        tips.msg = res.data.msg;
      }
    })
}
</script>

<style lang="scss" scoped>
#login{
  background-image: url('../assets/img/home.png');
  height:800px;
  position:relative;
  .login_back{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(65, 65, 65, 0.5);
    opacity: 0.9;
  }
}
#bottom{
  margin-top: 20px;
  color: rgb(190, 190, 190);
  font-size:15px;
}
#body{
  width: 400px;
  background-color: white;
  margin-right: 200px;
  padding: 10px;
  color: black;
  #title{
    height: 50px;
    // line-height:50px;
    font-size:25px;
  }
}
</style>
