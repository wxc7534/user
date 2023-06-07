<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import useCategoryStore from '@/store/modules/category'
import { storeToRefs } from 'pinia';
const categoryStore = useCategoryStore()
defineProps(['scene'])
const { c1ArrId, c2ArrId, c3ArrId, c1Data, c2Data, c3Data} = storeToRefs(categoryStore)
const { getC1Data, getC2Data, getC3Data  } = categoryStore
let c1Id = ref<number>()
onMounted( async () => {
    getC1Data()
})
const hanlder1 = () => {
    c2ArrId.value = ''
    c2Data.value = []
    c3Data.value = []
    c3ArrId.value = ''
    getC2Data()
    
}
const hanlder2 = () => {
    c3Data.value = []
    c3ArrId.value = ''
    getC3Data(c2ArrId.value as number)
    
}
</script>
<script lang="ts">
export default {
    name: 'Category'
}
</script>

<template>
    <el-card>
        <el-form inline="true">
            <el-form-item label="一级分类">
                <el-select v-model="c1ArrId" @change="hanlder1" :disabled="!scene">
                    <el-option v-for="(c1, index) in c1Data" :key="index" :label="c1.name" :value="c1.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类" >
                <el-select v-model="c2ArrId" @change="hanlder2" :disabled="!scene">
                    <el-option v-for="(c2, index) in c2Data" :key="index" :label="c2.name" :value="c2.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select v-model="c3ArrId" :disabled="!scene">
                    <el-option v-for="(c3, index) in c3Data" :key="index" :label="c3.name" :value="c3.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<style scoped lang="scss">

</style>