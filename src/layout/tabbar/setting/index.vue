<script setup lang="ts">
    import useLayOutSettingStore from '@/store/modules/setting';
    import { storeToRefs } from 'pinia';
    import { useRouter, useRoute } from 'vue-router';
    import { onMounted } from 'vue';
    import useUserStore from '@/store/modules/user'
    const setting  = useLayOutSettingStore()
    const { refsh } = storeToRefs(setting)

    let $router = useRouter()
    let $route = useRoute()
    //刷新功能
    const updata = () => {
        refsh.value = !refsh.value
    }

    // 全屏功能设置
    const fullScreen = () => {

        // DOM对象的一个属性， 可以用来判断当前是不是全屏
        let full = document.fullscreenElement    
        if( !full ){
            document.documentElement.requestFullscreen()
        }else{
            document.exitFullscreen()
        }
    }
    // 获取登录的用户的信息进行渲染
        const userin = useUserStore()
        const { username, avatar } = storeToRefs(userin)
        const { userLogOut } = userin

    //用户退出登录
    const logout = () => {
        userLogOut()
        $router.push({path: '/login', query: {redirect: $route.path}})
    }
</script>
<script lang="ts">
export default{
    name: 'Setting'
}

</script>


<template>
    <el-button icon="RefreshRight" circle="true" @click="updata"></el-button>
    <el-button icon="FullScreen" circle="true" @click="fullScreen"></el-button>
    <el-button icon="Setting" circle="true"></el-button>
    <img :src="avatar || '../../../../public/AI改图-images-161x128.png'" style="width: 32px; height: 32px; border-radius: 50%;">
    <el-dropdown>
            <span class="el-dropdown-link">
                {{username}}
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
     </el-dropdown>
</template>

<style>

</style>