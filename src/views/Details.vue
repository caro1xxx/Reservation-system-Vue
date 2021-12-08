<template>
    <div class="container-fluid" style="background-color: #F6F6F6;padding:20px;margin-top:60px">
        <div class="container">
            <div id="situation" class="row rounded">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-3">
                            <Date></Date>
                        </div>
                        <div class="col-md-6 d-flex justify-content-center">
                            <Go></Go>
                        </div>
                        <div class="col-md-12">
                            <Body></Body>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
name:'Details'
import Date from '@/components/details/Date.vue'
import Body from '@/components/details/Body.vue'
import Go from '@/components/details/Go.vue'
</script>

<style lang="scss" scoped>
#situation{
    padding: 10px;
    margin:0px;
    background-color: white;
}
</style>