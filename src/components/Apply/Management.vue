<template>
    <div id="management">
        <div class="row">
            <div class="col-md-12 fs-3 fw-bold">
                <p @click="clikc">申请预约</p>
            </div>
            <div class="col-md-12" id="form">
                <span>借用人</span>:&nbsp;{{ name }}
            </div>
            <div class="col-md-12" id="form">
                <span style="color:red">*</span>
                <span style="color:rgb(136, 136, 136)">&nbsp;代表必选</span>
            </div>
            <div class="col-md-12" id="form">
                <span style="color:red">*</span>
                <span>&nbsp;借用场地</span>:
                <el-select v-model="site" placeholder="请选择场地">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="col-md-12" id="form">
                <div class="row">
                    <div class="col-md-3" >
                        <span style="color:red">*</span>
                        <span>&nbsp;用途</span>:
                    </div>
                    <div class="col-md-9" style="padding:0px">
                        <span style="margin-top: 20px">
                            <el-radio-group v-model="radio" size="small">
                            <el-radio-button label="科研"></el-radio-button>
                            <el-radio-button label="教学"></el-radio-button>
                            <el-radio-button label="团委"></el-radio-button>
                            <el-radio-button label="学院"></el-radio-button>
                            <el-radio-button label="其他"></el-radio-button>
                            </el-radio-group>
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-md-12" id="form">
                <span style="color:red">*</span>
                <span>&nbsp;实验、会议或报告内容</span>:
                <div style="margin:0px 10px">
                    <el-input
                        v-model="textarea"
                        :rows="2"
                        autosize
                        type="textarea"
                        placeholder="请输入"
                    />
                </div>
            </div>
            <div class="col-md-12" id="form">
                <span style="color:red">*</span>
                <span>&nbsp;主持或主讲</span>:
                <div style="margin:0px 10px">
                    <el-input v-model="input" placeholder="请输入" clearable />
                </div>
            </div>
            <div class="col-md-12" id="form">
                <span style="color:red">*</span>
                <span>&nbsp;听课人或参加人</span>:
                <div style="margin:0px 10px">
                    <el-input v-model="participate" placeholder="请输入" clearable />
                </div>
            </div>
            <div class="col-md-12" id="form">
                <span style="color:red">*</span>
                <span>&nbsp;日期</span>:
                <div class="demo-date-picker" style="margin:0px 10px">
                    <div class="block">
                        <el-date-picker v-model="date" type="date" placeholder="请选择一个天数">
                        </el-date-picker>
                    </div>
                </div>
            </div>
            <div class="col-md-12" id="form">
                <span style="color:red">*</span>
                <span @click="click">&nbsp;起止时间</span>:
                <p style="margin-left: 13px;font-size:12px;color:red">时间范围08:00-22:00之间,如果选择的时间不在这区间内会出现异常</p>
                <div style="margin:0px 10px">
                    <el-time-picker
                        v-model="start_stoptime"
                        is-range
                        range-separator="-"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        >
                    </el-time-picker>
                </div>
            </div>
            <div class="col-md-12" id="form">
                <span style="color:red">*</span>
                <span @click="click">&nbsp;人数</span>:
                <div style="margin:0px 10px">
                    <el-input v-model="people" placeholder="Please input" />
                </div>
            </div>
            <div class="col-md-12" id="form">
                <span @click="click">&nbsp;描述</span>:
                <div style="margin:0px 10px">
                    <el-input
                        v-model="note"
                        autosize
                        :rows="2"
                        type="textarea"
                        placeholder="请输入"
                    />
                </div>
            </div>
            <div class="col-md-12" style="padding:0px 20px;" id="form">
                <button @click="submit" style="width:100%" type="button" class="btn btn-primary">提交</button>
            </div>
        </div>
    </div>
</template>

