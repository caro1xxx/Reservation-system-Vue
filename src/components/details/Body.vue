<template>
    <div id="Body">
        <div class="row">
            <div class="col-md-12">
                <div id="table" v-if="isshow">
                    <div class="class-table">
                        <div class='class-table'>
                            <div class='table-wrapper'>
                                <div class='tabel-container'>
                                    <table v-if="is">
                                        <thead>
                                            <tr>
                                                <th style="font-size:18px">时间</th>
                                                <th v-for='(week, index) in weeks.data' :key='index'>
                                                    <div style="padding:12px;font-size:18px">
                                                        {{'周' + digital2Chinese(index+1, 'week')}}
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for='(item, index) in classTableData.data.results.results' :key='index'>
                                                <td style="padding:0px">
                                                    <!-- <p>{{'第' + digital2Chinese(index+1) + '节'}}</p> -->
                                                    <div style="padding:12px">
                                                        {{ item.classestime }}
                                                    </div>
                                                    <!-- <p class='period'></p> -->
                                                </td>

                                                <td style="padding:0px" v-for='(week, index) in weeks.data' :key='index'>
                                                    <!-- <div style="padding:10px" :style="{background:item[week]}">
                                                        {{item[week]  || '-'}}
                                                    </div> -->
                                                    <div style="padding:12px;background:#67A1FF" v-if="item[week]!='-'">
                                                        <el-popover
                                                            placement="top-start"
                                                            title="详细信息"
                                                            :width="200"
                                                            trigger="hover"
                                                            :content=item[week]
                                                        >
                                                            <template #reference>
                                                                <span class="d-inline-block text-truncate"  style="max-width: 80px;">{{item[week]  || '-'}}&nbsp;</span>
                                                            </template>
                                                        </el-popover>
                                                    </div>
                                                    <div style="padding:12px;background:#EAF2FF" v-if="item[week]=='-'">
                                                        {{item[week]  || '-'}}
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table v-if="!is">
                                        <thead>
                                            <tr>
                                                <th style="font-size:18px">时间</th>
                                                <th v-for='(week, index) in weeks.data' :key='index'>
                                                    <div style="padding:12px;font-size:18px">
                                                        {{'周' + digital2Chinese(index+1, 'week')}}
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for='(item, index) in classTableData.data.results.results' :key='index'>
                                                <td style="padding:0px">
                                                    <!-- <p>{{'第' + digital2Chinese(index+1) + '节'}}</p> -->
                                                    <div style="padding:12px">
                                                        {{ item.classestime }}
                                                    </div>
                                                    <!-- <p class='period'></p> -->
                                                </td>

                                                <td style="padding:0px" v-for='(week, index) in weeks.data' :key='index'>
                                                    <!-- <div style="padding:10px" :style="{background:item[week]}">
                                                        {{item[week]  || '-'}}
                                                    </div> -->
                                                    <div style="padding:12px;background:#67A1FF" v-if="item[week]!='-'">
                                                        {{item[week]  || '-'}}
                                                    </div>
                                                    <div style="padding:10px;background:#EAF2FF" v-if="item[week]=='-'">
                                                        {{item[week]  || '-'}}
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="loading" v-if="loading" class="d-flex justify-content-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div id="loading" v-if="kong" class="d-flex justify-content-center">
                    <p class="text-primary">当前星期没有数据</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
