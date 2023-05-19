import { defineStore } from 'pinia'

import { reqLogin } from '@/api/user'
import type { LoginFrom, loginResponseData } from '@/api/user/type'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
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

    return {
        userLogin
    }
})

export default useUserStore