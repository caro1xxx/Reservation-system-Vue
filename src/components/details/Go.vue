<template>
    <div id="Go" class="d-flex">
        <svg v-if="!isback" @click="RedPages" t="1632481170303" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4164" width="30" height="30"><path d="M512 64c247.424 0 448 200.576 448 448S759.424 960 512 960 64 759.424 64 512 264.576 64 512 64z m36.22 666c12.701 13.043 32.805 13.203 44.82 1 12.855-12.468 13.134-32.449 0.996-45L429.195 516.628a8 8 0 0 1 0.048-11.209L594.036 339c11.964-12.826 12.04-32.809 0-45v-1c-12.693-12.023-32.52-12.1-44.82 0l-182.02 184.439c-18.386 18.631-18.455 48.559-0.154 67.274L548.219 730z" fill="#1296db" p-id="4165"></path></svg>
        <svg v-if="isback" t="1632506364994" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1404" width="30" height="30"><path d="M512 64c247.424 0 448 200.576 448 448S759.424 960 512 960 64 759.424 64 512 264.576 64 512 64z m36.22 666c12.701 13.043 32.805 13.203 44.82 1 12.855-12.468 13.134-32.449 0.996-45L429.195 516.628a8 8 0 0 1 0.048-11.209L594.036 339c11.964-12.826 12.04-32.809 0-45v-1c-12.693-12.023-32.52-12.1-44.82 0l-182.02 184.439c-18.386 18.631-18.455 48.559-0.154 67.274L548.219 730z" fill="#8a8a8a" p-id="1405"></path></svg>
        &nbsp;
        {{ NowDate }}
        &nbsp;
        <svg v-if="isforward" @click="IncPages" t="1632481204800" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5253" width="30" height="30"><path d="M512 64C264.576 64 64 264.576 64 512s200.576 448 448 448 448-200.576 448-448S759.424 64 512 64z m-82.474 229.195c12.594-12.398 32.853-12.238 45.25 0.357L657.65 479.355c18.46 18.756 18.376 48.878-0.188 67.53l-182.812 183.69-0.377 0.371C461.78 743.1 441.8 743.023 429.4 730.68l-0.372-0.376c-12.152-12.495-12.076-32.478 0.266-44.878l166.055-166.85a8 8 0 0 0 0.03-11.256L429.17 338.448l-0.368-0.38c-12.024-12.62-11.743-32.6 0.725-44.873z" fill="#1296db" p-id="5254"></path></svg>
        <svg v-if="!isforward" t="1632506458065" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2469" width="30" height="30"><path d="M512 64C264.576 64 64 264.576 64 512s200.576 448 448 448 448-200.576 448-448S759.424 64 512 64z m-82.474 229.195c12.594-12.398 32.853-12.238 45.25 0.357L657.65 479.355c18.46 18.756 18.376 48.878-0.188 67.53l-182.812 183.69-0.377 0.371C461.78 743.1 441.8 743.023 429.4 730.68l-0.372-0.376c-12.152-12.495-12.076-32.478 0.266-44.878l166.055-166.85a8 8 0 0 0 0.03-11.256L429.17 338.448l-0.368-0.38c-12.024-12.62-11.743-32.6 0.725-44.873z" fill="#8a8a8a" p-id="2470"></path></svg>
    </div>
</template>

<script setup>
name:'Go'
import { onMounted, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
const Store = useStore();
const NowDate = ref('')
const isback = ref(false)
const isforward = ref(false)
// 监听日期变化
watch(
    () => Store.state.nowdate,
    (val, old) => {
        NowDate.value = val;
        // console.log(NowDate.value);
    }
);
// 监听页码变化
watch(
    () => Store.state.nowpage,
    (val, old) => {
        if ((val-1) >=1 )
        {
            isback.value = false;
        }
        else
        {
            isback.value = true
        }
    }
);
// 监听页码变化
watch(
    () => Store.state.next,
    (val, old) => {
        if (val == 'null')
        {
            isforward.value = false;
        }
        else
        {
            isforward.value = true;
        }
    }
);
// 初始化检查是否是最后一页
onMounted(()=>{
    // 以下内容全是解决跳转其他路由然后回来不显示问题
    if ((Store.state.nowpage-1) <= 0)
    {
        isback.value = true
        NowDate.value = Store.state.nowdate;
    }
    else
    {
        isback.value.value = false;
        NowDate.value = Store.state.nowdate;
    }
    if (Store.state.next == 'null')
    {
        isforward.value = false;
        NowDate.value = Store.state.nowdate;
    }
    else
    {
        isforward.value = true;
        NowDate.value = Store.state.nowdate;
    }
})
const IncPages = () =>{
    Store.commit('IncreasePage')
}
const RedPages = () =>{
    Store.commit('ReducePage')
}
</script>

<style lang="scss" scoped>
#Go{
    color:#D2C9CC;
    line-height: 42px;
    font-size:18px;
    svg{
        margin-top: 5px;
    }
}
</style>
