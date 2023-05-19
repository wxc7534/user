import request from "@/utils/request";
import type { LoginFrom, loginUserData, loginResponseData } from "./type";

enum API {
    LOGIN_URL = '/user/login',
    USERINFO_URL = '/user/info'
}
// 暴漏请求函数
// 登录接口方法
export const reqLogin = (data: LoginFrom) => request.post<any, loginResponseData>(API.LOGIN_URL, data)


//获取用户信息方法

export const reqUserInfo = () => request.get<any, loginUserData>(API.USERINFO_URL)