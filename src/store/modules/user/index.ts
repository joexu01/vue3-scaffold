import {defineStore} from 'pinia';
import {UserState} from "./types";
import {
    login as userLogin,
    logout as userLogout,
    getUserInfo,
    LoginData
} from "@/api/user";
import {clearToken, setToken} from "@/utils/auth";

const useUserStore = defineStore('user', {
    state: (): UserState => ({
        id: undefined,
        username: undefined,
        email: undefined,
        introduction: undefined,
        createdAt: undefined,
        role: ''
    }),

    getters: {
        userInfo(state: UserState): UserState {
            return {...state};
        },
    },

    actions: {
        setInfo(partial: Partial<UserState>) {
            this.$patch(partial);
        },

        resetInfo() {
            this.$reset();
        },

        async info() {
            const res = await getUserInfo();
            this.setInfo(res.data.data);
        },

        async login(data: LoginData) {
            try {
                const resp = await userLogin(data);
                console.log(resp);
                setToken(resp.data.data.token);
            } catch (err) {
                clearToken();
                throw err;
            }
        },

        logoutCallBack() {
            this.resetInfo();
            clearToken();
        },

        async logout() {
            try {
                await userLogout();
            } finally {
                this.logoutCallBack();
            }
        },
    }
})

export default useUserStore;
