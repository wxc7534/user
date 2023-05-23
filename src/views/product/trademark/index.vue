<script setup lang="ts">
    import { ref, onMounted, watch, watchEffect } from 'vue'
    import { reqHasTrademark } from '@/api/product/trademark'
    import type { Records, TrademarkResponseData } from '@/api/product/trademark/type' 
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
    // 获取已有品牌的接口封装成一个函数
    const getHasTrademark = async () => {
        let result: TrademarkResponseData = await reqHasTrademark(pageNO.value, limit.value)
        
        if( result.code == 200 ){
            total.value = result.data.total
            trademark.value = result.data.records
        }
        
        
    }
    onMounted(() => {
        getHasTrademark()
    })

    watchEffect(() => {
        getHasTrademark()
    })
</script>

<template>
    <el-card class="box-card">
        <!-- 卡片顶部添加品牌按钮 -->
        <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
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
                    <el-button type="primary" size="small" icon="Edit"></el-button>
                    <el-button type="warning" size="small" icon="Delete"></el-button>
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
    <el-dialog v-model="dialogFormVisible" title="Shipping address">
`1212121`
    </el-dialog>
</template>

<style>

</style>