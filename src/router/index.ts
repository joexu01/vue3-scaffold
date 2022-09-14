import {createRouter, createWebHashHistory,} from "vue-router";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: 'login',
            meta: {
                title: '首页',
                requiresAuth: true
            },
            component: () => import('@/components/Home.vue'),
            children: [
                {
                    name: 'welcome',
                    path: '/welcome',
                    meta: {
                        title: '欢迎',
                        requiresAuth: true
                    },
                    component: () => import('@/views/Welcome.vue')
                }
            ]
        },
        {
            name: 'login',
            path: '/login',
            meta: {
                title: '登录',
                requiresAuth: false
            },
            component: () => import('@/views/Login.vue')
        }
    ]
})

export default router;
