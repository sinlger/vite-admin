<template>
  <el-menu :default-active="activeRouter" :router="true" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
    <el-menu-item :index="item.path" :key="index" v-for="(item,index) of menuLists" :route="item.path">
      <el-icon color="#409EFC" class="no-inherit">
        <component :is='item.meta.icon'></component>
      </el-icon>
      <template #title>
        {{item.name}}
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import { RouterView, RouteRecordRaw, useRoute, useRouter } from "vue-router";
import { computed, ref, onMounted } from "vue";
export default {
  setup(props, context) {
    const isCollapse = ref(false);
    const route = useRoute();
    const router = useRouter();
    const activeRouter = ref();
    //加载完成后
    onMounted(() => {
      activeRouter.value = route.path;
    });
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
    // 侧栏打开
    const handleOpen = () => {};
    //侧栏关闭
    const handleClose = () => {};
    return {
      activeRouter,
      menuLists,
      isCollapse,
      handleOpen,
      handleClose,
    };
  },
};
</script>

<style scoped lang="scss">
</style>
