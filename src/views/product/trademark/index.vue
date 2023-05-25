<script setup lang="ts">
    import { ref, onMounted, reactive, watchEffect, nextTick } from 'vue'
    import { reqHasTrademark, reqAddOrUpdataTrademark, DeleteTrademark } from '@/api/product/trademark'
    import type { Records, TrademarkResponseData, TradeMark } from '@/api/product/trademark/type' 
    //@ts-ignore
    import type { UploadProps } from 'element-plus'
    //@ts-ignore
    import { ElMessage } from 'element-plus';
    // 当前页码
    let pageNO = ref<number>(1)
    // 每页显示数据个数
    let limit = ref<number>(3)
    // 已有品牌的数量
    let total = ref<number>(0)
    // 存储已有品牌的数据
    let trademark = ref<Records>()
    //控制对话框的显示与隐藏
    let dialogFormVisible = ref<boolean>(false)
    //定义收集新增商品数据
    let trademarkParams = reactive<TradeMark>({
        tmName: '',
        logoUrl: ''
    })
    //获取表单元素
    let formRef = ref()
    // 获取已有品牌的接口封装成一个函数
    const getHasTrademark = async () => {
        let result: TrademarkResponseData = await reqHasTrademark(pageNO.value, limit.value)
        
        if( result.code == 200 ){
            total.value = result.data.total
            trademark.value = result.data.records
        }
    }
    // 添加新的商品
    const addTradeMark = (row: TradeMark) => {
        //清理上次表单残留提醒
        // formRef.value?.clearValidate(['logoUrl', 'tmName'])
        nextTick(() => {
            formRef.value.clearValidate(['logoUrl', 'tmName'])
        })
        dialogFormVisible.value = true
    }

    // 修改已有的商品的数据
    const updataTradeMark = (row: TradeMark) => {
        //清理上次表单残留提醒
        // formRef.value?.clearValidate(['logoUrl', 'tmName'])
        nextTick(() => {
            formRef.value.clearValidate(['logoUrl', 'tmName'])
        })
        dialogFormVisible.value = true
        // es6语法  合并对象
        Object.assign(trademarkParams, row)
    }
    //对话框底部取消按钮
    const cancel = () => {
        trademarkParams.logoUrl = ''
        trademarkParams.tmName = ''
        trademarkParams.id = 0
        dialogFormVisible.value = false
    }
    //对话框底部确认按钮
    const confirm = async() => {  
        //对整个表单的内容进行验证, 只有通过了， 才会进行下面的操作
        await formRef.value?.validate()  


        let result: any = await reqAddOrUpdataTrademark(trademarkParams)
        if(result.code == 200){
            ElMessage({
                type: 'success',
                message: trademarkParams.id? '修改品牌成功' : '添加品牌成功'
            })
            //@ts-ignore
            getHasTrademark(trademarkParams.id ? pageNO.value : 1)
        }else{
            ElMessage({
                type: 'error',
                message: trademarkParams.id? '修改品牌失败' : '添加品牌失败'
            })
        }
        trademarkParams.logoUrl = ''
        trademarkParams.tmName = ''
        trademarkParams.id = 0
        
        dialogFormVisible.value = false
    }
    //挂载时向后台请求已有的商品数据
    onMounted(() => {
        getHasTrademark()
    })
    //监听页面相关属性变化
    watchEffect(() => {
        getHasTrademark()
    })
    //上传图片组件 -> 上传图片组件之前触发的钩子函数
    //@ts-ignore
    const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
        //要求： 上传文件的格式png | jpg | gif | webp  4M
        if(rawFile.type === 'image/png' || rawFile.type == 'image/jpg' || rawFile.type == 'image/gif' || rawFile.type == 'image/webp'){
            if(rawFile.size / 10241 / 1024 < 4){
                return true
            }else{
                ElMessage({
                    type:'error',
                    message: '上传文件的大小应该小于4M'
                })
                return false
            }
        }else{
            ElMessage({
                type: 'error',
                message: '上传文件格式务必是png | jpg | gif | webp'
            })
            return false
        }  
    }
    //图片上传成功的钩子
    //@ts-ignore
    const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
        // response:即为当前这次上传图片post请求服务器返回的数据
        // 收集上传图片的地址， 添加一个新的品牌的时候带给服务器
        trademarkParams.logoUrl = response.data

        //图片上传成功之后， 清楚对应的图片校验结果
        formRef.value.clearValidate()
    }
    //品牌自定义校验方法validatorTmName
    const validatorTmName = (rule: any, value: any, callback: any) => {
        if(value.trim().length >= 2){
            callback()
        }else{
            callback(new Error('品牌名称位数应大于等于两位'))
        }
    }
    //品牌logo图片的自定义校验规则
    const validatorLogoUrl = (rule: any, value: any, callback: any) => {
        if(value){
            callback()
        }else{
            callback(new Error('LOGO图片务必上传'))
        }
    }
    // 修改品牌表单的校验规则
    const rules = {
        tmName: [
            {required: true, trigger: 'blur', validator: validatorTmName}
        ],
        logoUrl: [
            {require: true, validator: validatorLogoUrl}
        ]
    }
    

    //删除已有品牌
    const deleteTradeMark = async(id : number) => {
        let result = await DeleteTrademark(id)
        if( result.code == 200){
             ElMessage({
                type: 'success',
                message: '删除成功'
             })
             //@ts-ignore
             console.log(trademark.value.length);
             //@ts-ignore
             getHasTrademark(trademark.value.length > 1? pageNO.value : pageNO.value - 1)
        }else{
            ElMessage({
                type: 'error',
                message: '删除失败'
            })
        }
    }
