import axios from 'axios';
import { Toast} from 'antd-mobile';
import config from '@/config/index';
import appState from '@/store/index';
import constant from '@/config/constant'
/**
 * 请求
 */
const baseUrl:string = process.env.NODE_ENV+''==='development'?config.baseUrl.dev:config.baseUrl.pro;
/**
 * 定义一个HttpRequest类
 * **/
interface HttpRequest {
    baseUrl: string;
    queue: any;
}
class HttpRequest {

    constructor(_baseUrl:any =baseUrl) {
        this.baseUrl = _baseUrl
        this.queue = {}
    }

    // /内置请求参数
    getInsideConfig() {
        ////说明是获取在线人数的接口
        return {baseURL: this.baseUrl,headers: {}}
    }

    handleError(error:any){
        Toast.clear();
        const message = ((error.message === 'Network Error')?'服务器内部错误!':error.message) || '服务器内部错误';
        Toast.show({
            icon: 'fail',
            content:message||'服务器内部错误!',
        });
        if(!error.code) return message
    }

    /**
     * 拦截器
     * @param {object} instance 请求实例
     * @param {string} url 请求路径
     * @param {boolean} withToken 请求是否需要携带token
     */
    interceptors(instance:any, url:any, withToken = true) {
        // 请求拦截
        instance.interceptors.request.use(function(config:any){
            if (withToken) {
                config.headers = {
                    ...config.headers,
                    'Authorization': appState.userState.token||"",
                }
            }
            return config
        }, (error:any) => {
            return Promise.reject(error)
        })
        // 响应拦截
        instance.interceptors.response.use(function(res:any){
            if (!res){
                throw new Error('服务器内部错误');
            }
            let result = res.data || {}
            if (typeof result === 'string') {
                try {
                    // result = eval(`(${result})`)
                }catch (e) {
                    return {data:res.data, code :constant.system.success, rel:true,message:res.message}
                }
            }

            if(res.data instanceof Blob){
                return {data:res.data, code :constant.system.success, message:res.message, rel:true}
            }
            const {code, data, rel=true,message} = result;

            return {data, code, rel,message}
        }, (error:any) => {
            if (error.message.indexOf('timeout') !== -1) {
                /**
                 * 处理超时时间
                 * **/
                const msg = "连接超时";
                return Promise.reject({message:msg})
            }
            const errorMsg = error.message
            const response = (error.response || {}).data || {}
            const msg = response.msg || response.message ||errorMsg || '服务器内服错误'
            // this.destroy(url)
            return Promise.reject(new Error(msg))
        })
    }

    /**
     * 发起请求
     * @param {object} options 请求配置
     * @param {string} options.url 请求地址
     * @param {'GET'|'POST' |'DELETE'|'PUT'|'PATCH'} options.method 请求方法
     * @param {object} options.headers 请求头
     * @param {string} options.headers.Authorization
     * @param {Array<function>} options.transformRequest
     * @param {boolean} withToken 是否需要携带token
     * @param {boolean} showMsg
     * @return {Promise}
     */
    request(options:any, withToken = true, showMsg = false) {
        Toast.show({
            icon: 'loading',
            content: '加载中…',
            duration:0
        });
        /**
         * 设置超时时间
         * **/
        axios.defaults.timeout = constant.system.timeoutTime;
        const instance = axios.create();
        options = Object.assign(this.getInsideConfig(), options);
        this.interceptors(instance, options.url, withToken)
        return instance(options).then((res:any) => {
            Toast.clear();
            if(res && res?.code+''===(constant.system.success+'')){
                /**
                 * 请求正常进入
                 * **/
                if(showMsg && showMsg){
                    Toast.show({
                        icon: 'success',
                        content:res?.message||'服务器内部错误!',
                    });
                }
            }else{
                Toast.show({
                    icon: 'fail',
                    content:res.message||'服务器内部错误!',
                });
                if(res && res.code+''==='202'){
                    ///推出到登陆界面
                    appState.userState?.loginOut()
                }
            }
            return res
        }).catch(
            this.handleError
        )
    }
}
/**
 * 导出目的时为了加载静态资源文件时做url的拼接
 * **/
export {
    baseUrl
}
export default new HttpRequest(baseUrl)
