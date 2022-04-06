import request from "@/utils/request";
/**登陆 */
export function Login(params: any) {
    return request({
        url: "/api/login",
        params: params
    })
}


export function getPermissionList(params: any) {
    return request({
        url: "/api/permission",
        params: params
    })
}