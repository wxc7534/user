<script setup lang="ts">
    import type { SpuData, AllTradeMark, SpuHasImg, SaleAttrResponseData, HasSaleAttrResponseData } from '@/api/product/spu/type'
    import { reqAllTradeMark, reqSpuImageList, reqHasSaleAttr, reqAllSaleAttr } from '@/api/product/spu/index'
    import { ref, reactive } from 'vue'
    import type {  SpuImg, SaleAttr, Trademark, HasSaleAttr } from '@/api/product/spu/type'
    let $emit = defineEmits(['changeScene'])

    const cancel = () => {
        $emit('changeScene')
    }
    //预览框的显示与隐藏的控制
    let dialogVisible = ref<boolean>(false)
    //存储预览图片地址
    let dialogImageUrl = ref<string>()
    //照片墙点击预览时触发的钩子
    const handlePictureCardPreview = (file: any) => {
        dialogVisible.value = true

        dialogImageUrl.value = file.url
    }
    //照片墙删除文件的钩子
    const handleRemove = (fil: any) => {

    }
    //存储已有的SPU的数据
    let AllTradeMark = ref<Trademark[]>([])
    //商品图片
    let imgList = ref<SpuImg[]>([])
    //已有销售属性
    let saleAttr = ref<SaleAttr[]>()
    //全部的销售属性
    let allSaleSttr = ref<HasSaleAttr[]>([])
    //存储已有SPU对象
    let SpuParams = ref<SpuData>({
        category3Id: '',
        spuName: '',
        description: '',
        tmId: '',
        spuImageList: [],
        spuSaleAttrList: []
    })
    const initHasspuData = async(spu: SpuData) =>{
        //存储已有的SPU对象
        SpuParams.value = spu
        // spu: 即为父组件传递过来的已有的SPU对象
        //获取全部的SPU的品牌数据
        let result: AllTradeMark =  await reqAllTradeMark()
        // 获取某一个已有的SPU下全部商品的图片地址
        let result1: SpuHasImg = await reqSpuImageList(spu.id!)
        // 获取某一个已有的SPU拥有多少个销售属性
        let result2: SaleAttrResponseData = await reqHasSaleAttr(spu.id!)
        console.log(result2);
        
        // 获取全部销售属性
        let result3: HasSaleAttrResponseData = await reqAllSaleAttr()


        //存储全部品牌的数据
        AllTradeMark.value = result.data
        //SPU对应商品图片
        imgList.value = result1.data.map((item) => {
            return {
                url: item.imgUrl,
                name: item.imgName
            }
        })
        //存储已有的spu销售属性
        saleAttr.value = result2.data
        //存储全部的销售属性
        allSaleSttr.value = result3.data
        
    }
    defineExpose({initHasspuData})
</script>

<template>
    <el-card style="margin: 10px 0;">
        <el-from label-width="100px">
            <el-form-item label="SPU名称" size="small">
                <el-input placeholder="请你输入SPU名称" v-model="SpuParams.spuName"></el-input>
            </el-form-item>
            <el-form-item label="SPU品牌" size="small" placeholder="请你选择品牌">
                <el-select v-model="SpuParams.tmId">
                    <el-option v-for="(item, index) in AllTradeMark" :key="item" :value="item.id" :label="item.tmName"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述" size="small">
                <el-input type="textarea" placeholder="请你输入描述" v-model="SpuParams.description"></el-input>
            </el-form-item>
            <el-form-item label="SPU图标" size="small">
                <el-upload
                    v-model:file-list="imgList"
                    action="/api/admin/product/fileUpload"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                >
                    <el-icon><Plus /></el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100% ; height: 100%;"/>
                </el-dialog>
            </el-form-item>
            <el-form-item label="SPU销售属性" size="small">
                <el-select>
                    <el-option></el-option>
                </el-select>
                <el-button icon="Plus" type="primary" style="margin-left: 10px;">添加属性值</el-button>
                <el-table style="margin: 10px 0;" border :data="saleAttr">
                    <el-table-column label="序号" type="index" style="width: 80px;" align="center"></el-table-column>
                    <el-table-column label="销售属性名" qidth="100px" align="center" prop="saleAttrName"></el-table-column>
                    <el-table-column label="销售属性值" align="center">
                        <template #="{row, $index}">
                            <el-tag
                                style="margin: 0 10px;"
                                v-for="(item, index) in row.spuSaleAttrValueList"
                                :key="item.name"
                                class="mx-1"
                                closable
                                :disable-transitions="false"
                                @close="handleClose(item)"
                            >
                            {{ item.saleAttrName }}
                            </el-tag>
                            <el-button type="primary" icon="Plus"></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100px" align="center">
                        <template #="{row, $index}">
                            <el-button type="primary" icon="Delete" @click="saleAttr!.splice($index, 1)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-column>
                <el-button type="primary" size="small">保存</el-button>
                <el-button type="primary" size="small" @click="cancel">取消</el-button>
            </el-form-column>
        </el-from>
    </el-card>
    
</template>

<style scoped>
</style>