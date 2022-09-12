import request from "../utils/request";

export interface LoginData {
    username: string;
    password: string;
}

export function login(data: LoginData) {
    return request({
        method: 'post',
        url: '/users/login',
        data: data,
        mock: true
    })
}