name:'Body'
import { reactive,onMounted,watch,ref } from "vue";
import { get, post } from "@/http/api";
import { useStore } from 'vuex'
// 是否显示表格
const isshow = ref(true);
// 是否显示加载
const loading = ref(false);
// 是否显示为空
const kong = ref(false);
// 判断显示哪个表格
const is = ref(true);
const Store = useStore();
// 表头
const weeks =reactive({
    data:['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
})
// 数据容器1
const classTableData = reactive({
    data:{
        count:Number,
        next:null,
        previous:null,
        results:[]
    },
    tableShow: false
});
// 数据容器2
const classTableData2 = reactive({
    data:[],
    tableShow: false
});
// 更新星期几
const digital2Chinese =(num, identifier)=>{
    const character = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
            return identifier === 'week' && (num === 0 || num === 7) ? '日' : character[num];
}
// 获取数据
const GetData = (url) =>{
    get(`api/${url}/?page=1`).then((res)=>{
        // classTableData.data = JSON.parse(res.request.response)
        classTableData.data.results = JSON.parse(res.request.response)
        console.log(classTableData.data.results.results[0].date);
        Store.commit('AddNowDate',classTableData.data.results.results[0].date);
        Store.commit('CheckPage',JSON.stringify(res.data.next));
        
    })
}
onMounted(()=>{
    if(Store.state.urlname == '科技大厦901大厅')
    {
        GetData('Scheduling');
        Store.commit('SetUrl','Scheduling')
    }
    else if (Store.state.urlname == '土建334')
    {
        GetData('Tujian334');
        Store.commit('SetUrl','Tujian334')
    }
    else if (Store.state.urlname == '学术会议室')
    {
        GetData('XueShuHuiYiShiViewSet');
        Store.commit('SetUrl','XueShuHuiYiShiViewSet')
    }
    else if (Store.state.urlname == '学院会议室-8618')
    {
        GetData('XueYuan8618');
        Store.commit('SetUrl','XueYuan8618')
    }
    else if (Store.state.urlname == '设备馆-参观')
    {
        GetData('CanGuan');
        Store.commit('SetUrl','CanGuan')
    }
    else if (Store.state.urlname == '设备馆-上课')
    {
        GetData('ShangKe');
        Store.commit('SetUrl','ShangKe')
    }
    else if (Store.state.urlname == '民航管制综合实验室')
    {
        GetData('MingHang');
        Store.commit('SetUrl','MingHang')
    }
    else if (Store.state.urlname == '科技大厦901会议室')
    {
        GetData('KeJi901');
        Store.commit('SetUrl','KeJi901')
    }
    else if (Store.state.urlname == '土建楼会议室')
    {
        GetData('TuJianHuiYiShi');
        Store.commit('SetUrl','TuJianHuiYiShi')
    }
    else if (Store.state.urlname == '学院会议室-大')
    {
        GetData('XueYuanDa');
        Store.commit('SetUrl','XueYuanDa')
    }
    else if (Store.state.urlname == '学院会议室-8616')
    {
        GetData('XueYuan8616');
        Store.commit('SetUrl','XueYuan8616')
    }

    // GetData();
})
const iscolors = ref('')
// 计算v-for中的值
const jianting = (colors)=>{
    if (colors !='-')
    {
        iscolors.value = '#67A1FF'
    }
    else
    {
        iscolors.value = '#EAF2FF'
    }
}
// 监听前进后退按钮
watch(
    () => Store.state.nowpage,
    (val, old) => {
        isshow.value = false;
        loading.value = true;
        let x = Store.state.url
        get(`api/${x}/?page=${val}`).then((res)=>{
            // classTableData.data = JSON.parse(res.request.response)
            classTableData.data.results = JSON.parse(res.request.response)
            // console.log(res.data.next);
            Store.commit('AddNowDate',classTableData.data.results.results[0].date);
            Store.commit('CheckPage',JSON.stringify(res.data.next));
            is.value = true;
            isshow.value = true;
            loading.value = false;
        })
    }
);
// 监听日期选择器
watch(
    () => Store.state.date,
    (val, old) => {
        isshow.value = false;
        loading.value = true;
        let data = {date:val};
        // console.log(data);
        post(`api/v1/DateView/`,data).then((res)=>{
            if (res.data.length != 0)
            {
                classTableData2.data = JSON.parse(res.request.response)
                // console.log(classTableData2.data[0].fields.date);
                Store.commit('AddNowDate',classTableData2.data[0].fields.date);
                is.value = false;
                isshow.value = true;
                loading.value = false;
                kong.value = false;
            }
            else
            {
                kong.value = true;
                isshow.value = false;
                loading.value = false;
            }
        })
    }
);
</script>

<style lang="scss" scoped>
#Body{
    margin-top: 20px;
    #table{
        // background-color: aqua;
        // height: 500px;
        margin-bottom: 10px;
    }
}
.class-table {
    .table-wrapper {
        width: 100%;
        height: 100%;
        overflow: auto;
    }
    .tabel-container {
        // margin: 7px;

        table {
            table-layout: fixed;
            width: 100%;

            thead {
                background-color: #67a1ff;
                th {
                    color: #fff;
                    line-height: 17px;
                    font-weight: normal;
                }
            }
            tbody {
                background-color: #eaf2ff;
                td {
                    color: #677998;
                    line-height: 12px;
                }
            }
            th,
            td {
                width: 60px;
                // padding: 12px 2px;
                font-size: 12px;
                text-align: center;
            }

            tr td:first-child {
                color: #333;
                .period {
                    font-size: 15px;
                }
            }
        }
    }
}
#loading{
    width: 100%;
    height: 1000px;
}
</style>