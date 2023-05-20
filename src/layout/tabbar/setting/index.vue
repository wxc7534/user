<script setup lang="ts">
    import useLayOutSettingStore from '@/store/modules/setting';
import { storeToRefs } from 'pinia';
    import { useRoute } from 'vue-router';
    const setting  = useLayOutSettingStore()
    const { refsh } = storeToRefs(setting)

    const updata = () => {
        refsh.value = !refsh.value
    }

    const fullScreen = () => {

        // DOM对象的一个属性， 可以用来判断当前是不是全屏
        let full = document.fullscreenElement    
        if( !full ){
            document.documentElement.requestFullscreen()
        }else{
            document.exitFullscreen()
        }
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
    <img src="../../../../public/AI改图-images-161x128.png" style="width: 32px; height: 32px;">
    <el-dropdown>
            <span class="el-dropdown-link">
                admin
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
     </el-dropdown>
</template>

<style>

</style>