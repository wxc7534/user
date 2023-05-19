//@ts-nocheck
export const constantRoute = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
        meta:{
            title: '登录',
            hidden: true,
            icon: 'Promotion'
        }
    },
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'home',
        meta: {
            title: '首页',
            hidden: false,
            icon: 'HomeFilled'

        },
        children:[
            {
                path:'/guanli',
                meta:{
                    title:'管理',
                    hidden: false,
                    icon: 'Management'

                }
            },
            {
                path: 'goods',
                meta:{
                    title: '商品',
                    hidden: false,
                    icon: 'Goods'
                }
            }
        ]
    },
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: {
            title: '404',
            hidden: true
        }
    },
    //当没有与其他路由进行配对时匹配此路由, 匹配任意路由
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',
        meta: {
            title: '任意路由',
            hidden: true
        }
    }
] 