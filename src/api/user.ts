import request from "../utils/request";
import {UserState} from "@/store/modules/user/types";

export interface LoginData {
    username: string;
    password: string;
}

export interface LoginRespToken {
    token: string;
}

export function login(data: LoginData) {
    return request({
        method: 'post',
        url: '/user-login/login',
        data: data,
        mock: false
    })
}

export function logout() {
    return request({
        method: 'get',
        url: '/user/logout',
        mock: false
    })
}

export function getUserInfo() {
    return request<UserState>({
        method: 'get',
        url: '/user/me',
        mock: false
    })
}