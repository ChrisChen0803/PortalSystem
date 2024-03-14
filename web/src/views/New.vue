<template>
    <el-row>
        <el-col :span="17" :offset="1">
            <div>
                <h2>{{ currentNews.title }}</h2>
            </div>
            <div class="time">
                {{ whichTime(currentNews.editTime) }}
            </div>
            <el-divider>
                <el-icon><star-filled /></el-icon>
            </el-divider>
            <div v-html="currentNews.content"></div>
        </el-col>
        <el-col :span="4" :offset="1" :pull="1">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span style="font-size:16px;font-weight:bold">Recent News</span>

                    </div>
                </template>
                <div v-for="item in topNews" :key="item._id" class="text item" style="padding:14px;cursor: pointer;"
                    @click="handleChange(item._id)">
                    <span>{{ item.title }}</span>
                    <div class="bottom">
                        <time class="time">{{ whichTime(item.editTime) }}</time>

                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
<script setup>
import { watchEffect, ref, onBeforeUnmount } from 'vue'
import axios from 'axios'
import moment from 'moment'
import { useRoute, useRouter } from 'vue-router'
import { StarFilled } from '@element-plus/icons-vue'
const route = useRoute()
const router = useRouter();
const currentNews = ref({})
const topNews = ref([]);
const stop  =watchEffect(async () => {
    if(!route.params.id) return 
    var res1 = await axios.get(`/webapi/news/list/${route.params.id}`)
    const res2 = await axios.get(`/webapi/news/toplist?limit=4`);
    currentNews.value = res1.data.data[0];
    topNews.value = res2.data.data;
})
onBeforeUnmount(()=>{
    //console.log(222,"onBeforeUnmount")
    stop()
})
const handleChange = (id) => {
    // console.log(id)
    router.push(`/news/${id}`)
}
const whichTime = time => {
    return moment(time).format("lll")
}
</script>
<style lang="scss">
.el-row {
    margin-top: 30px;
}

.time {
    font-size: 13px;
    color: gray;
}
</style>