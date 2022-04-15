<template>

  <div class="common-layout">
    <el-container>
      <el-aside width="200px" class="bg-light-100">
        <GlobalHeader></GlobalHeader>
      </el-aside>
      <el-container>
        <el-header>
        </el-header>
        <el-main>
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
  <!-- <h2 class=" text-light-400 ">
    <div>
      <li v-for="(item,index) of menuLists">
        <router-link :to="item.path">{{item.name}}</router-link>
      </li>
      <el-button @click="exit">退出</el-button>
    </div>
  </h2> -->
</template>

<script lang='ts'>
import { RouterView, RouteRecordRaw, useRoute, useRouter } from "vue-router";
import GlobalHeader from "@/components/GlobalHeader/index.vue";
import { computed } from "vue";
export default {
  components: { GlobalHeader },
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
