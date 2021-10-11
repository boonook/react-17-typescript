import http from '@/libs/http';
/**
 * 发起请求
 * @param {object} params 请求参数
 */
export const getHomeList = (params:any) => {
    /**
     * size:params.size;
     * page:params.page;
     * **/
    return http.request({
        url:"/api/admin/home/list",
        method:"get",
    },true,false)
}