<script setup>
name:'Management'
import { computed, reactive, ref } from 'vue'
import {useStore} from 'vuex'
import Cookies from "js-cookie";
import { get, post } from "@/http/api";
import { ElMessageBox, ElMessage } from 'element-plus'
const Store = useStore();
const options = ref([
        {
          value: '科技大厦901大厅(69人)',
          label: '科技大厦901大厅(69人)',
        },
        {
          value: '土建334(10人)',
          label: '土建334(10人)',
        //   disabled: true,
        },
        {
          value: '学术会议室(40人)',
          label: '学术会议室(40人)',
        },
        {
          value: '学院会议室-8618(8教8616)',
          label: '学院会议室-8618(8教8616)',
        },
        {
          value: '设备馆-参观',
          label: '设备馆-参观',
        },
        {
          value: '设备馆-上课',
          label: '设备馆-上课',
        },
        {
          value: '民航管制综合实验室',
          label: '民航管制综合实验室',
        },
        {
          value: '科技大厦901会议室(40人)',
          label: '科技大厦901会议室(40人)',
        },
        {
          value: '土建楼会议室(30人)',
          label: '土建楼会议室(30人)',
        },
        {
          value: '学院会议室(30人)',
          label: '学院会议室(30人)',
        },
        {
          value: '学院会议室-8616(8教8618)',
          label: '学院会议室-8616(8教8618)',
        },
      ])
const site=ref('')
const radio = ref('')
const textarea = ref('')
const input = ref('')
const participate = ref('')
const date = ref('')
const start_stoptime = ref('')
const people = ref('')
const note = ref('')
const click = () =>{
    console.log(start_stoptime.value[1]);
}
// 提交判断表单
const submit = () =>{
    if (site.value == '')
    {
        Store.commit('ChangeTipState','请选择场地');
    }
    else if (radio.value == '')
    {
        Store.commit('ChangeTipState','请选择用途');
    }
    else if ( textarea.value == '')
    {
        Store.commit('ChangeTipState','请输入实验、会议或报告内容');
    }
    else if ( input.value == '')
    {
        Store.commit('ChangeTipState','请输入主持或主讲');
    }
    else if ( participate.value == '')
    {
        Store.commit('ChangeTipState','请输入听课人或参加人');
    }else if ( date.value == '')
    {
        Store.commit('ChangeTipState','请选择日期');
    }else if ( start_stoptime.value == '')
    {
        Store.commit('ChangeTipState','请选择起止时间');
    }else if ( people.value == '')
    {
        Store.commit('ChangeTipState','请输入人数');
    }
    else
    {
        let dates = (date.value.getFullYear()+'')+'-'+((date.value.getMonth()+1)+'')+'-'+(date.value.getDate()+'')+' '+((start_stoptime.value[0].getHours()))+''+':'+((start_stoptime.value[0].getMinutes()))+''+'到'+(date.value.getFullYear()+'')+'-'+((date.value.getMonth()+1)+'')+'-'+(date.value.getDate()+'')+' '+((start_stoptime.value[1].getHours()))+''+':'+((start_stoptime.value[1].getMinutes()))+''
        // let time = ((start_stoptime.value[0].getHours()+1))+''+':'
        ElMessageBox.alert(`场地:${site.value}
                            用途:${radio.value}
                            日期:${dates}`, '请仔细核对', {
            // 回调函数 起止时间:${start_stoptime.value}
                confirmButtonText: 'OK',
                callback: (action) => {
                    if (action == 'confirm')
                    {
                        GetAppList();
                    }
            },
        })
    }
};
// 计算借用人名字
const name = computed(()=>{
    return Cookies.get('name');
});
// 提交数据
const GetAppList = () =>{
    let nowdate = (date.value.getFullYear()+'')+'-'+((date.value.getMonth()+1)+'')+'-'+(date.value.getDate())
    let starttime = ((start_stoptime.value[0].getHours()))+''+':'+((start_stoptime.value[0].getMinutes()))
    let stoptime = ((start_stoptime.value[1].getHours()))+''+':'+((start_stoptime.value[1].getMinutes()))
    let jieyongren = Cookies.get('name');
    let token = Cookies.get('token');
    let now = new Date()
    let d = (now.getFullYear()+'')+'-'+((now.getMonth()+1)+'')+'-'+(now.getDate())+' '+((now.getHours()))+''+':'+((now.getMinutes()));
    let data = {borrow:jieyongren,borrow_token:token,site:site.value,use:radio.value,
                context:textarea.value,teacher:input.value,participate:participate.value,
                date:nowdate,start_time:starttime,stop_time:stoptime,people:people.value,
                apply_time:d}
    post('api/v1/Submit/',data).then((res)=>{
        Store.commit('ChangeTipState',res.data.msg);
        if (res.data.code == 200)
        {
            Store.commit('Changeliststate');
        }
    })
};
const clikc = ()=>{
    let now = new Date()
    
    console.log(d)
}
</script>

<style lang="scss" scoped>
// #management{
//     // height: 400px;
// }
#form{
    margin-top:10px;
}
</style>