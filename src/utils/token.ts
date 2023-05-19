export const SET_TOKEN = (token: string) => {
    localStorage.setItem('TOKEN', token) 
}

export const GET_TOKEN = (): string => {
    return localStorage.getItem('TOKEN') as string
}