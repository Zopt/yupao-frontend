<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../service/user.ts";

const user = ref();

onMounted(async () =>{
  user.value = await getCurrentUser();
  console.log(user.value,"用户信息")
})

const router = useRouter();
const toEdit = (editKey: string,editName:string,currentValue: string) => {
  router.push({
    path: '/user/edit',
    query:{
      editKey,
      editName,
      currentValue,
    }
  })
}


</script>

<template>
  <template v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user.userName" @click="toEdit('userName','昵称',user.userName)" />
    <van-cell title="账号" :value="user.userAccount"/>
    <van-cell title="头像" is-link to="/user/edit" @click="toEdit('avatarUrl','头像',user.avatarUrl)">
      <img style="height:48px " :src="user.avatarUrl" alt="avatarUrl">
    </van-cell>
    <van-cell title="性别" is-link  :value="user.gender" @click="toEdit('gender','性别',user.gender)"/>
    <van-cell title="个人简介" is-link  :value="user.profile" @click="toEdit('profile','个人简介',user.profile)"/>
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone','电话',user.phone)"/>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email','邮箱',user.email)"/>
    <van-cell title="星球编号"   :value="user.plantCode"/>
    <van-cell title="创建时间"   :value="user.createTime.toString()"/>
  </template>
</template>

<style scoped>

</style>