<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../service/user.ts";
import {useRouter} from "vue-router";

const router = useRouter();

const user = ref();
const register = () => {
  router.push({
    path: '/user/register',
  })
}

const login = () => {
  router.push({
    path: '/user/login',
  })
}
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
  <div style="text-align: center">
    <van-button
        plain
        icon="https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png"
        type="primary"
        style="margin: 30px"
        @click="register"
    >
      注册
    </van-button>
  </div>
  <div style="text-align: center">
    <van-button
        plain
        icon="https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png"
        type="success"
        style="margin: 20px;"
        @click="login"
    >
      登录
    </van-button>
  </div>
</template>
<style scoped>

</style>