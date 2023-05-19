
//登录携带的类型
export interface LoginFrom{
    username: string,
    password: string
}

//登陆返回响应类型
export interface loginResponseData{
    code: number,
    data: responseData
}

interface responseData{
    token: string
}

// 用户信息类型
interface userInfo{
    userId: number,
    avatar: string,
    username:string,
    password: number,
    desc: string,
    roles: string[],
    buttons:string[],
    routes: string[],
    token: string
}

interface user{
    checkUser: userInfo
}

export interface loginUserData{
    code: number,
    data: user
}