<script setup="ts">
    import setting from '@/setting.ts'
</script>

<template>
    <div class="logo">
        <img :src="setting.logo" alt="">
        <p>{{setting.title}}</p>
    </div>
</template>

<style scoped lang="scss">
    .logo {
        width: 100%;
        height: 50px;
        color: white;
        display: flex;
        align-items: center;
        padding: 20px;
        img {
            width: 50px;
            height: 50px;
        }
        p{
            font-size: 20px;
        }
    }

</style>