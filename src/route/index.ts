import { createRouter, Router, createWebHashHistory, NavigationGuardNext, RouteLocationNormalized, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from "@/utils/utils";
import { baseRouters, mainRoutes, Routers } from '@/route/dynamicRouter'
import { BasicLayout } from '@/layouts/index'
import { getPermissionList } from '@/api/system'
NProgress.configure({ showSpinner: false })

let isAddDynamicMenuRoutes = false // 是否请求路由表
//路由实例
const router: Router = createRouter({
    history: createWebHistory(),
    routes: baseRouters
})

// 构造路由表
function fnAddDynamicMenuRouter(menuList: any, routers: RouteRecordRaw[]) {
    menuList.forEach((item: any, index: number) => {
        item
    });
}

//路由转跳判断
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const token: string = getToken() as string
    if (token) {
        //第一次加载路由列表并且该项目需要动态路由
        if (isAddDynamicMenuRoutes) {
            try {
                //获取动态路由表
                const res: any = await getPermissionList(token)
            } catch {

            }
        } else {
            if (to.path == "/" || to.path == "/login") {
                next(from)
            } else {
                next()
            }
        }
    } else {
        isAddDynamicMenuRoutes = false
        if (to.name != 'login') {
            next('/login')
        }
        next()
    }
})

//路由错误输出
router.onError((handler) => {
    console.log(handler)
})
export default router