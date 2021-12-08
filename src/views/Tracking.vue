<template>
    <div class="container-fluid" style="background-color: #F6F6F6;padding:20px;margin-top:60px">
        <div class="container">
            <div id="tracking" class="row rounded">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-12">
                            <List></List>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
name:'Tracking'
import List from '@/components/Tracking/List.vue'
</script>

<style lang="scss" scoped>
#tracking{
    padding: 10px;
    margin:0px;
    background-color: white;
}
</style>