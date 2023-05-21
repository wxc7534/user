import { defineStore } from 'pinia'

import { reqLogin } from '@/api/user'
import type { LoginFrom, loginResponseData } from '@/api/user/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_ITEM } from '@/utils/token'
import { constantRoute } from '@/router/router'
import { reqUserInfo } from '@/api/user/index'
import { ref} from 'vue'
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
    //token
    let token = GET_TOKEN()

    //获取路由信息
    let menuRoutes = constantRoute

    let username = ref('')
    let avatar = ref('')

    //用户登录后获取用户信息
    let userInfo = async () => {
    
       let result =  await reqUserInfo()
       
       if(result.code == 200){
            username.value = result.data.checkUser.username
            avatar.value = result.data.checkUser.avatar
       }
       
    }
    //用户退出登录
    let userLogOut = () => {
        username.value = ''
        avatar.value = ''
        REMOVE_ITEM()
    }

    return {
        userLogin,
        menuRoutes,
        userInfo,
        avatar,
        username,
        userLogOut
    }
})

export default useUserStore