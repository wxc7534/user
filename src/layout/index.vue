
<script setup lang="ts">
    //@ts-nocheck
    import Logo from './logo/index.vue'
    import Menu from './menu/index.vue'
    import useUserStore from '@/store/modules/user.ts'

    let user= useUserStore()
</script>


<template>
    <div class="layout_container">

        <!-- 左侧菜单栏 -->
        <div class="layout_slider">
            <Logo></Logo>

            <!-- 展示菜单 -->
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- 菜单组件 -->
                <el-menu background-color="#001529" text-color="white">
                    <!-- 根据路由生成菜单 -->
                    <Menu :menuList="user.menuRoutes"></Menu>
                </el-menu>
                
            </el-scrollbar>
        </div>
        <div class="layout_tabbar"></div>
        <div class="layout_main">
            <p style="height: 10000000px; background-color: red;"></p>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .layout_container{
        width: 100%;
        height: 100vh;
        color: white;
        // 左侧菜单样式
        .layout_slider{
            width: 260px;
            height: 100vh;
            background: #001529;
            .scrollbar{
                width: 100%;
                height: calc(100vh - 50px);

            }
        }


        // 顶部导航
        .layout_tabbar{
            position: fixed;
            width: calc(100% - 260px);
            height: 50px;
            top: 0;
            left: 260px;
        }


        .layout_main{
            position: absolute;
            width: calc(100% - 260px);
            height: calc(100vh - 50px);
            background: yellow;
            left: 260px;
            top: 50px;
            padding:20px;
            overflow: auto;
        }
    }

    // 滚动条外观设置
    ::-webkit-scrollbar{
        width: 10px;
    }

    ::-webkit-scrollbar-track{
        background: #001529;
    }

    ::-webkit-scrollbar-thumb{
        width: 10px;
        background: yellowgreen;
        border-radius: 10px;
    }

</style>