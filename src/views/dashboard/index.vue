<template>
  {{name}}
  <children @changeTime="getTime" :time="time"></children>
  <el-input type="text" v-model="inputName" class="w-50 m-2"></el-input>
  <el-button @click="setName(inputName)">按钮</el-button>
  <el-button @click="getTime">刷新时间</el-button>
</template>

<script lang='ts' setup>
import { ref, reactive, provide } from "vue";
import { useName } from "@/hooks/useName";
import children from "@/views/dashboard/modules/children.vue";
const { name, setName, getName } = useName();
const inputName = ref("");
const time = ref(new Date());
const getTime = () => {
  time.value = new Date();
};
const params = reactive({
  title: "我是provide",
});
provide("subtitle", {
  params,
  changeTitle: (value: string) => {
    params.title = value;
  },
});
</script>

<style scoped lang="scss">
</style>

