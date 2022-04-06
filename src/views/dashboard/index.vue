<template>
  <div class="text-gray-600 dark:text-green-400 title">
    这里是dashborad
  </div>
  <p class="text-gray-400 dark:text-light-400">主题颜色{{theme}}</p>
  <el-button size="small" @click="changeTheme(theme)">按钮</el-button>
</template>
<script>
import { computed } from "vue";
import { useSettingStore } from '@/store/modules/setting';
export default {
  setup(props) {
    const store = useSettingStore()
    return {
      theme: computed(() => store.theme),
      changeTheme(value) {
        if (value == 'dark') {
          store.set_theme('light')
        }else{
          store.set_theme('dark')
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 100px;
}
</style>