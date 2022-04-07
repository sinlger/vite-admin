<template>
  <h2 class=" text-light-400 ">
    <div>
      <li v-for="(item,index) of menuLists">
        <router-link :to="item.path">{{item.name}}</router-link>
      </li>
      <el-button @click="exit">退出</el-button>
    </div>
    BasicLayouts
    <div>
      <router-view></router-view>
    </div>
  </h2>
</template>

<script lang='ts'>
import { RouterView, RouteRecordRaw, useRoute, useRouter } from "vue-router";
import { computed } from "vue";
export default {
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();
    //获取路由表
    const getMenus = () => {
      let menuList: RouteRecordRaw[] = [];
      const routers: Array<RouteRecordRaw> = router.options?.routes || [];
      routers.forEach((item) => {
        if (item.path == "/") {
          menuList = item.children || [];
        }
      });
      return JSON.parse(JSON.stringify(menuList));
    };

    // 获取显示状态的路由
    const menuLists = computed(() => {
      return getMenus().filter((item: any) => !item?.meta?.hidden);
    });
    // 退出
    const exit = () => {
      sessionStorage.clear();
      router.push("/login");
    };
    return {
      route,
      router,
      menuLists,
      exit,
    };
  },
};
</script>

<style scoped lang="scss">
</style>
