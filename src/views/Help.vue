<template>
  <div class="container-fluid" style="background-color: #F6F6F6;padding:20px;margin-top:60px">
        <div class="container">
            <div id="about" class="row rounded">
                <div class="col-md-12">
                    <div class="row">
                        <h3>第1步：登录</h3>
                        <img @click="img" src="@/assets/help/1.png" alt="">
                        <h3>第2步：使用分配的账号密码进行登录</h3>
                        <img @click="img" src="@/assets/help/2.png" alt="">
                        <h3>登录之后可以看到右上角会显示您的名字并且可以点击预约按钮开始申请了</h3>
                        <img @click="img" src="@/assets/help/3.png" alt="">
                        <h3>页面介绍</h3>
                        <img @click="img" src="@/assets/help/4.png" alt="">
                        <h3>选择需要查看的场地(这个页面仅供查看占用情况，如需申请请浏览提交申请页面)</h3>
                        <img @click="img" src="@/assets/help/5.png" alt="">
                        <h3>这里我点进了一个场地查看占用情况(已经被占用的时间会显示'已被预约'，只有-的地方是空闲的时间段)</h3>
                        <img @click="img" src="@/assets/help/6.png" alt="">
                        <h3>在选好需要申请的时间和场地后就可以在提交申请页面进行申请</h3>
                        <h3>左侧为您的所有申请记录，右侧为提交申请</h3>
                        <img @click="img" src="@/assets/help/7.png" alt="">
                        <h3>申请管理界面介绍</h3>
                        <h3>左侧会显示所有的申请供你操作</h3>
                        <img @click="img" src="@/assets/help/8.png" alt="">
                        <h3>点击 查看详情之后右侧就会显示当前申请的详细内容</h3>
                        <img @click="img" src="@/assets/help/9.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
name:'Help'
</script>

<style lang="scss" scoped>
#about{
    padding: 10px;
    margin:0px;
    background-color: white;
}
.img {
  height: auto;
  max-width: 100%;
}
</style>