import request from "@/utils/request";
import type { loginFromData, loginResponseData, userInfoResponseData } from "./type";

enum API {
    LOGIN_URL = '/admin/acl/index/login',
    USERINFO_URL = '/admin/acl/index/info',
    LOGOUT_URL = '/admin/acl/index/logout'
}
// 暴漏请求函数
// 登录接口方法
export const reqLogin = (data: loginFromData) => request.post<any, loginResponseData>(API.LOGIN_URL, data)


//获取用户信息方法

export const reqUserInfo = () => request.get<any, userInfoResponseData>(API.USERINFO_URL)


//退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)