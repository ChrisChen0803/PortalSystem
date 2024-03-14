<template>
    <el-header>
        <div class="left">
            <el-icon @click="handleCollapsed">
                <Menu />
            </el-icon>
            <span style="margin-left: 10px;">Enterprise portal management system</span>
        </div>
        <div class="right">
            <span>Welcome Back {{ $store.state.userInfo.username }}.</span>
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-icon :size="20" color="white"><User /></el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="handleCenter">Personal Center</el-dropdown-item>
                        <el-dropdown-item @click="handleLogout">Logged Out</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>
<script setup>
import { useStore } from 'vuex'
import {useRouter} from 'vue-router'
import { Menu,User } from '@element-plus/icons-vue'

const store = useStore()
const router = useRouter()
const handleCollapsed = () => {
    store.commit("changeCollapsed")
}
const handleCenter = () =>{
    router.push("/center");
}
const handleLogout = () =>{
    localStorage.removeItem("token");
    store.commit("clearUserInfo")
    router.push("/login");
}
</script>
<style lang="scss" scoped>
    .el-header{
        background-color: #2d3a4b;
        color:white;
        width:100%;
        height:60px;
        line-height: 60px;
        display:flex;
        justify-content: space-between;
        align-items: center;
    }
    .left,.right{
        display: flex;
    }
    .left{
        i{
            margin:auto;
            cursor: pointer;
        }
    }
    .right{
        .el-dropdown{
            margin:auto;
        }
    }
</style>