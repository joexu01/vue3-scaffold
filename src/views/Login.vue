<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form ref="loginForm" :model="user" status-icon :rules="rules" v-loading="loading">
        <div class="title">登录</div>

        <el-form-item prop="username">
          <el-input type="text" v-model="user.username" :prefix-icon="UserIcon">

          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input type="password" v-model="user.password" :prefix-icon="Lock">
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button native-type="submit" type="primary" class="btn-login" @click="login(loginForm)">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {shallowRef, reactive, ref} from '@vue/reactivity';
import {useRouter} from 'vue-router';
import {User as UserIcon, Lock} from '@element-plus/icons-vue';

import {useUserStore} from "@/store";
import {ElMessage} from "element-plus";
// import {getToken} from "@/utils/auth.js";

const userStore = useUserStore();

let user = reactive({
  username: "",
  password: ""
})

let rules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ]
}

// const store = useStore()
const router = useRouter();
const loginForm = shallowRef();
const loading = ref(false);

function login(form) {
  form.validate((valid) => {
    if (valid) {
      loading.value = true;

      userStore.login(this.user).then(()=>{
        ElMessage.success('登陆成功')
        router.push('/welcome');
      }).catch((err)=>{
        ElMessage.error('登录失败：'+err)
      }).finally(()=>{
        // console.log(getToken())
        loading.value = false;
      })
    } else {
      return false
    }
  })
}
</script>

<style lang="scss">
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9fcff;
  width: 100vw;
  height: 100vh;

  .modal {
    width: 500px;
    padding: 50px;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0 0 10px 3px #c7c9cb4d;

    .title {
      font-size: 35px;
      line-height: 1.2;
      text-align: center;
      margin-bottom: 30px;
    }

    .btn-login {
      width: 100%;
    }
  }
}
</style>
