<script setup lang="ts">
import {UserType} from "../models/user";

interface UserCardListProps {//定义一个类型
  loading: boolean;
  userList: UserType[]
}
const props = withDefaults(defineProps<UserCardListProps>(),{
  loading:false,
  //@ts-ignore
  userList:[] as UserType[],
});  //接受主页来的变量
</script>

<template>
  <van-skeleton title avatar :row="3" :loading="props.loading" v-for="user in props.userList">
  <van-card
            :tag="user.plantCode"
            :desc="user.profile"
            :title="`${user.userName}(${user.plantCode})`"
            :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="primary" v-for="tag in user.tags" style="margin-right: 6px;margin-top: 6px">
        {{tag}}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
  </van-skeleton>
</template>

<style scoped>

</style>