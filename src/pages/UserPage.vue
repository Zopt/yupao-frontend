<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../service/user.ts";


const user = ref();

onMounted(async () =>{
  user.value = await getCurrentUser();
})



</script>

<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user?.userName" />
    <van-cell title="个人信息" is-link to="/user/update" />
    <van-cell title="创建的队伍" is-link to="user/team/create" />
    <van-cell title="加入的队伍" is-link to="user/team/join" />
  </template>
</template>

<style scoped>

</style>