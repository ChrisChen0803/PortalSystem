<template>
    <div>
        <el-page-header icon="" title="Enterprise portal management system" content="Personal Center" />
        <el-row :gutter="40" class="el-row">
            <el-col :span="8">
                <el-card class="box-card">
                    <el-avatar :size="100" :src="avatarUrl" />
                    <h3>{{ store.state.userInfo.username }}</h3>
                    <h5>{{ store.state.userInfo.role === 1 ? 'Administrator' : 'Editor' }}</h5>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span>Personal Information</span>
                        </div>
                    </template>
                    <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="auto"
                        class="demo-ruleForm" status-icon>
                        <el-form-item label="Username" prop="username">
                            <el-input v-model="userForm.username" />
                        </el-form-item>
                        <el-form-item label="Gender" prop="gender">
                            <el-select v-model="userForm.gender" placeholder="Select" style="width: 100%">
                                <el-option v-for="item in genderOptions" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Introduction" prop="introduction">
                            <el-input v-model="userForm.introduction" type="textarea" />
                        </el-form-item>
                        <el-form-item
                            label="avatar"
                            prop="avatar"
                        >
                           <Upload :avatar="userForm.avatar" @kerwinchange="handleChange"/>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm()">Update</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import axios from 'axios'
import { computed, ref, reactive } from 'vue';
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import upload from '@/util/upload'
import Upload from '@/components/upload/Upload'
const store = useStore();
const avatarUrl = computed(() => store.state.userInfo.avatar ? 'http://localhost:3000'+store.state.userInfo.avatar : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`)
const { username, gender, introduction, avatar } = store.state.userInfo
const userFormRef = ref()
const userForm = reactive({
    username,
    gender,
    introduction,
    avatar,
    file:null
})
const userFormRules = reactive({
    username: [
        { required: true, message: 'Please input Activity name', trigger: 'blur' },
    ],
    gender: [
        { required: true, message: 'Please choose your Gender', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: 'Please input Introduction', trigger: 'blur' },
    ],
    avatar: [
        { required: true, message: 'Please upload an avatar', trigger: 'blur' },
    ],
})
const genderOptions = [
    {
        label: "Secret",
        value: 0
    },
    {
        label: "Male",
        value: 1
    },
    {
        label: "Female",
        value: 2
    }

]
//After selecting pics
const handleChange = (file) => {
    //console.log(file.raw)
    userForm.avatar = URL.createObjectURL(file)
    userForm.file = file
}

const submitForm = ()=>{
    userFormRef.value.validate(async (valid)=>{
        if(valid){
            const res = await upload("/adminapi/user/upload",userForm);
            if(res.data.ActionType==="OK"){
                    store.commit("changeUserInfo",res.data.data)
                    ElMessage.success("Successfully Update")
            }
        }
    })
}
</script>

<style scoped lang="scss">
.el-row {
    margin-top: 20px;

    .box-card {
        text-align: center;
    }
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