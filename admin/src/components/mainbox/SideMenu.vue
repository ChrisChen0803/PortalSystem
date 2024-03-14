<template>
    <el-aside width="$store.state.isCollapsed?'64px':'240px'">
        <el-menu :collapse="$store.state.isCollapsed"
        :router="true"
        :default-active="route.fullPath">
            <el-menu-item index="/index">
                <el-icon><HomeFilled /></el-icon>
                <span>Main Page</span>
            </el-menu-item>
            <el-menu-item index="/center">
                <el-icon><Avatar /></el-icon>
                <span>Personal Center</span>
            </el-menu-item>


            <el-sub-menu index="/user-management" v-admin>
                <template #title>
                    <el-icon>
                        <user-filled />
                    </el-icon>
                    <span>User Management</span>
                </template>
                <el-menu-item index="/user-management/adduser">Add User</el-menu-item>
                <el-menu-item index="/user-management/userlist">User List</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="/news-management">
                <template #title>
                    <el-icon>
                        <MessageBox />
                    </el-icon>
                    <span>News Management</span>
                </template>
                <el-menu-item index="/news-management/addnews">Add News</el-menu-item>
                <el-menu-item index="/news-management/newslist">News List</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="/product-management">
                <template #title>
                    <el-icon>
                        <reading />
                    </el-icon>
                    <span>Product Management</span>
                </template>
                <el-menu-item index="/product-management/addproduct">Add Product</el-menu-item>
                <el-menu-item index="/product-management/productlist">Product List</el-menu-item>
            </el-sub-menu>
        </el-menu>
    </el-aside>
</template>
<script setup>
    import {HomeFilled,Avatar,UserFilled,MessageBox,Reading,Pointer} from '@element-plus/icons-vue'
    import {useRoute} from 'vue-router'
    import {useStore} from 'vuex'
    const store = useStore();
    const route = useRoute();
    const vAdmin = {
        mounted(el){
            //console.log(el)
            if(store.state.userInfo.role!==1){
                el.parentNode.removeChild(el)
            }
        }
    }
</script>
<style lang="scss" scoped>
.el-aside {
    height: 100vh;
    .el-menu{
        height: 100vh;
    }
}
</style>