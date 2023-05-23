//路由鉴权  

import router from "./router";
import useUserStore from "./store/modules/user";
import { storeToRefs } from "pinia";
import setting from './setting'
// 组件外部想使用小仓库的数据， 必须先注册大仓库
import pinia from './store'
const userStore = useUserStore(pinia)
let { token } = storeToRefs(userStore) 

// 进度样式包引入
//@ts-ignore
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
nprogress.configure({showSpinner: false})
// 全局守卫：项目当中任意路由切换都会触发的钩子

// 全局前置守卫
router.beforeEach(async(to: any, from: any, next: any) => {
    // 进度条开始
    document.title = `${setting.title} - ${to.meta.title}`
    nprogress.start();
    // 获取登录的用户的信息进行渲染
    const userin = useUserStore()
    const { username } = storeToRefs(userin)
    const { userInfo, userLogOut } = userin

    if(token.value){
        
        if(to.path == '/login'){
            next({path: '/'})
        }else{
            if(username.value){
                next()
            }else{
                try{
                    await userInfo()    
                    
                    next()
                }catch(error){
                    await userLogOut()
                    next({path: '/login'})
                }
            }
        }
    }else{
        if(to.path == '/login'){
            next()
        }else{            
            next({path: '/login', query: {redirect: to.path}})
        }
    }
})


// 全局后置守卫
router.afterEach((to: any, from: any) => {
    // 进度条关闭
    nprogress.done();
})