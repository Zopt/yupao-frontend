<script setup lang="ts">
import {ref, watchEffect} from 'vue';
import myAxios from "../plugins/myAxios.ts"
import {showFailToast} from "vant";
import UserCardList from "../components/UserCardList.vue";
import {UserType} from "../models/user";


const userList = ref([]);


const isMatch = ref<boolean>(false);

const loading = ref(true);

const loadData = async () => {
  let userListData;
  loading.value = true;
  if (isMatch.value) {
    const num = 10;
    userListData = await myAxios.get('/user/match', {
      params: {
        num,
      },
    })
        .then(function (response) {
          console.log('/user/match success', response);
          // showSuccessToast("请求成功");
          return response.data?.data;
        })
        .catch(function (error) {
          console.error('/user/match error', error);
          showFailToast("请求失败");
        })
        .finally(function () {
          // 总是会执行
        });
  } else {
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 8,
        pageNum: 1,
      },
    })
        .then(function (response) {
          console.log('/user/recommend success', response);
          // showSuccessToast("请求成功");
          return response.data?.data?.records;
        })
        .catch(function (error) {
          console.error('/user/recommend error', error);
          showFailToast("请求失败");
        })
        .finally(function () {
          // 总是会执行
        });
  }
  if (userListData) {
    userListData.forEach((user: UserType) => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
}

watchEffect(() => {
  loadData()
});

</script>

<template>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatch"/>
    </template>
  </van-cell>
  <UserCardList :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length < 1" description="数据为空"/>
</template>

<style scoped>

</style>