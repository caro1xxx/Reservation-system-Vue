<template>
    <div style="margin-bottom:40px;" @click="details(props.send.name)">
        <div class="card" style="width: 18rem;overflow: hidden;">
            <img :src='props.send.src' id="SC"  class="card-img-top" alt="...">
            <div class="card-body">
                <p class="card-text">{{ props.send.name }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
name:'SituationChild'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const Store = useStore()
// 接收父组件数据
const Router = useRouter()
const props = defineProps({
    send: String,
});
const details = (url) => {
    Store.commit('SetUrlName',url)
    Router.push('/details')
}
</script>

<style lang="scss" scoped>
#SC:hover{
    transform: scale(1.4);
}
#SC{
    cursor: pointer;
}
// @/assets/img/address.png
</style>