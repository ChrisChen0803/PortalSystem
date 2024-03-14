<template>
    <div>
        <el-card>
            <el-page-header icon="" title="Product Management" content="Product List" />
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="Product Name" width="180" />
                <el-table-column prop="introduction" label="Brief Introduction" width="180" />
                <el-table-column label="Edit Time">
                    <template #default="scope">
                        {{ formatTime.getTime(scope.row.editTime) }}
                    </template>
                </el-table-column>
                <el-table-column label="Actions">
                    <template #default="scope">
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
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import formatTime from '@/util/formatTime'
import { Edit, Delete } from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
const tableData = ref([])
const router = useRouter();
onMounted(() => {
    getTableData();
})
const getTableData = async () => {
    const res = await axios.get(`/adminapi/product/list`)
    console.log(res.data.data)
    tableData.value = res.data.data
}
const handleDelete = async (data) => {
    //console.log(data)
    await axios.delete(`/adminapi/product/list/${data._id}`)
    //reload page, reload data, delete current tabledata
    getTableData();
}
const handleEdit = (item) =>{
    router.push(`/product-management/editproduct/${item._id}`)
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