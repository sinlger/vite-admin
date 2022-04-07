<template>
  <div class="bg-gray-700 h-screen flex  justify-center items-center ">
    <div class="p-20 bg-green-200 rounded-md">
      <el-form ref="login" :rules="rules" :model="formData" label-width="120px">
        <el-form-item label="Password" prop="username">
          <el-input v-model="formData.username" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Confirm" prop="password">
          <el-input v-model="formData.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">登陆</el-button>
          <el-button @click="reset(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';
import { Login } from '@/api/system'
import { useUserStore } from "@/store/modules/user";
import { useRouter } from "vue-router";
export default {
  setup(props) {
    const router = useRouter()
    const userStore = useUserStore()
    const ruleFormRef = ref()
    const passwordValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error("请输入密码！"))
      } else {

      }
    }
    const usernameValidator = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名称！"))
      }
    }
    const formData = reactive({
      username: "",
      password: ""
    })
    const rules = reactive({
      password: [{ validator: passwordValidator, trigger: 'blur' }],
      username: [{ validator: usernameValidator, trigger: 'blur' }],
    })
    const reset = (formEl) => {
      if (formEl) {
        formEl.resetFields()
      }
    }
    const submit = async (formEl) => {
      let { data } = await Login(formData)
      userStore.set_token(data.token)
      location.reload()
    }
    return {
      formData,
      rules,
      reset,
      submit
    }
  }
};
</script>

<style scoped lang="scss">
</style>
