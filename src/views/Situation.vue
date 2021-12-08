<template>
    <div class="container-fluid" style="background-color: #F6F6F6;padding:20px;margin-top:60px">
        <div class="container">
            <div id="situation" class="row rounded">
                <div class="col-md-12 d-flex justify-content-start">
                    <div class="row">
                        <div class="col-md-3" v-for="item in addressName.data" :key="item">
                            <SC :send="item"></SC>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
name:'Situation'
<script setup>
name:'Situation'
import SC from '@/components/SituationChild.vue'
import { reactive } from '@vue/reactivity';
const addressName = reactive({
    data:[
        {
            name:'科技大厦901大厅',
            src: require('@/assets/img/kejidasa.png')
        },
        {
            name:'土建334',
            src: require('@/assets/img/kejidasa.png')
        },
        {
            name:'学术会议室',
            src: require('@/assets/img/kejidasa.png')
        },
        {
            name:'学院会议室-8618',
            src: require('@/assets/img/kejidasa.png')
        },
        {
            name:'设备馆-参观',
            src: require('@/assets/img/kejidasa.png')
        },
        {
            name:'设备馆-上课',
            src: require('@/assets/img/kejidasa.png')
        },
        {
            name:'民航管制综合实验室',
            src: require('@/assets/img/kejidasa.png')
        },
        {
            name:'科技大厦901会议室',
            src: require('@/assets/img/kejidasa.png')
        },
        {
            name:'土建楼会议室',
            src: require('@/assets/img/kejidasa.png')
        },
        {
            name:'学院会议室-大',
            src: require('@/assets/img/kejidasa.png')
        },
        {
            name:'学院会议室-8616',
            src: require('@/assets/img/kejidasa.png')
        }
    ]
})
</script>

<style lang="scss" scoped>
#situation{
    // background-color: white;
    padding: 10px;
    margin:0px;
}
</style>