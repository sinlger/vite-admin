import { defineStore } from "pinia";
import { store } from '@/store'
import { userState } from "@/store/modules/user/types";
export const useUserStore = defineStore("user", {
    state: (): userState => ({
        token: ""
    }),
    getters: {
        get_token(): string {
            return this.token
        }
    },
    actions: {
        set_token(token: string) {
            console.log(token);
            this.token = token
        },
        rm_token() {
            this.token = ''
        }
    },
    //缓存策略
    persist: {
        enabled: true,
        strategies: [{
            paths: ['token']
        }],
    }
})

export function useAppOutsideStore() {
    return useUserStore(store)
}