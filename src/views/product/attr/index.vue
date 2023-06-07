<script setup lang="ts">
    import useCategoryStore from '@/store/modules/category';
    import { storeToRefs } from 'pinia';
    import { watch, ref, reactive, onMounted, nextTick } from 'vue'
    import type { AttrResponseData, AttrList, Attr, AttrValue } from '@/api/product/attr/type'
    import { reqAttr, reqAddUpdata, reqRemove } from '@/api/product/attr/index'
    //@ts-ignore
    import { ElMessage } from 'element-plus';
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
        categoryLevel: 3, //代表的是三级分类
    })

    watch(c3ArrId, () => {
        attrArr.value = []
        if(c3ArrId.value){
            getAttr()
        }
        
    })
    onMounted(() => {
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
    //添加新属性
    const attrAttValue = ()=> {
        attrParams.attrValueList.push({
            valueName: ''
        })
        nextTick(() => {
            inputArr.value[inputArr.value.length - 1].focus()
        })
    }
    //添加品牌属性 保存三级分类id回调
    const saveId = () => {
       
        //先清空数据， 再收集数据
        // 通过合并数据, 来使 attrParams的数据重置
        Object.assign(attrParams, {
            id: '',
            attrName: '',  //新增的属性的名字
            attrValueList: [], //新增的属性值数组
            categoryId: '', //三级分类ID
            categoryLevel: 3
        }) 
        attrParams.categoryId = c3ArrId.value!
    }
    //保存按钮回调
    const save = async() => {
        let result = await reqAddUpdata(attrParams)
        if(result.code == 200){
            scene.value = !scene.value
            getAttr()
            ElMessage({
                type: 'success',
                message: attrParams.id ? '修改成功' : '添加成功'
            })
        }else{
            ElMessage({
                type: 'error',
                message: attrParams.id ? '修改成功' : '添加成功'
            })
        }
    }
    //属性值表单元素失去焦点的回调
    const toLook = (row: AttrValue, $index: number) => {
        //非法情况一
        if(row.valueName.trim() == ''){
            // 删除属性值为空的元素
            attrParams.attrValueList.splice($index, 1)
            ElMessage({
                type:'error',
                message: '属性值不能为空'
            })
            return 
        }
        //非法情况二
        let repeat = attrParams.attrValueList.find((item, index) => {
            if(item != row){
                return item.valueName == row.valueName
            }
        })
        if(repeat){
            ElMessage({
                type: 'error',
                message: '该属性值已存在'
            })
            // 删除属性值已经存在的元素
            attrParams.attrValueList.splice($index, 1)
        }
        row.flag = true
    }
    //属性表单查看模式点击回调
    const toEdit = (row: AttrValue, $index: number) => {
        row.flag = false
        nextTick(() => {
            inputArr.value[$index].focus()
        })
    }
    let inputArr = ref<any>([])
    const updataArr = (row: Attr) => {
        scene.value = !scene.value 
        nextTick(() => {
            Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
            
        })
        
    }
</script>

<template>
    <Category :scene="scene"/>
    <el-card style="margin: 10px 0px;">
        <!-- 属性展示区 -->
        <div v-show="scene">
            <el-button type="primary" icon="Plus" :disabled="c3ArrId ? false : true" @click="scene = !scene, saveId()">添加平台属性</el-button>
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
                        <el-button type="primary" size="small" icon="Edit" @click=" updataArr(row)"></el-button>
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
            <el-button type="primary" icon="Plus" :disabled="!attrParams.attrName" @click="attrAttValue">添加新的属性</el-button>
            <el-button @click="scene = !scene">取消</el-button>
            <el-table margin="10px 0px" border :data="attrParams.attrValueList">
                <el-table-column label="序号" width="80px" type="index"></el-table-column>
                <el-table-column label="属性值名称">
                    <template #="{row, $index}">
                        <el-input :ref="(vc: any) => inputArr[$index] = vc" v-if="!row.flag" @blur="toLook(row, $index)" placeholder="请你输入属性值名称" v-model="row.valueName" style="width: 400px;"></el-input>
                        <div v-else="row.flag" @click="toEdit(row, $index)">{{ row.valueName }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120px">
                    <template #="{row, $index}">
                        <el-button type="danger" icon="Delete" @click="attrParams.attrValueList.splice($index, 1)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" :disabled="attrParams.attrValueList.length > 0 ? false: true" @click="save">保存</el-button>
            <el-button @click="scene = !scene">取消</el-button>
            <el-form>

            </el-form>
        </div>
    </el-card>

</template>

<style>

</style>