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
            token.value = result.data.token as string
           SET_TOKEN(result.data.token!)
            return 'ok'
        }else{
            return Promise.reject(new Error(result.data.message))
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
    
       let result =  await reqUserInfo()
       
       if(result.code == 200){
            username.value = result.data.checkUser.username
            avatar.value = result.data.checkUser.avatar
            return '您已经登陆'
       }else{
            return Promise.reject('用户登陆失败')
       }
       
    }
    //用户退出登录
    let userLogOut = () => {
        username.value = ''
        avatar.value = ''
        REMOVE_ITEM()
        token.value = ''
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