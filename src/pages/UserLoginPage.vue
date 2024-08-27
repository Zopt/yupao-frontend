<script setup lang="ts">
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {useRoute} from "vue-router";
import {ref} from 'vue';

const route = useRoute();
const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async () => {
  const res = await myAxios.post('/user/login',{
    userAccount:userAccount.value,
    userPassword:userPassword.value,
  })

  console.log(res.data,'用户登录');
  if (res.data.code === 0 && res.data.message == 'ok' ){
    showSuccessToast("登录成功");
    const redirectUrl = route.query?.redirect as string ?? '/';
    window.location.href = redirectUrl;
  }else {
    showFailToast('登录失败')
  }
};

const text = '测试用户: test, 密码: test123456';
const keywords = ['test', 'test123456'];
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请输入账号' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
  <div>
    <van-highlight :keywords="keywords" :source-string="text" style="text-align: center"/>
  </div>
</template>

<style scoped>

</style>