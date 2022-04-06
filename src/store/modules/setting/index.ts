import { defineStore } from 'pinia'
import { store } from "@/store";
import { settingState } from '@/store/modules/setting/types';

export const useSettingStore = defineStore('setting', {
    state: (): settingState => ({
        theme: "dark"
    }),
    getters: {
        get_theme(): string {
            return this.theme
        }
    },
    actions: {
        set_theme(theme: string) {
            if (theme == 'dark') {
                document.body.className = "dark"
                this.theme = 'dark'
            }
            if (theme == 'light') {
                document.body.className = "light"
                this.theme = 'light'
            }
        }
    },
    persist: {
        enabled: true,
    }
})

export function useAppOutsideStore() {
    return useSettingStore(store)
}