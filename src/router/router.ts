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
            title: '',
            hidden: false,
            icon: ''

        },
        redirect: '/home',
        children:[
            {
                path:'/home',
                component: () => import('@/views/home/index.vue'),
                meta:{
                    title:'首页',
                    hidden: false,
                    icon: 'HomeFilled'

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
    },
    //数据大屏路由
    {
        path: '/screen',
        component: () => import('@/views/screen/index.vue'),
        name: 'Screen',
        meta: {
            hidden: false,
            title: '数据大屏',
            icon: 'Platform'
        }
    },
    //权限管理路由
    {
        path: '/acl',
        component: () => import('@/layout/index.vue'),
        name: 'Acl',
        meta:{
            hidden: false,
            title: '权限管理',
            icon: 'Lock'
        },
        redirect: '/acl/user',
        //@ts-nocheck
        children: [
            {
                path: '/acl/user',
                component: () => import('@/views/acl/User/index.vue'),
                name: 'User',
                meta:{
                    hidden: false,
                    title: '用户管理',
                    icon: 'User'
                }
            },
            {
                path: '/acl/role',
                component: () => import('@/views/acl/role/index.vue'),
                name: 'role',
                meta: {
                    hidden: false,
                    title: '角色管理',
                    icon: 'UserFilled'
                }
            },
            {
                path: '/acl/premission',
                component: () => import('@/views/acl/premission/index.vue'),
                name: 'premission',
                meta: {
                    hidden: false,
                    title: '菜单管理',
                    icon: 'Monitor'
                }
            }
        ]
    },

    // 商品路由
    {
        path: '/product',
        component: () => import('@/layout/index.vue'),
        name: 'product',
        meta: {
            hidden: false,
            title: '商品管理',
            icon: 'Goods'
        },
        redirect: '/product/trademark',
        children: [
            {
                path: '/product/trademark',
                component: () => import('@/views/product/trademark/index.vue'),
                name: 'Trademark',
                meta: {
                    hidden: false,
                    title: '品牌管理',
                    icon: 'ShoppingCartFull'
                }
            },
            {
                path: '/product/attr',
                component: () => import('@/views/product/attr/index.vue'),
                name: 'Attr',
                meta: {
                    hidden: false,
                    title: '属性管理',
                    icon: 'ChromeFilled'
                }
            },
            {
                path: '/product/spu',
                component: () => import('@/views/product/spu/index.vue'),
                name: 'Spu',
                meta: {
                    hidden: false,
                    title: 'SPU管理',
                    icon: 'Calendar'
                }
            },
            {
                path: '/product/sku',
                component: () => import('@/views/product/sku/index.vue'),
                name: 'Sku',
                meta: {
                    hidden: false,
                    title: 'SKU管理',
                    icon: 'Calendar'
                }
            }
        ]
    }
] 