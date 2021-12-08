<template>
  <div id="nav" class="container-fluid" style="padding:0px">
    <nav class="navbar fixed-top navbar-expand-lg navbar-light" style="background-color: #FFFFFF;height:60px;box-shadow:0px 15px 10px -20px black;">
      <div class="container position-relative">
        <img src="@/assets/img/logo.png" alt="" width="50">
        <!-- <svg t="1632313933358" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11638" width="50" height="50"><path d="M796.45 398.22v170.67H1024" fill="#B3DDFF" p-id="11639"></path><path d="M739.56 853.33H56.89V682.67h113.78v56.89h455.11V170.67H170.67v56.89H56.89V56.89h682.67v796.44z" fill="#1547FF" p-id="11640"></path><path d="M805.11 455.11l105.11 108.62v118.94H770.85V455.11h34.26m48.22-113.78H657.07v455.11H1024V517.69L853.33 341.33zM341.34 398.22H56.89a56.89 56.89 0 0 1 0-113.78h284.45a56.89 56.89 0 1 1 0 113.78zM403.91 625.78h-347a56.89 56.89 0 1 1 0-113.78h347a56.89 56.89 0 0 1 0 113.78z" fill="#1547FF" p-id="11641"></path><path d="M341.34 850.49m-113.78 0a113.78 113.78 0 1 0 227.56 0 113.78 113.78 0 1 0-227.56 0Z" fill="#B3DDFF" p-id="11642"></path><path d="M859.02 850.49m-113.78 0a113.78 113.78 0 1 0 227.56 0 113.78 113.78 0 1 0-227.56 0Z" fill="#B3DDFF" p-id="11643"></path></svg> -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav fs-4">
            <li class="nav-item">
              <router-link class="nav-link active" aria-current="page" to="/">首页</router-link>
            </li>
            <li class="nav-item dropdown">
              <a :class="{'disabled':isdisabled}" class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                预约
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <!-- <li><router-link class="nav-link" to="/tracking">事件追踪</router-link></li> -->
                <li><router-link class="nav-link" to="/situation">场地预约情况</router-link></li>
                <li><router-link class="nav-link" to="/apply">提交申请</router-link></li>
                <li><router-link class="nav-link" to="/management">申请管理</router-link></li>
              </ul>
            </li>
            <!-- <li class="nav-item">
              <router-link class="nav-link" to="/tmaa">预约</router-link>
            </li> -->
            <li class="nav-item">
              <router-link class="nav-link" to="/help">帮助</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">关于</router-link>
            </li>
          </ul>
          <div v-if="isshow" class="d-flex position-absolute top-50 end-0 translate-middle-y">
            <button type="button" class="btn btn-primary rounded-pill" @click="login">&nbsp;&nbsp;&nbsp;登录&nbsp;&nbsp;&nbsp;</button>
          </div>
          <div v-if="!isshow" class="d-flex position-absolute top-50 end-0 translate-middle-y">
            {{ name }}
            <a></a>
            <a href="#" @click="logout" class="link-danger">[退出登录]</a>
          </div>
        </div>
      </div>
    </nav>
  </div>
  <router-view/>
</template>
<script setup>
import { useRouter } from 'vue-router';
import Cookies from "js-cookie";
import { computed, onMounted,ref,watch } from 'vue-demi';
import { useStore } from 'vuex'
const Store = useStore()
const Router = useRouter()
const login = () =>{
  Router.push('/login')
}
const isshow = ref(false)
const isdisabled = ref(true)
// 判断token
const istoken = () =>{
  console.log(Cookies.get('token'));
  if (Cookies.get('token') == undefined)
  {
    isshow.value=true;
  }
  else
  {
    isshow.value=false;
    isdisabled.value = false;
    getname()
  }
};
// 监听vuex中token状态的变化
watch(
    () => Store.state.tokenstate,
    (val, old) => {
        istoken();
    }
);
onMounted(()=>{
  istoken();
  // console.log(Store.state.name);
});
const name = ref('')
// 计算用户的名字
const getname = ()=>{
  name.value= Cookies.get('name')
  name.value = '欢迎,'+name.value
};
const logout = () => {
  Cookies.remove('token');
  Cookies.remove('name');
  Cookies.remove('authority');
  Router.go(0);
}
</script>
<style lang="scss">

</style>
