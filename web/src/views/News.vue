<template>
    <div class="container">
        <div class="news-header" :style="{ backgroundImage: `url(${require('@/assets/newsbg.jpg')})` }">
        </div>
        <div class="search">
            <el-popover placement="bottom" title="Result" width="50%" :visible="visible">
                <template #reference>
                    <el-input v-model="searchText" placeholder="What you want to search today" :prefix-icon="Search"
                        type="search" size="large" @input="visible = true" @blur="visible = false" />
                </template>
                <div v-if="searchnewslist.length">
                    <div v-for="data in searchnewslist" :key="data._id" class="search-item" @click="handleChangePage(item._id)">
                        {{ data.title }}
                    </div>
                </div>
                <div v-else>
                    <el-empty description="No News For Now" :image-size="50" />
                </div>
            </el-popover>
        </div>
        <div class="topnews">
            <el-row :gutter="20">
                <el-col :span="6" v-for="item in topnewslist" :key="item._id" @click="handleChangePage(item._id)">
                    <el-card :body-style="{ padding: '0px' }" shadow="hover">
                        <div class="image" :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }">
                        </div>
                        <div style="padding: 14px">
                            <span>{{ item.title }}</span>
                            <div class="bottom">
                                <time class="time">{{ whichTime(item.editTime) }}</time>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <el-tabs style="margin:20px" v-model="whichTab" class="demo-tabs">
            <el-tab-pane v-for="item in tablist" :label="item.label" :name="item.name">
                <el-row :gutter="20">
                    <el-col :span="18">
                        <div v-for="data in tabnews[item.name]" :key="data._id" style="padding:10px"  @click="handleChangePage(data._id)">
                            <el-card :body-style="{ padding: '0px' }" shadow="hover">
                                <div class="tab-image"
                                    :style="{ backgroundImage: `url(http://localhost:3000${data.cover})` }">
                                </div>
                                <div style="padding: 14px;float: left;">
                                    <span>{{ data.title }}</span>
                                    <div class="bottom">
                                        <time class="tab-time">{{ whichTime(data.editTime) }}</time>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <el-timeline style="max-width: 600px">
                            <el-timeline-item v-for="(data, index) in tabnews[item.name]" :key="index"
                                :timestamp="whichTime(data.editTime)">
                                {{ data.title }}
                            </el-timeline-item>
                        </el-timeline>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    <el-backtop :visibility-height="100"/>
    </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import moment from 'moment'
import _ from 'lodash'
import { Search } from '@element-plus/icons-vue'
const searchText = ref([])
const visible = ref(false)
const newslist = ref([])
const router = useRouter()
onMounted(async () => {
    var res = await axios.get("/webapi/news/list")
    console.log(res.data.data)
    newslist.value = res.data.data;
})
const searchnewslist = computed(() => searchText.value ? newslist.value.filter(item => item.title.includes(searchText.value)) : [])
const topnewslist = computed(() => newslist.value.slice(0, 4))
const whichTab = ref(1)
const whichTime = time => {
    return moment(time).format("lll")
}
const tablist = [
    {
        label: "Daily News",
        name: 1
    },
    {
        label: "Examples",
        name: 2
    },
    {
        label: "Annocement",
        name: 3
    }
]

const tabnews = computed(() => _.groupBy(newslist.value, item => item.category))
const handleChangePage = (id) =>{
    router.push(`/news/${id}`)
}
</script>
<style scoped lang="scss">
.container {
    position: relative;
}

.search {
    position: absolute;
    top: 330px;
    width: 100%;
    text-align: center;

    .el-input {
        width: 50%
    }
}

.news-header {
    width: 100%;
    height: 400px;
    background-size: cover;
}

.search-item {
    height: 50px;
    line-height: 50px;

    &:hover {
        background: white;
        color: cornflowerblue;
    }
}

.topnews {
    margin: 20px;

    .image {
        widows: 100%;
        height: 150px;
        background-size: cover;
    }

    .time {
        font-size: 13px;
        color: gray;
    }
}

.tab-image {
    width: 150px;
    height: 150px;
    background-size: cover;
    float: left;
}

.tab-time {
    font-size: 13px;
    color: gray;
}
</style>