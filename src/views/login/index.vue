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


    // 获取el-from
    let loginForms = ref()
    //发送登录请求
    const login = async () => {

        // 对整个表单进行校验
        let a = await loginForms.value.validate()

        //登陆加载开启
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


    // 自定义校验规则函数
    // rule: 即为校验规则对象
        // value: 即为表单元素文本内容
        // 函数： 如果符合条件， callback放行通过即可
        // 如果不符合条件， 调用callback， 注入错误信息提示
    const validatorUserName = (rule,value,callback) => {
        if(value.length >= 6){
            callback()
        }else{
            callback(new Error('账户在6-18'))
        }
    }


    // 定义表单校验需要的配置对象
    const rules = {
        // 规则对象的属性：
        // required, 代表这个字段是必须校验的
        // min: 文本长度最少几位
        // max: 文本长度最大几位
        // message: 错误时的提示信息
        // trigger: 触发校验表单的时机   change->文本发生变化时校验，  blur->失去焦点时触达校验
        username: [
            { validator: validatorUserName,trigger: "change" },
        ],
        password: [
            { required: true, min: 6, max: 18, message: '密码长度在6-18位之间', trigger: 'change' },
        ]
    }
</script>

<template>
    <div class="login_container">
            <el-row>
                <el-col :span="12" :xs="0"></el-col>
                <el-col :span="12" :xs="24">
                    <el-form class="login_form" :model="loginFrom" :rules="rules" ref="loginForms">
                        <h1>Hello</h1>
                        <h2>欢迎来到硅谷甄选</h2>
                        <el-form-item prop="username">
                            <el-input :prefix-icon="User" v-model="loginFrom.username" @keydown.enter="down"></el-input>
                        </el-form-item>
                        <el-form-item  prop="password">
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