<script setup lang="ts">
    import useLayOutSettingStore from '@/store/modules/setting';
    import { ref, nextTick } from 'vue';
    import { storeToRefs } from 'pinia';
    import { watch } from 'vue';
    const setting = useLayOutSettingStore()
    let { refsh } = storeToRefs(setting)
    let flag = ref(true)
    watch(refsh, () => {
        flag.value = false
        
        nextTick(() => {
            flag.value = true
        })
    })
</script>
<script lang="ts">
    export default{
        name: 'Main'
    }
</script>

<template>
    <RouterView v-slot="{Component}">
        <transition name="fade">
            <component :is="Component" v-if="flag"></component>
        </transition>
    </RouterView>

</template>