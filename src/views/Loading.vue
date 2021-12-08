<template>
    <div>

    </div>
</template>

<script setup>
import { onMounted } from "vue-demi";
import {useRouter} from 'vue-router';
import { useStore } from 'vuex'
const Store = useStore()
const Router = useRouter();
name:'Loading'
onMounted(()=>{
    Store.commit('ChangeTokenState',null)
})
</script>

<style lang="scss" scoped>

</style>