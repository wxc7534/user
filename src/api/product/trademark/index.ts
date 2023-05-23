// 书写品牌管理模块接口
import request from '@/utils/request'
import type { TrademarkResponseData } from './type'
//品牌管理模块接口地址
enum API {
    //获取已有品牌接口
    TRADEMARK_URL = '/admin/product/baseTrademark/'

}

// 获取已有品牌接口的方法
// page: 获取第几页---默认第一页
// limit： 获取几个已有商品的数据

export const reqHasTrademark = (page: number, limit: number) => request.get<any, TrademarkResponseData>(API.TRADEMARK_URL+`${page}/${limit}`)