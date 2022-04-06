import { RouteRecordRaw } from 'vue-router'
import { BasicLayout } from '@/layouts'


// 导航路由
const Routers: Array<RouteRecordRaw> = [{
    path: "/403",
    name: '403',
    component: () => import("@/views/error/403.vue"),
    meta: { title: "403", permission: ['exception'], hidden: true }
}, {
    path: "/404",
    name: '404',
    component: () => import("@/views/error/404.vue"),
    meta: { title: "404", permission: ['exception'], hidden: true }
}, {
    path: "/500",
    name: '500',
    component: () => import("@/views/error/500.vue"),
    meta: { title: "500", permission: ['exception'], hidden: true }
}, {
    path: "/:pathMatch(.*)",
    name: 'error',
    component: () => import("@/views/error/403.vue"),
    meta: { title: "404", hidden: true }
}]


const mainRoutes: RouteRecordRaw = {
    path: "/",
    redirect: "/login",
    component: BasicLayout,
    children: []
}




//基础路由
const baseRouters: Array<RouteRecordRaw> = [
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login/index.vue"),
    }
]

export { baseRouters, mainRoutes, Routers }