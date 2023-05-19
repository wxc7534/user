//@ts-nocheck
export const constantRoute = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login'
    },
    {
        path: '/',
        component: () => import('@/views/home/index.vue'),
        name: 'home'
    },
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404'
    },
    //当没有与其他路由进行配对时匹配此路由, 匹配任意路由
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any'
    }
] 