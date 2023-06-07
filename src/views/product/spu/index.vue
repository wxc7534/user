<script setup lang="ts">
    import { ref, watch, watchEffect, onMounted } from 'vue'
    import useCategoryStore from '@/store/modules/category'
    import { storeToRefs } from 'pinia';
    import { reqHasSpu } from '@/api/product/spu'
    import type { HasSpuResponseData, Records, SpuData } from '@/api/product/spu/type'
    import SkuFrom from './skuFrom.vue'
    import SpuFrom from './spuFrom.vue'
    //@ts-ignore
    import { ElMessage } from 'element-plus';
    let scene = ref<boolean>(true)
    let scene2 = ref<number>(1)
    //第几页
    let pageNO = ref<number>(1)
    //这一页展示的数量
    let limit = ref<number>(3)
    // 总共的SPU数量
    let total = ref<number>()

    //存储已有的SPU的数据
    let records = ref<Records>()
    const CategoryStore = useCategoryStore()
    let { c3ArrId } = storeToRefs(CategoryStore)
    
    watch(c3ArrId, async() => {
        //务必保证有三级分类Id
        if(!c3ArrId.value){
            records.value = []
        }
        getHasSpu()
    })
    //获取某一个三级分类下全部的已有的SPU
    const getHasSpu = async() => {
        let result: HasSpuResponseData = await reqHasSpu(pageNO.value!, limit.value!, c3ArrId.value!)      
        if(result.code == 200){
           records.value = result.data.records
           total.value = result.data.total
            ElMessage({
                type: 'success',
                message: 'SPU数据获取成功'
            })
        }else{
            ElMessage({
                type: 'error',
                message: 'SPU数据获取失败'
            })
        }
    }

    // 添加新的SPU按钮
    const addSPU = () => {
        //切换场景一: 添加与修改SPU结构->SpuFrom
        scene.value = !scene.value
    }

    const changeScene = () => {
        scene.value = !scene.value
    }

    onMounted(() => {
        getHasSpu()
    })
    //获取SpuFrom 组件实例
    let spufrom = ref<any>()
    // 修改SPU
    const updata = (row: SpuData) => {
        scene.value = !scene.value
        spufrom.value.initHasspuData(row)
    }
    
</script>

<template>
    <Category :scene="scene"/>
    <el-card style="margin: 10px 0px;" v-show="scene">
        <el-button icon="Plus" type="primary" :disabled="!c3ArrId" @click="addSPU()">添加SPU</el-button>
        <el-table border :data="records">
            <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
            <el-table-column label="SPU名称" prop="spuName"></el-table-column>
            <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作">
                <template #="{row, $index}">
                    <el-button type="primary" icon="Plus" size="small" title="添加SPU" @click="addSPU()"></el-button>
                    <el-button type="primary" icon="Edit" size="small" title="修改SPU" @click="updata(row)"></el-button>
                    <el-button type="primary" icon="View" size="small" title="查看SPU" ></el-button>
                    <el-button type="primary" icon="Delete" size="small"></el-button>
                </template>
            </el-table-column>
        </el-table>
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
            style="margin: 10px 0;"
            v-model:current-page="pageNO"
            v-model:page-size="limit"
            :page-sizes="[3, 5, 7, 9]"
            :small="true"
            :background="true"
            layout="prev, pager, next, jumper, ->, sizes, total"
            :total="total"
            @current-change="getHasSpu"
            @size-change="getHasSpu"
        />
    </el-card>
    <!-- 添加SPU| 修改SPU -->
    <SpuFrom v-show="!scene" @changeScene="changeScene" ref="spufrom"></SpuFrom>
    <!-- 添加Sku的子组件 -->
    <SkuFrom v-show="scene2 == 2"></SkuFrom>
</template>

<style>

</style>