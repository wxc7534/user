import { defineStore } from 'pinia'

import { reqLogin } from '@/api/user'
import type { LoginFrom, loginResponseData } from '@/api/user/type'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
import { constantRoute } from '@/router/router'

//路由类型
import type { RouteRecordRaw } from 'vue-router'
const useUserStore = defineStore('user', () => {
    // 用户登陆方法
    async function userLogin(data: LoginFrom){
        let result: loginResponseData = await reqLogin(data)
        
        if(result.code == 200){
            token = result.data.token as string
           SET_TOKEN(result.data.token!)
            return 'ok'
        }else{
            return Promise.reject(new Error(result.data.message))
        }
    }
    let token = GET_TOKEN()

    let menuRoutes: RouteRecordRaw[] = constantRoute as RouteRecordRaw[]

    return {
        userLogin,
        menuRoutes
    }
})

export default useUserStore