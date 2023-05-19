import { defineStore } from 'pinia'

import { reqLogin } from '@/api/user'
import type { LoginFrom } from '@/api/user/type'

const useUserStore = defineStore('user', () => {
    // 用户登陆方法
    async function userLogin(data: LoginFrom){
        let result: any = await reqLogin(data)
        
        if(result.code == 200){
            localStorage.setItem('TOKEN', result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error(result.data.message))
        }
    }
    let token = localStorage.getItem('TOKEN')

    return {
        userLogin
    }
})

export default useUserStore