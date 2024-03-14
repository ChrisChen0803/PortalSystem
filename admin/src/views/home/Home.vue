<template>
    <div>
        <el-page-header @back="goBack" icon="" title="Enterprise portal management system" content="HOME" />
        <el-card class="box-card">
            1111
        </el-card>
        <el-card class="box-card">
            <el-row>
                <el-col :span="4">
                    <el-avatar :size="100" :src="avatarUrl" />
                </el-col>
                <el-col :span="20">
                    <h3 style="line-height: 100px;">Welcome Back. {{ welcomeText }}.</h3>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>Products</span>
                </div>
            </template>
            <el-carousel v-if="loopList.length" :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in loopList" :key="item._id">
                    <!-- <h3 text="2xl" justify="center">{{ item.title }}</h3> -->
                    <div :style="{backgroundImage:`url(http://localhost:3000${item.cover})`,backgroundSize:'cover'}">
                        <h3 text="2xl" justify="center">{{ item.title }}</h3>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </el-card>
    </div>
</template>

<script setup>
// import axios from 'axios'
// axios.get("/adminapi/user/home").then(res => {
//     console.log(res.data)
// })
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue';
import axios from 'axios'
const store = useStore();
//console.log(store.state)
const avatarUrl = computed(()=>store.state.userInfo.avatar?'http://localhost:3000'+store.state.userInfo.avatar:`https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`)
//console.log(avatarUrl)
const welcomeText = computed(()=>new Date().getHours<12?'Wish you have a good Day':'Please have a coffee')

onMounted(() => {
    getTableData();
})
const loopList = ref([]);
const getTableData = async () => {
    const res = await axios.get(`/adminapi/product/list`)
    loopList.value = res.data.data
    console.log(loopList.value)
}
</script>

<style lang="scss" scoped>
.box-card {
    margin-top: 50px;

}
.el-carousel__item h3 {
  color: white;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>