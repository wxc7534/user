import { defineStore } from 'pinia'

import { reqLogin } from '@/api/user'
import type { loginFromData, loginResponseData, userInfoResponseData } from '@/api/user/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_ITEM } from '@/utils/token'
import { constantRoute } from '@/router/router'
import { reqUserInfo, reqLogout } from '@/api/user/index'
import { ref} from 'vue'
//路由类型
import type { RouteRecordRaw } from 'vue-router'
const useUserStore = defineStore('user', () => {
    // 用户登陆方法
    async function userLogin(data: loginFromData){
        let result: loginResponseData = await reqLogin(data)
        
        if(result.code == 200){
            token.value = result.data as string
           SET_TOKEN(result.data!)
            return 'ok'
        }else{
            return Promise.reject(new Error(result.data))
        }
    }
    //token
    let token = ref(GET_TOKEN())

    //获取路由信息
    let menuRoutes = constantRoute

    let username = ref('')
    let avatar = ref('')

    //用户登录后获取用户信息
    let userInfo = async () => {
    
       let result: userInfoResponseData =  await reqUserInfo()
       
       if(result.code == 200){
            username.value = result.data.name
            avatar.value = result.data.avatar
            return '您已经登陆'
       }else{
            return Promise.reject(new Error(result.message))
       }
       
    }
    //用户退出登录
    let userLogOut = async () => {
        let result: any = await reqLogout()
        if(result.code == 200 )
        {
            username.value = ''
            avatar.value = ''
            REMOVE_ITEM()
            token.value = ''
        }else{
            return Promise.reject(new Error(result.message))
        }
    }

    return {
        userLogin,
        menuRoutes,
        userInfo,
        avatar,
        username,
        userLogOut,
        token
    }
})

export default useUserStore