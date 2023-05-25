<script setup lang="ts">
    import useCategoryStore from '@/store/modules/category';
    import { storeToRefs } from 'pinia';
    import { watch, ref, reactive } from 'vue'
    import type { AttrResponseData, AttrList, Attr } from '@/api/product/attr/type'
    import { reqAttr } from '@/api/product/attr/index'
    const categoryStore = useCategoryStore()
    const { c3ArrId, c1ArrId, c2ArrId } = storeToRefs(categoryStore)
    //存储已有的属性和属性值
    let attrArr = ref<AttrList>()
    //显示已有属性或者显示添加属性界面
    let scene = ref<boolean>(true)
    //收集新的属性
    let attrParams = reactive<Attr>({
        attrName: '',  //新增的属性的名字
        attrValueList: [], //新增的属性值数组
        categoryId: '', //三级分类ID
        categoryLevel: 3 //代表的是三级分类
    })

    watch(c3ArrId, () => {
        attrArr.value = []
        if(c3ArrId.value){
            getAttr()
        }
        
    })

    //获取分类下已有的属性值和属性名称
    const getAttr = async () => {
        let result: AttrResponseData = await reqAttr(c1ArrId.value!, c2ArrId.value!, c3ArrId.value!)
        if(result.code == 200){
            attrArr.value = result.data
        }
    }
</script>

<template>
    <Category :scene="scene"/>
    <el-card style="margin: 10px 0px;">
        <!-- 属性展示区 -->
        <div v-show="scene">
            <el-button type="primary" icon="Plus" :disabled="c3ArrId ? false : true" @click="scene = !scene">添加平台属性</el-button>
            <el-table border style="margin: 10px 0px;" :data="attrArr">
                <el-table-column label="序号" align="center" type="index" width="80px"></el-table-column>
                <el-table-column label="属性名称" align="center" width="120px" prop="attrName"></el-table-column>
                <el-table-column label="属性值名称" align="center">
                    <template #="{row, $index}">
                        <el-tag style="margin: 5px;" v-for="(item, index) in row.attrValueList" :key="item.id">{{ item.valueName }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="120px">
                    <template #="{row, $index}">
                        <el-button type="primary" size="small" icon="Edit" @click="scene = !scene"></el-button>
                        <el-popconfirm :title="`您确定删除${row.attrName}`" icon="Delete">
                            <template #reference>
                                <el-button size="small" icon="Delete" type="primary"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 添加或修改属性区域 -->
        <div v-show="!scene">
            <el-form :inline="true">
                <el-form-item label="属性名称">
                    <el-input placeholder="请你输入新的属性名" v-model="attrParams.attrName"></el-input>
                </el-form-item>    
            </el-form>
            <el-button type="primary" icon="Plus" :disabled="!attrParams.attrName">添加新的属性</el-button>
            <el-button @click="scene = !scene">取消</el-button>
            <el-table margin="10px 0px" border>
                <el-table-column label="序号" width="80px"></el-table-column>
                <el-table-column label="属性值名称"></el-table-column>
                <el-table-column label="操作"></el-table-column>
            </el-table>
            <el-button type="primary" :disabled="!attrParams.attrName">保存</el-button>
            <el-button @click="scene = !scene">取消</el-button>
            <el-form>

            </el-form>
        </div>
    </el-card>

</template>

<style>

</style>