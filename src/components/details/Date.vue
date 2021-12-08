<template>
    <div>
        <div class="demo-date-picker">
            <div class="block">
                <el-date-picker
                v-model="value1"
                type="week"
                format="[第] ww [周]"
                placeholder="请选择一个星期"
                >
                </el-date-picker>
            </div>
        </div>
        <!-- <p @click="click">11111</p> -->
    </div>
</template>

<script>
name:'Date'
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import {useStore} from 'vuex'
export default defineComponent({
  setup() {
    const Store = useStore();
    const state = reactive({
      value1: '',
    });
    const click = () =>{
      console.log(state.value1);
      console.log(typeof(state.value1.getMonth()));
    }
    // 监听日期选择器
    watch(
      () => state.value1,
      (val, old) => {
          let date = '';
          if (val.getMonth()+1 < 10)
          {
            if (val.getDate() < 10)
            {
              date = (val.getFullYear()+'')+'-'+'0'+(val.getMonth()+1+'')+'-'+'0'+(val.getDate()+'')
            }
            else
            {
              date = (val.getFullYear()+'')+'-'+'0'+(val.getMonth()+1+'')+'-'+(val.getDate()+'')
            }
          }
          else if (val.getDate() < 10)
          {
            date = (val.getFullYear()+'')+'-'+(val.getMonth()+1+'')+'-'+'0'+(val.getDate()+'')
          }
          else
          {
            date = (val.getFullYear()+'')+'-'+(val.getMonth()+1+'')+'-'+(val.getDate()+'')
          }
          Store.commit('ChangeDate',date);
          var beginDate;
          var curr_time = val;
          var week_time = new Date(curr_time.getTime() - 1000 * 60 * 60 * 24 * -6);
          var curyear = week_time.getFullYear();
          var curmonth = week_time.getMonth() + 1;
          curmonth = curmonth > 9 ? curmonth.toString() : '0' + curmonth.toString();
          var curday = week_time.getDate();
          curday = curday > 9 ? curday.toString() : '0' + curday.toString();
          beginDate = curyear + "-" + curmonth + "-" + curday;
          // console.log(date+'到'+beginDate);
          Store.commit('ChangeDate',date+'到'+beginDate);
        }
    );
    return {
      ...toRefs(state),
      click,
    }
  },
})
</script>

<style lang="scss" scoped>

</style>