<script setup lang="ts">
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {ref} from 'vue';

const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');
const plantCode = ref('');
const onSubmit = async () => {
  const res = await myAxios.post('/user/register',{
    userAccount:userAccount.value,
    userPassword:userPassword.value,
    checkPassword:checkPassword.value,
    plantCode:plantCode.value,
  })

  console.log(res.data,'用户注册');
  if (res.data.code === 0 && res.data.message == 'ok' ){
    showSuccessToast("注册成功");
    // const redirectUrl = route.query?.redirect as string ?? '/';
    // window.location.href = '/';
  }else {
    showFailToast('注册失败')
  }
};

const text = '举例: 测试用户: test, 密码: test123456 (该用户已经注册，请勿注册该用户)';
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
      <van-field
          v-model="checkPassword"
          type="password"
          name="checkPassword"
          label="确认密码"
          placeholder="第二次输入密码"
          :rules="[{ required: true, message: '请第二次填写密码' }]"
      />
      <van-field
          v-model="plantCode"
          name="plantCode"
          label="会员编号"
          placeholder="请输入会员编号"
          :rules="[{ required: true, message: '请输入会员编号' }]"
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