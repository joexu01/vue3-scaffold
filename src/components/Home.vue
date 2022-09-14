<template>
  <div class="basic-layout">
    <div :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
      <!-- Logo & Title -->
      <div class="logo">
        <img src="../assets/vue.svg" alt="">
        <span>Management</span>
      </div>
      <!-- 左侧导航菜单 -->
      <el-menu
          default-active="2"
          class="nav-menu"
          background-color="#001529"
          text-color="#fff"
          router
          :collapse="isCollapse"
          @open=""
          @close=""
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <location/>
            </el-icon>
            <span v-if="!isCollapse">系统管理</span>
          </template>

          <el-menu-item index="1-1">用户管理</el-menu-item>
          <el-menu-item index="1-2">菜单管理</el-menu-item>

        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <location/>
            </el-icon>
            <span>审批管理</span>
          </template>

          <el-menu-item index="2-1">休假管理</el-menu-item>
          <el-menu-item index="2-2">审批管理</el-menu-item>

        </el-sub-menu>
      </el-menu>
    </div>

    <div :class="['content-right', isCollapse?'fold':'unfold']">
      <div class="nav-top">
        <div class="nav-top-left">
          <div class="menu-fold" @click="toggle">
            <el-icon>
              <Fold/>
            </el-icon>
          </div>
          <div class="bread">面包屑</div>
        </div>
        <div class="user-info">

          <el-badge :is-dot="true" class="notice" type="primary">
            <el-icon>
              <Bell/>
            </el-icon>
          </el-badge>

          <el-dropdown @command="handleCommand" class="user-link">
            <span>
              用户-{{ userInfo.username }}
              <el-icon>
              <ArrowDown/>
            </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email">邮箱：{{ userInfo.email }}</el-dropdown-item>
                <el-dropdown-item command="logout">退出账号</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

        </div>
      </div>

      <div class="wrapper">
        <div class="main-page">
          <router-view></router-view>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {Location, Fold, Bell, ArrowDown} from "@element-plus/icons-vue";
import {reactive, ref} from "@vue/reactivity";

const userInfo = reactive({
  username: 'joexu01',
  email: 'joexu01@yahoo.com'
})

let isCollapse = ref<boolean>(false)

function handleCommand(key: string) {

}

function toggle() {
  isCollapse.value = !isCollapse.value
}

</script>

<style lang="scss">
.nav-menu {
  border: none !important;
  height: calc(100vh - 50px);
}

.basic-layout {
  position: relative;

  .nav-side {
    position: fixed;
    width: 205px;
    height: 100vh;
    background-color: #001529;
    color: #ffffff;
    overflow-y: auto; // 自动滚动条
    overflow-x: hidden;
    transition: width .5s; // 过渡效果，当宽度发生变化时

    .logo {
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 50px;

      img {
        width: 32px;
        height: 32px;
        margin: 0 16px;
      }
    }

    // 合并状态
    &.fold {
      width: 64px;
    }

    // 展开状态
    &.unfold {
      width: 205px;
    }
  }

  .content-right {
    margin-left: 205px;

    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between; // 控制两端对齐
      border-bottom: 1px solid #ddd;
      padding: 0 20px;

      .nav-top-left {
        display: flex;
        align-items: center;
        //vertical-align: center;

        .menu-fold {
          margin-right: 16px;
          font-size: 18px;
          cursor: pointer;
        }
      }

      .user-info {
        .notice {
          line-height: 30px;
          margin-right: 15px;
          cursor: pointer;
        }

        .user-link {
          cursor: pointer;
          margin-top: 16px;
          color: var(--el-color-primary);
        }
      }
    }

    .wrapper {
      background: #eef0f3;
      padding: 20px;
      height: calc(100vh - 50px);

      .main-page {
        background: #ffffff;
        height: 100%;
      }
    }

    &.fold {
      margin-left: 64px;
    }

    &.unfold {
      margin-left: 205px;
    }
  }
}
</style>

<!--怎么做左右布局？左侧固定，右侧自适应-->