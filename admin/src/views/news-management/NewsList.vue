<template>
    <div>
        <el-card>
            <el-page-header icon="" title="News Management" content="News List" />
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="Title" width="180" />
                <el-table-column label="Category">
                    <template #default="scope">
                        {{ categoryFormat(scope.row.category) }}
                    </template>
                </el-table-column>
                <el-table-column label="Edit Time">
                    <template #default="scope">
                        {{ formatTime.getTime(scope.row.editTime) }}
                    </template>
                </el-table-column>
                <el-table-column label="Published">
                    <template #default="scope">
                        <el-switch v-model="scope.row.isPublished" :active-value="1" :inactive-value="0"
                            @change="handleSwitchChange(scope.row)" />
                    </template>
                </el-table-column>
                <el-table-column label="Actions">
                    <template #default="scope">
                        <el-button circle :icon="Star" type="success" @click="handlePreview(scope.row)"></el-button>
                        <el-button circle :icon="Edit" @click="handleEdit(scope.row)"></el-button>
                        <el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button circle :icon="Delete" type="danger"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog v-model="dialogVisible" title="News Prview" width="500">
            <div>
                <h2>{{ previewData.title }}</h2>
                <div style="font-size:12px;color:gray;">{{ formatTime.getTime(previewData.editTime) }}</div>

                <el-divider>
                    <el-icon>
                        <star-filled />
                    </el-icon>
                </el-divider>

                <div v-html="previewData.content" class="htmlcontent"></div>
            </div>
        </el-dialog>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import formatTime from '@/util/formatTime'
import { Star, Edit, Delete, StarFilled } from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
const tableData = ref([])
const previewData = ref([])
const dialogVisible = ref(false);
const router = useRouter();
onMounted(() => {
    getTableData();
})
const getTableData = async () => {
    const res = await axios.get(`/adminapi/news/list`)
    //console.log(res.data.data)
    tableData.value = res.data.data
}
const categoryFormat = (category) => {
    const arr = ["Daily News", "Example", "Annocement"]
    return arr[category - 1]
}
const handleSwitchChange = async (item) => {
    await axios.put(`/adminapi/news/publish`, {
        _id: item._id,
        isPublished: item.isPublished
    })
    getTableData();
}
const handlePreview = (item) => {
    previewData.value = item;
    dialogVisible.value = true;
}
const handleDelete = async (data) => {
    //console.log(data)
    await axios.delete(`/adminapi/news/list/${data._id}`)
    //reload page, reload data, delete current tabledata
    getTableData();
}
const handleEdit = async (item) =>{
    await router.push(`/news-management/editnews/${item._id}`)
}
</script>
<style lang="scss" scoped>
.el-table {
    margin-top: 50px;
}

::v-deep .htmlcontent {
    img {
        max-width: 100%;
    }
}
</style>