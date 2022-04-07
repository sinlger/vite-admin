import { defineStore } from "pinia";
import { store } from '@/store'
import { userState } from "@/store/modules/user/types";
export const useUserStore = defineStore("user", {
    state: (): userState => ({
        token: "",
        permission: [],
    }),
    getters: {
        get_token(): string {
            return this.token
        },
        get_permission(): Array<string> {
            return this.permission
        }
    },
    actions: {
        set_token(token: string) {
            console.log(token);
            this.token = token
        },
        rm_token() {
            this.token = ''
        },
        set_permission(permission: Array<string>) {
            this.permission = permission
        },
        rm_permission() {
            this.permission = []
        }
    },
    //缓存策略
    persist: {
        enabled: true,
        strategies: [{
            paths: ['token', "permission"]
        }],
    }
})

export function useAppOutsideStore() {
    return useUserStore(store)
}