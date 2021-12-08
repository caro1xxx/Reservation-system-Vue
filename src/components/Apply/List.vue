<template>
    <div id="list">
        <div id="body" :style="{background:state}" class="row-md-12">
            <div class="row">
                <div class="col-md-2 d-flex justify-content-center">
                    {{props.send.pk}}
                </div>
                <div class="col-md-2 d-flex justify-content-center">
                    {{props.send.fields.borrow}}
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
                            <span class="d-inline-block text-truncate"  style="max-width: 100px;">{{props.send.fields.site}}</span>
                        </template>
                    </el-popover>
                </div>
                <div class="col-md-2 d-flex justify-content-center">
                    <el-popover
                        placement="top-start"
                        title="开始时间"
                        :width="200"
                        trigger="hover"
                        :content=starttime
                    >
                        <template #reference>
                            <span class="d-inline-block text-truncate"  style="max-width: 100px;">{{starttime}}</span>
                        </template>
                    </el-popover>
                </div>
                <div class="col-md-2 d-flex justify-content-center">
                    <el-popover
                        placement="top-start"
                        title="结束时间"
                        :width="200"
                        trigger="hover"
                        :content=stoptime
                    >
                        <template #reference>
                            <span class="d-inline-block text-truncate"  style="max-width: 100px;">{{stoptime}}</span>
                        </template>
                    </el-popover>
                </div>
                <div class="col-md-2 d-flex justify-content-center">
                    <el-popover
                        placement="top-start"
                        title="提交时间"
                        :width="200"
                        trigger="hover"
                        :content=props.send.fields.apply_time
                    >
                        <template #reference>
                            <span class="d-inline-block text-truncate"  style="max-width: 100px;">{{ props.send.fields.apply_time }}</span>
                        </template>
                    </el-popover>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue-demi";
import { get, post } from "@/http/api";
name:'List'
// 接收父组件数据
const props = defineProps({
    send: String,
});
console.log(typeof(props.send.fields.date));
const starttime = computed(()=>{
    return props.send.fields.date +' '+props.send.fields.start_time
});
const stoptime = computed(()=>{
    return props.send.fields.date +' '+props.send.fields.stop_time
});
const state = computed(()=>{
    if (props.send.fields.state == '0')
    {
        return '#f5a99f'
    }
    else if (props.send.fields.state == '1')
    {
        return '#219c55'
    }
    else if (props.send.fields.state == '2')
    {
        return '#DBEAF8'
    }
});
</script>

<style lang="scss" scoped>
#list{
    margin-bottom: 5px;
    #body{
        // #DC3545
        width: 100%;
        padding: 10px;
        color: #114da7;
        line-height: 20px;
    }
}
</style>