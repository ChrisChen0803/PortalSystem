<template>
    <div>
        <el-page-header icon="" @back="handleBack()" title="Product Management" content="Edit Product" />
        <el-form ref="productFormRef" :model="productForm" :rules="productFormRules" label-width="auto"
            class="demo-ruleForm" status-icon>
            <el-form-item label="Product Name" prop="title">
                <el-input v-model="productForm.title" />
            </el-form-item>
            <el-form-item label="Brief Introduction" prop="introduction">
                <el-input v-model="productForm.introduction" type="textarea" />
            </el-form-item>
            <el-form-item label="Details" prop="detail">
                <el-input v-model="productForm.detail" type="textarea" />
            </el-form-item>
            <el-form-item label="Product Image" prop="cover">
                <Upload :avatar="productForm.cover" @kerwinchange="handleChange" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">Edit Product</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import Upload from "@/components/upload/Upload";
import upload from '@/util/upload'
import {useRoute,useRouter} from 'vue-router'
import axios from 'axios'
const route = useRoute();
const productFormRef = ref();
const productForm = reactive({
    title: "",
    introduction: "",
    detail: "",
    cover: "",
    file: null,
});

const productFormRules = reactive({
    title: [{ required: true, message: "Please enter name", trigger: "blur" }],
    introduction: [{ required: true, message: "Please enter brief intro", trigger: "blur" }],
    detail: [{ required: true, message: "Please add details", trigger: "blur" }],
    cover: [{ required: true, message: "Please upload product image", trigger: "blur" }]
});
const handleBack = ()=>{
    router.back()
}

const handleChange = file => {
    productForm.cover = URL.createObjectURL(file);
    productForm.file = file;
};
const router = useRouter()
const submitForm = () => {
    productFormRef.value.validate(async (valid) => {
        if (valid) {
            await upload("/adminapi/product/list", productForm)
            router.push(`/product-management/productlist`)
        }
    })
}
onMounted(()=>{
    getData()
})
const getData = async() =>{
    const res = await axios.get(`/adminapi/product/list/${route.params.id}`)
    Object.assign(productForm, res.data.data[0]);
}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
    margin-top: 50px;
}
</style>
