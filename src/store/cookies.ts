import Cookie from 'js-cookie';

export const getIsLogin =()=>{
    return Cookie.get('isLogin')
}

export const setIsLogin = (data:any)=>{
    return Cookie.set('isLogin',data)
}

export const setToken = (data:any)=>{
    return Cookie.set('token',data)
}

export const getToken = ()=>{
    return Cookie.get('token')
}

export const setUserInfo = (data:any)=>{
    return Cookie.set('userInfo',data)
}

export const getUserInfo = ()=>{
    return Cookie.get('userInfo')
}