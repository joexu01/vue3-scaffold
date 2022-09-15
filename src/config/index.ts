/**
 * 环境配置封装
 */

const env = import.meta.env.MODE || 'production';

const ConfMap = new Map([
    ['development',
        {
            baseApi:'http://127.0.0.1:8880/api',
            mockApi:'http://127.0.0.1:8880/api'
        }],
    ['test',
        {
            baseApi: '',
            mockApi: ''
        }],
    ['production',
        {
            baseApi: '',
            mockApi: ''
        }],
])

export default {
    env,
    mock:false,
    namespace:'manager',
    ...ConfMap.get(env)
}