<template>
  <div class="bg-light-100 mane">{{time}}{{title}}</div>
  <el-button @click="changeTitle">改变数据</el-button>
  <el-button @click="changeTime">刷新时间</el-button>
</template>

<script setup lang="ts" name="children">
import { defineProps, inject } from "vue";
const time = defineProps({
  time: Object,
});
const title = inject("subtitle");
const changeTitle = () => {
  title.changeTitle("你好");
};
const emit = defineEmits(["changeTime"]);
const changeTime = () => {
  emit("changeTime");
};
</script>

<style scoped lang="scss">

</style>
