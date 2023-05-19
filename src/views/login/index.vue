<script setup="ts">
    import { User, Lock } from '@element-plus/icons-vue'
    import { reactive, ref } from 'vue'
    import useUserStore from '@/store/modules/user.ts'
    import { useRouter } from 'vue-router'
    import { ElNotification } from 'element-plus'
    import { getLoginTime } from '@/utils/loginDate'
    //登陆界面用户  用户名  与密码
    let loginFrom = reactive({username: '', password: ''})

    let $router = useRouter()

    let loading = ref(false)
    //发送登录请求
    const login = async () => {
        loading.value = true
        const store = useUserStore()

        const { userLogin } = store
        
        try {
            await userLogin(loginFrom)

            $router.push('/')

            ElNotification({
                type:'success',
                message: '欢迎回来',
                title: `HI, ${getLoginTime()}`
            })
            // 登陆成功， 加载效果消失
            loading.value = false
        } catch (error) {
            ElNotification({
                type: 'error',
                message: error.message
            })
            // 登录失败， 加载效果消失
            loading.value = false
        }
    }

    //按enter键可以让password框获得焦点
    let pass = ref()
    const down = () => {
        pass.value.focus()
    }
    //按enter登录
    const up = () => {
        login()
    }
</script>

<template>
    <div class="login_container">
            <el-row>
                <el-col :span="12" :xs="0"></el-col>
                <el-col :span="12" :xs="24">
                    <el-form class="login_form">
                        <h1>Hello</h1>
                        <h2>欢迎来到硅谷甄选</h2>
                        <el-form-item>
                            <el-input :prefix-icon="User" v-model="loginFrom.username" @keydown.enter="down"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input type="password" :prefix-icon="Lock" v-model="loginFrom.password" show-password ref="pass"  @keydown.enter="up"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button :loading="loading" type="primary" size="default" class="login-btn" @click="login"> 登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
    </div>
</template>

<style scoped lang="scss">
    .login_container{
        width: 100%;
        height: 100vh;
        background-color: aqua;
        background: url('@/assets/20220328002.jpg') no-repeat;
        background-size: cover;
    }
    .login_form{
        position: relative;
        width: 80%;
        top: 30vh;
        background: url(@/assets/FVpeLRccc1.jpg) no-repeat;
        background-size: cover;
        padding: 40px;
        h1{
            color: white;
            font-size: 40px;
        }
        h2{
            color: white;
            font-size: 20px;
            margin: 20px 0px;
        }
    }
    .login-btn{
        width: 100%;
    }
</style>