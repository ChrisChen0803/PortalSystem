<template>
    <div>
        <el-page-header icon="" title="News Management" content="Edit News" @back="handleBack()"/>

        <el-form ref="newsFormRef" :model="newsForm" :rules="newsFormRules" label-width="auto" class="demo-ruleForm"
            status-icon>
            <el-form-item label="Title" prop="title">
                <el-input v-model="newsForm.title" />
            </el-form-item>
            <el-form-item label="Content" prop="content">
                <editor @event="handleChanges" :content="newsForm.content" v-if="showEditor"/>
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
                <el-button type="primary" @click="submitForm()">Update News</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive,onMounted } from 'vue';
import editor from '@/components/editor/Editor.vue'
import upload from '@/util/upload'
import Upload from '@/components/upload/Upload'
import {useRoute,useRouter} from 'vue-router'
import axios from 'axios'
const router = useRouter();
const route = useRoute();
const newsForm = reactive({
    title: "",
    content: "",
    category: 1,//1.Daily News 2.Example 3.Annocement
    cover: "",
    file: null,
    isPublished: 0, //0.not 1.yes

});
const handleBack = ()=>{
    router.back()
}
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
            await upload("/adminapi/news/list",newsForm)
            router.back()
        }
    })
}
const showEditor = ref(false);
onMounted(async ()=>{
    const res = await axios.get(`/adminapi/news/list/${route.params.id}`)
    if (res.data.data.length > 0) {
      Object.assign(newsForm, res.data.data[0]);
      //console.log(res.data.data[0])
      showEditor.value = true; 
    }
})
</script>
<style lang="scss" scoped>
.el-form {
    margin-top: 50px;
}
</style>