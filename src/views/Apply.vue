<template>
<div id="tips" v-if="istip.state" class="fixed-top">
    {{istip.msg}}
    <svg @click="closetip" t="1632540240609" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2515" width="30" height="30"><path d="M512 1024C229.248 1024 0 794.752 0 512S229.248 0 512 0s512 229.248 512 512-229.248 512-512 512z m0-572.330667L300.629333 240.213333a42.538667 42.538667 0 0 0-60.16 0.213334 42.410667 42.410667 0 0 0-0.213333 60.16L451.669333 512 240.213333 723.370667a42.538667 42.538667 0 0 0 0.213334 60.16 42.410667 42.410667 0 0 0 60.16 0.213333L512 572.330667l211.370667 211.413333a42.538667 42.538667 0 0 0 60.16-0.213333 42.410667 42.410667 0 0 0 0.213333-60.16L572.330667 512l211.413333-211.370667a42.538667 42.538667 0 0 0-0.213333-60.16 42.410667 42.410667 0 0 0-60.16-0.213333L512 451.669333z" fill="#ffffff" p-id="2516"></path></svg>
</div>
    <div class="container-fluid" style="background-color: #F6F6F6;padding:20px;margin-top:60px">
        <div class="container">
            <div id="apply" class="row">
                <div class="col-md-12">
                    <div class="row d-flex justify-content-center">
                        <div class="col-md-7 rounded" id="management">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="row">
                                        <div class="col-md-12 d-flex justify-content-center">
                                            <span style="width: 20px;height:20px;background:#DBEAF8">
                                            </span>
                                            <span style="line-height:20px;">&nbsp;等待审核</span>&nbsp;&nbsp;&nbsp;
                                            <span style="width: 20px;height:20px;background:#219c55">
                                            </span>
                                            <span style="line-height:20px;">&nbsp;审核通过</span>&nbsp;&nbsp;&nbsp;
                                            <span style="width: 20px;height:20px;background:#f5a99f">
                                            </span>
                                            <span style="line-height:20px;">&nbsp;审核失败</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="row" style="padding:10px">
                                        <div class="col-md-2 d-flex justify-content-center">
                                            编号
                                        </div>
                                        <div class="col-md-2 d-flex justify-content-center">
                                            借用人
                                        </div>
                                        <div class="col-md-2 d-flex justify-content-center">
                                            场地
                                        </div>
                                        <div class="col-md-2 d-flex justify-content-center">
                                            开始时间
                                        </div>
                                        <div class="col-md-2 d-flex justify-content-center">
                                            结束时间
                                        </div>
                                        <div class="col-md-2 d-flex justify-content-center">
                                            提交时间
                                        </div>
                                    </div>
                                </div>
                                <div v-if="isshowlist">
                                    <div class="col-md-12" v-for="item,index in AppListData.data" :key="index">
                                        <List :send="item"></List>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div class="col-md-4 rounded" id="management" style="margin-left:20px">
                            <Management></Management>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
name:'Apply'
import Management from '@/components/Apply/Management'
import List from '@/components/Apply/List'
import Cookies from "js-cookie";
import { get, post } from "@/http/api";
import { onMounted, reactive,watch,ref } from 'vue';
import {useStore} from 'vuex'
const Store = useStore();
const istip = reactive({
    state:false,
    msg:'',
});
onMounted(()=>{
    GetAppList()
})
// 监听vuex内的tips状态
watch(
    () => Store.state.msg,
    (val, old) => {
        istip.state = true;
        istip.msg = val;
    }
);
// 关闭提示
const closetip = () =>{
    istip.state = false;
};
// 请求数据
const GetAppList = () =>{
    let data = {token:Cookies.get('token')}
    post('api/v1/UserAppList/',data).then((res)=>{
        // console.log(res);
        if (res.data.code == 200)
        {
            AppListData.data = res.data.data;
            console.log(AppListData.data[0].fields);
        }
    })
};
// 容器
const AppListData = reactive({
    data:[]
});
const isshowlist = ref(true)
watch(()=>Store.state.liststate,
    (val, old) => {
        isshowlist.value = false;
        GetAppList();
        setTimeout(()=>{
            isshowlist.value = true;
        },1000);
    }
);
</script>

<style lang="scss" scoped>
#apply{
    // padding: 10px;
    margin:0px;
    // background-color: white;
}
#management{
    padding: 10px;
    margin:0px;
    background-color: white;
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