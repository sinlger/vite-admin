import { createRouter, Router, createWebHashHistory, NavigationGuardNext, RouteLocationNormalized, createWebHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from "@/utils/utils";
import { baseRouters, mainRoutes, Routers } from '@/route/dynamicRouter'
import { BasicLayout } from '@/layouts/index'
import { getPermissionList } from '@/api/system'
const modules = import.meta.glob("/src/views/**/**.vue")
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
        if (!item.list) {
            routers.push({
                path: `${item.url}`,
                component: modules[`/src/views${item.url}/index.vue`],
                meta: {
                    name: item.title,
                    hidden: false,
                    icon: item.icon
                },
                name: item.name.slice(0, 1) == '/' ? item.name.slice(1) : item.name,
            })
        } else if (item.list && item.list.length) {
            const menus: any = fnAddDynamicMenuRouter(item.list, [])
            const paths = item.url.split('/')
            routers.push({
                path: `${item.url}`,
                name: item.name.slice(0, 1) == '/' ? item.name.slice(1) : item.name, // 截取开头"/"
                // component: paths.length > 2 ? BlankLayout : RouteLayout, // 二级路由
                component: BasicLayout,
                redirect: menus[0].path,
                children: menus,
                meta: {
                    title: item.title,
                    hidden: false,
                    icon: item.icon,
                },
            })
        }
    });
    return routers
}

//路由转跳判断
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const token: string = getToken() as string
    if (token) {
        //第一次加载路由列表并且该项目需要动态路由
        if (!isAddDynamicMenuRoutes) {
            try {
                //获取动态路由表
                const res: any = await getPermissionList(token)
                if (res.status == 200) {
                    isAddDynamicMenuRoutes = true
                    const menu = res.data
                    // 通过路由表构造路由
                    const menuRoutes: any = fnAddDynamicMenuRouter(menu.menuList || [], [])
                    mainRoutes.children = []
                    mainRoutes.children?.unshift(...menuRoutes, ...Routers)
                    //动态路由添加
                    router.addRoute(mainRoutes)
                    router.options.routes.unshift(mainRoutes)
                    sessionStorage.setItem("permissions", JSON.stringify(menu.permissions || '[]'))
                    if (to.path == "/" || to.path == "/login") {
                        const firstName = menuRoutes.length && menuRoutes[0].name
                        next({
                            name: firstName,
                            replace: true
                        })
                    } else {
                        next({ path: to.fullPath })
                    }
                } else {
                    // sessionStorage.setItem('menuList', '[]')
                    // sessionStorage.setItem('permissions', '[]')
                    sessionStorage.setItem('menuList', '[]')
                    sessionStorage.setItem('permissions', '[]')
                    next()
                }
            } catch (error) {
                console.log(
                    `%c${error} 请求菜单列表和权限失败，跳转至登录页！！`,
                    'color:orange',
                )
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