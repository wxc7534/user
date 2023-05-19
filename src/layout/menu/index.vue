<script setup lang="ts">
import { onMounted} from 'vue'
    const props = defineProps(['menuList'])
    onMounted(() => {
        console.log(props);
    })
</script>
<script lang="ts">
    export default {
    name: 'Menu',
    }
</script>


<template>
    <template v-for="item in menuList" :key="item.path">
        <template v-if="!item.children" >
            <el-menu-item v-if="!item.meta.hidden" index="item.path">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <template v-if="item.children && item.children.length == 1">
            <el-menu-ietm v-if="!item.meta.hidden" :index="item.children[0].path">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-ietm>
        </template>
        <template v-if="item.children && item.children.length > 1">
            <el-sub-menu v-if="!item.meta.hidden" :index="item.path">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
                <Menu :menuList="item.children"></Menu>
            </el-sub-menu>
        </template>
    </template>
</template>

<style scoped>
</style>