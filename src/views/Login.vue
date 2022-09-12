<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form ref="loginForm" :model="user" status-icon :rules="rules">
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
import {shallowRef, reactive} from '@vue/reactivity'
import {useRouter} from 'vue-router'
import {login as userLogin} from '../api/user'
import {User as UserIcon, Lock} from '@element-plus/icons-vue'

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

function login(form) {
  form.validate((valid) => {
    if (valid) {
      userLogin(user).then((resp) => {
        // store.commit('saveUserInfo', resp)
        console.log(resp)
        router.push('/welcome')
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
