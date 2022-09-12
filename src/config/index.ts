/**
 * 环境配置封装
 */

const env = import.meta.env.MODE || 'production';

const ConfMap = new Map([
    ['development',
        {
            baseApi:'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api',
            mockApi:'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api'
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