<script setup>
import {onMounted, ref} from 'vue';
import {useRoute} from 'vue-router'
import myAxios from "../plugins/myAxios.ts"
import {showFailToast, showSuccessToast, Toast} from "vant";
import  qs from "qs";
import UserCardList from "../components/UserCardList.vue";
const route = useRoute();

const { tags }  = route.query;

const userList = ref([]);


onMounted(async () =>{
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList:tags
    },
    paramsSerializer: function (params) {
      return qs.stringify(params, {indices: false})
    },
  })
      .then(function (response) {
        console.log('/user/search/tags succeed',response);
        // showSuccessToast("请求成功");
        return response.data?.data;
      })
      .catch(function (error) {
        console.error('/user/search/tags error',error);
        showFailToast("请求失败");
      })
      .finally(function () {
        // 总是会执行
      });
  if (userListData){
    userListData.forEach(user => {
      if (user.tags){
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData;
  }
})




</script>

<template>
  <UserCardList :user-list="userList" />
  <van-empty v-if="!userList || userList.length < 1" description="暂无匹配的用户" />
</template>

<style scoped>

</style>