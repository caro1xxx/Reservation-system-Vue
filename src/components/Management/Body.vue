<template>
    <div v-if="!isshow">
        <el-empty description="暂无详细内容"></el-empty>
    </div>
    <div v-if="isshow">
        <div class="row">
            <div class="col-md-12 fs-2 fw-bold">
                详细内容
            </div>
            <div class="col-md-12" style="margin-top:10px">
                借用人:
            </div>
            <div class="col-md-12">
                <el-input v-model="datas.data.borrow" disabled placeholder="Please input" />
            </div>
            <div class="col-md-12" style="margin-top:10px">
                借用场地:
            </div>
            <div class="col-md-12">
                <el-input v-model="datas.data.site" disabled placeholder="Please input" />
            </div>
            <div class="col-md-12" style="margin-top:10px">
                用途:
            </div>
            <div class="col-md-12">
                <el-input v-model="datas.data.use" disabled placeholder="Please input" />
            </div>
            <div class="col-md-12" style="margin-top:10px">
                内容:
            </div>
            <div class="col-md-12">
                <el-input
                    v-model="datas.data.context"
                    disabled
                    autosize
                    type="textarea"
                    placeholder="Please input"
                />
            </div>
            <div class="col-md-12" style="margin-top:10px">
                主讲:
            </div>
            <div class="col-md-12">
                <el-input v-model="datas.data.teacher" disabled placeholder="Please input" />
            </div>
            <div class="col-md-12" style="margin-top:10px">
                听课人:
            </div>
            <div class="col-md-12">
                <el-input v-model="datas.data.participate" disabled placeholder="Please input" />
            </div>
            <div class="col-md-12" style="margin-top:10px">
                日期:
            </div>
            <div class="col-md-12">
                <el-input v-model="datas.data.date" disabled placeholder="Please input" />
            </div>
            <div class="col-md-12" style="margin-top:10px">
                开始时间:
            </div>
            <div class="col-md-12">
                <el-input v-model="datas.data.start_time" disabled placeholder="Please input" />
            </div>
            <div class="col-md-12" style="margin-top:10px">
                结束时间:
            </div>
            <div class="col-md-12">
                <el-input v-model="datas.data.stop_time" disabled placeholder="Please input" />
            </div>
            <div class="col-md-12" style="margin-top:10px">
                提交时间:
            </div>
            <div class="col-md-12">
                <el-input v-model="datas.data.apply_time" disabled placeholder="Please input" />
            </div>
            <div class="col-md-12" style="margin-top:10px">
                人数:
            </div>
            <div class="col-md-12">
                <el-input v-model="datas.data.people" disabled placeholder="Please input" />
            </div>
            <div class="col-md-12" style="margin-top:10px">
                审核状态:
            </div>
            <div class="col-md-12">
                <el-input v-model="rs" disabled placeholder="Please input" />
            </div>
        </div>
    </div>
</template>

<script setup>
name:'Body'
import {useStore} from 'vuex';
import { computed, reactive, ref, watch } from 'vue';
import { get, post } from "@/http/api";
const Store = useStore()
watch(() => Store.state.num,
    (val, old) =>{
        GetDetails(val);
    }
);
const datas = reactive({
    data:[]
});
const isshow =ref(false)
const GetDetails = (id) =>{
    let data = {id:id}
    post('api/v1/Detailed/',data).then((res)=>{
        if (res.data.code == 200)
        {
            datas.data = res.data.data[0].fields;
            if (res.data.data[0].fields.state == '2')
            {
                rs.value='等待审核'
            }
            isshow.value = true
        }
    })
};

const rs = ref('');
</script>

<style lang="scss" scoped>

</style>