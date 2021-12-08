<template>
    <div id="List">
        <div class="row">
            <div class="col-md-2 d-flex justify-content-center">
                {{ props.send.pk }}
            </div>
            <div class="col-md-2 d-flex justify-content-center">
                <el-popover
                    placement="top-start"
                    title="借用人"
                    :width="200"
                    trigger="hover"
                    :content=props.send.fields.borrow
                >
                    <template #reference>
                        <span class="d-inline-block text-truncate"  style="max-width: 100px;">{{ props.send.fields.borrow }}</span>
                    </template>
                </el-popover>
            </div>
            <div class="col-md-2 d-flex justify-content-center">
                <el-popover
                    placement="top-start"
                    title="场地"
                    :width="200"
                    trigger="hover"
                    :content=props.send.fields.site
                >
                    <template #reference>
                        <span class="d-inline-block text-truncate"  style="max-width: 100px;">{{ props.send.fields.site }}</span>
                    </template>
                </el-popover>
            </div>
            <div class="col-md-2 d-flex justify-content-center">
                <el-popover
                    placement="top-start"
                    title="场地"
                    :width="200"
                    trigger="hover"
                    :content=props.send.fields.date
                >
                    <template #reference>
                        <span class="d-inline-block text-truncate"  style="max-width: 100px;">{{ props.send.fields.date }}</span>
                    </template>
                </el-popover>
            </div>
            <div class="col-md-2 d-flex justify-content-center">
                <span class="text-primary fw-bold" @click="SetDetails(props.send.pk)">查看详细</span>&nbsp;&nbsp;
            </div>
            <div class="col-md-2 d-flex justify-content-center">
                <span @click="Todo(props.send.pk,'同意')" class="text-success fw-bold">同意</span>&nbsp;&nbsp;
                <span @click="Todo(props.send.pk,'拒绝')" class="text-danger fw-bold">拒绝</span>
            </div>
        </div>
    </div>
</template>

<script setup>
name:'List'
import {useStore} from 'vuex';
import { get, post } from "@/http/api";
import {computed, ref,watch} from 'vue'
import Cookies from "js-cookie";
const Store = useStore()
// 接收父组件数据
const props = defineProps({
    send: String,
});
const SetDetails = (id) => {
    Store.commit('SetDetailsNum',id)
};
// 处理
const Todo = (id,state) =>{
    let data = {id:id,state:state,token:Cookies.get('token')}
    post('api/v1/Todo/',data).then((res)=>{
        console.log(res);
        if (res.data.code == 200)
        {
            Store.commit('SetbodyState',res.data.msg)
        }
    })
};
</script>

<style lang="scss" scoped>
#List{
    background-color: #F6F6F6;
    height: 40px;
    line-height: 40px;
    margin-bottom: 10px;
}
</style>