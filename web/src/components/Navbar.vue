
<template>
    <div class="navbar">
        <el-menu
            :default-active="route.fullPath"
            class="el-menu-demo"
            mode="horizontal"
            :router = "true"
        >
            <el-menu-item index="/">MainPage</el-menu-item>
            <el-menu-item index="/news">News Center</el-menu-item>
            <el-menu-item index="/product">Products and Services</el-menu-item>
            <el-menu-item index="" @click="handleClick">Login</el-menu-item>
        </el-menu>
        <div class="right">Portal Offical Website</div>
    </div>
</template>
<script setup>
import {useRoute} from 'vue-router'
const route = useRoute()

const handleClick = ()=>{
    window.location = "http://localhost:8080"
}
</script>
<style scoped lang="scss">
.navbar{
    position: sticky;
    top:0px;
    z-index:1000;
}

.right{
    position: fixed;
    top:0;
    right: 20px;
    widows: 100px;
    height: 59px;
    line-height: 59px;
    text-align: center;
}
</style>
