<template>
    <div>
        <el-page-header icon="" title="News Management" content="Write News" />

        <el-form ref="newsFormRef" :model="newsForm" :rules="newsFormRules" label-width="auto" class="demo-ruleForm"
            status-icon>
            <el-form-item label="Title" prop="title">
                <el-input v-model="newsForm.title" />
            </el-form-item>
            <el-form-item label="Content" prop="content">
                <editor @event="handleChanges" />
            </el-form-item>
            <el-form-item label="Category" prop="category">
                <el-select v-model="newsForm.category" placeholder="Select" style="width: 100%">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="Cover" prop="cover">
                <Upload :avatar="newsForm.cover" @kerwinchange="handleChange" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">Add News</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
import editor from '@/components/editor/Editor.vue'
import upload from '@/util/upload'
import Upload from '@/components/upload/Upload'
import {useRouter} from 'vue-router'
const router = useRouter();
const newsForm = reactive({
    title: "",
    content: "",
    category: 1,//1.Daily News 2.Example 3.Annocement
    cover: "",
    file: null,
    isPublished: 0, //0.not 1.yes

});
const newsFormRules = reactive({
    title: [
        { required: true, message: "Please enter title", trigger: "blur" }
    ],
    content: [
        { required: true, message: "Please enter content", trigger: "blur" }
    ],
    category: [
        { required: true, message: "Please choose category", trigger: "blur" }
    ],
    cover: [
        { required: true, message: "Please upload cover", trigger: "blur" }
    ],
})
const newsFormRef = ref();
const handleChanges = (data) => {
    newsForm.content = data;
}
const options = [
    {
        label: "Daily News",
        value: 1
    },
    {
        label: "Example",
        value: 2
    },
    {
        label: "Annocement",
        value: 3
    },
]
const handleChange = (file) => {
    newsForm.cover = URL.createObjectURL(file)
    newsForm.file = file
}
const submitForm = ()=>{
    newsFormRef.value.validate(async (valid)=>{
        if(valid){
            await upload("/adminapi/news/add",newsForm)
            router.push(`/news-management/newslist`)
        }
    })
}
</script>
<style lang="scss" scoped>
.el-form {
    margin-top: 50px;
}
</style>