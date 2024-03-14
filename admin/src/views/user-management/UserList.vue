<template>
    <div>
        <el-card>
            <el-page-header icon="" title="User Management" content="User List" />
        </el-card>
        <el-card>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="username" label="Username" width="180" />
                <el-table-column label="Avatar" width="180">
                    <template #default="scope">
                        <div v-if="scope.row.avatar"><el-avatar :size="50"
                                :src="'http://localhost:3000' + scope.row.avatar"></el-avatar></div>
                        <div v-else><el-avatar :size="50"
                                :src="`https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`"></el-avatar>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="Role">
                    <template #default="scope">
                        <div v-if="scope.row.role === 1"><el-tag class="ml-2" type="danger">Admin</el-tag></div>
                        <div v-else><el-tag class="ml-3" type="info">Editor</el-tag></div>
                    </template>
                </el-table-column>
                <el-table-column label="Operations">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.row)">Edit</el-button>
                        <el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button size="small" type="danger">Delete</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog v-model="dialogVisible" title="Edit User" width="500">
            <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="auto" class="demo-ruleForm"
                status-icon>
                <el-form-item label="Username" prop="username">
                    <el-input v-model="userForm.username" />
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input v-model="userForm.password" type="password" />
                </el-form-item>
                <el-form-item label="Role" prop="role">
                    <el-select v-model="userForm.role" placeholder="Select" style="width: 100%">
                        <el-option v-for="item in roleOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="Introduction" prop="introduction">
                    <el-input v-model="userForm.introduction" type="textarea" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="handleEditConfirm()">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import { reactive,ref, onMounted } from 'vue'
import axios from 'axios'
const dialogVisible = ref(false)
const userFormRef = ref()
let userForm = reactive({
    username:"",
    password:"",
    role:2,
    introduction:""
})
const userFormRules = reactive({
    username: [
        { required: true, message: 'Please type a username', trigger: 'blur' },
    ],
    password: [
        { required: true, message: 'Please type your password', trigger: 'blur' },
    ],
    role: [
        { required: true, message: 'Please choose your role', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: 'Please type your Introduction', trigger: 'blur' },
    ]
})
const roleOptions = [
    {
        label: "Admin",
        value: 1
    },
    {
        label: "Editor",
        value: 2
    }

]
const tableData = ref([])
onMounted(() => {
    getTableData()
})
const getTableData = async () => {
    const res = await axios.get("/adminapi/user/list")
    //console.log(res.data)
    tableData.value = res.data.data
}
const handleEdit = async (data) => {
    //console.log(data)
    dialogVisible.value = true;
    const res = await axios.get(`/adminapi/user/list/${data._id}`)
    Object.assign(userForm,res.data.data[0])
    dialogVisible.value=true
}
const handleEditConfirm = () =>{
    userFormRef.value.validate(async(valid)=>{
        if(valid){
            //update
            await axios.put(`/adminapi/user/list/${userForm._id}`,userForm)
            //dialogvisible
            dialogVisible.value = false
            //tabledata update
            getTableData()
        }
    })
}
const handleDelete = async (data) => {
    //console.log(data)
    await axios.delete(`/adminapi/user/list/${data._id}`)
    //reload page, reload data, delete current tabledata
    getTableData();
}
</script>
<style lang="scss" scoped>
.el-table {
    margin-top: 50px;
}
</style>