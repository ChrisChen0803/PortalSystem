<template>
    <div>
        <vue-particles id="tsparticles" :particlesLoaded="particlesLoaded" :options="options" />
        <div class="formContainer">
            <h3>Enterprise Information Portal Management System</h3>
            <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="loginRules" label-width="80px"
                class="loginform">
                <el-form-item label="Username" prop="username">
                    <el-input v-model="loginForm.username" autocomplete="off" />
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input v-model="loginForm.password" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()">Login</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
    <!-- <button @click="handleLogin">
        Login
    </button> -->
</template>
<script setup>
import {useStore} from 'vuex'
import router from '@/router';
import { reactive,ref } from 'vue';
import axios from 'axios'
import {ElMessage} from 'element-plus'
const store = useStore();
const loginForm = reactive({
    username:"",
    password:""
})

const loginFormRef = ref();

const loginRules = reactive({
    username:[
        {
            required:true, message:"Please enter username", trigger:"blur"
        }
    ],
    password:[
        {
            required:true, message:"Please enter password", trigger:"blur"
        }
    ]
})
const submitForm = ()=>{
    loginFormRef.value.validate((valid)=>{
        if(valid){
            axios.post("/adminapi/user/login",loginForm).then(res=>{
                if(res.data.ActionType==="OK"){
                    store.commit("changeUserInfo",res.data.data)
                    store.commit("changeGetterRouter",false)
                    router.push("/index")
                    //↓ can be done in interceptors
                    //localStorage.setItem("token",loginForm.username);
                }
                else{
                    ElMessage.error('Wrong Username or Password');
                }
            })
        }
    })
}
// localStorage.setItem("token", "chris")
const options = {
    background: {
        color: {
            value: '#2b3c4d'
        }
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: 'push'
            },
            onHover: {
                enable: true,
                mode: 'repulse'
            },
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40
            },
            push: {
                quantity: 4
            },
            repulse: {
                distance: 200,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: '#ffffff'
        },
        links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
        },
        move: {
            direction: 'none',
            enable: true,
            outModes: 'bounce',
            random: false,
            speed: 6,
            straight: false
        },
        number: {
            density: {
                enable: true,
            },
            value: 80
        },
        opacity: {
            value: 0.5
        },
        shape: {
            type: 'circle'
        },
        size: {
            value: { min: 1, max: 5 }
        }
    },
    detectRetina: true
}
</script>
<style lang="scss" scoped>
    .formContainer{
        width: 500px;
        height: 300px;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background-color:rgba($color: #000000, $alpha: 0.5);
        color:white;
        text-align: center;
        padding:20px;
    }
    //deep selection
    ::v-deep .el-form-item__label{
        color:white;
    }
    .loginform{
        margin-top:20px;
    }
    h3{
        font-size:30px;
    }
</style>