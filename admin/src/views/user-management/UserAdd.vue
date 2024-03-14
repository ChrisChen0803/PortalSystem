<template>
    <div>
        <el-page-header icon="" title="User Management" content="Add User" />
        <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="auto"
                        class="demo-ruleForm" status-icon>
                        <el-form-item label="Username" prop="username">
                            <el-input v-model="userForm.username" />
                        </el-form-item>
                        <el-form-item label="Password" prop="password">
                            <el-input v-model="userForm.password" type="password"/>
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
                        <el-form-item label="Avatar" prop="avatar">
                            <el-upload class="avatar-uploader"
                                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                                :show-file-list="false" :auto-upload="false" :on-change="handleChange">
                                <img v-if="userForm.avatar" :src="'http://localhost:3000'+userForm.avatar" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon">
                                    <Plus />
                                </el-icon>
                            </el-upload>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm()">Add User</el-button>
                        </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import{ref,reactive} from 'vue'
import { Plus } from '@element-plus/icons-vue'
import upload from '@/util/upload'
import {useRouter} from 'vue-router'
const userFormRef = ref()
let userForm = reactive({
    username:"",
    password:"",
    role:2,
    introduction:"",
    avatar:"",
    file:null,
    gender:0
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
    ],
    avatar: [
        { required: true, message: 'Please upload an avatar', trigger: 'blur' },
    ],
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
const handleChange = (file) => {
    //console.log(file.raw)
    userForm.avatar = URL.createObjectURL(file.raw)
    userForm.file = file.raw
}
const router = useRouter();
const submitForm = ()=>{
    userFormRef.value.validate(async (valid)=>{
        if(valid){
            await upload("/adminapi/user/add",userForm)
            router.push(`/user-management/userlist`)
        }
    })
}
</script>
<style lang="scss" scoped>
.demo-ruleForm{
    margin-top: 50px;
}
::v-deep .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.avatar {
    width: 178px;
    height: 178px;
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>