</script>

<template>
    <el-card class="box-card">
        <!-- 卡片顶部添加品牌按钮 -->
        <el-button type="primary" size="default" icon="Plus" @click="addTradeMark">添加品牌</el-button>
        <!-- 表格组件：用于展示已有的平台的数据 -->
        <!-- 
            table
            ---border: 可以设置表格纵向是否有边框
            table-column
            ---label: 可以设置类表名称
            ---width: 可以设置这列的宽
            ---align: 可以设置这一列的对齐方式
         -->
        <el-table style="margin: 10px 0px;" border :data="trademark">
            <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
            <el-table-column label="品牌名称" align="center">
                <template #="{row, $index, column}">
                    <!-- row  就是 :data=“ trademark ”  数组中的一个元素 -->
                    <!-- $index 就是 trademark数组 的索引值，$index 是几  row 就是 trademark[$index] 的元素  -->

                    <!-- 可以进行样式操作 -->
                    <pre>{{ row.tmName }}</pre>
                </template>
            </el-table-column>
            <el-table-column label="品牌LOGO" align="center">
                <template #="{row, $index}">
                    <img :src=" row.logoUrl ||'../../../assets/品牌LOGO未有图片时显示.webp'" alt="未有图片" style="width: 100px; height: 100px;">
                </template>
            </el-table-column>
            <el-table-column label="品牌操作" align="center">
                <template #="{row, $index}">
                    <el-button type="primary" size="small" icon="Edit" @click="updataTradeMark(row)"></el-button>
                    <el-popconfirm :title="`您确定删除${row.tmName}`" icon="Delete" @confirm="deleteTradeMark(row.id)">
                        <template #reference>
                            <el-button icon="Delete" type="primary" size="small"></el-button>
                        </template>
                     </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器组件 -->
        <!-- 
            pagination
               v-model:current-page: 设置分页器当前页码
               v-model:page-size: 每页显示数据个数
               :page-sizes: 用于设置下拉菜单的数据
               :small: 是否使用小型分页样式
               background: 设置分页器按钮的背景颜色
               layout: 可以设置分页器6个子组件布局调整  ->, 之后的 子组件顶到最右侧
         -->
        <el-pagination
            v-model:current-page="pageNO"
            v-model:page-size="limit"
            :page-sizes="[3, 5, 7, 9]"
            :small="true"
            :background="true"
            layout="prev, pager, next, jumper, ->, sizes, total"
            :total="total"
        />
    </el-card>
    <!-- 
        vo--model 属性用户控制对话框的显示与隐藏  true显示  false隐藏
        title: 设置对话框左上角的标题
     -->
    <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'">
        <el-form style="width: 80%;" :model="trademarkParams" :rules="rules" ref="formRef">
            <el-form-item label="品牌名称" label-width="auto" prop="tmName">
                <el-input placeholder="请您输入品牌的名称" v-model="trademarkParams.tmName">
                </el-input>
            </el-form-item>
            <el-form-item label="品牌LOGO" label-width="80px" prop="logoUrl">
                <el-upload
                    class="avatar-uploader"
                    action="/api/admin/product/fileUpload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >             
                    <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <!-- 具名插槽： footer -->
        <template #footer>
            <el-button type="primary" @click="cancel">取消</el-button>
            <el-button type="primary" @click="confirm">确认</el-button>
        </template>
    </el-dialog>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>