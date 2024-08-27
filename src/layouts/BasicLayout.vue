<template>
  <van-nav-bar
      :title="title"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
    <div id="content" />
  </van-nav-bar>

  <div id="content">
     <router-view/>
  </div>

  <van-tabbar route  >
    <van-tabbar-item to="/" icon="home-o">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="friends-o">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="setting-o">个人中心</van-tabbar-item>
  </van-tabbar>

</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {ref} from "vue";
import routes from "../config/routes.ts";
const router = useRouter();
const DEFAULT_TITLE = "伙伴匹配"
const title = ref(DEFAULT_TITLE);

/**
 * 根据路由切换标题
 */

router.beforeEach((to) =>{
  const toPath = to.path;
  const route = routes.find((route) =>{
    return toPath == route.path;
  })
 title.value = route?.title ?? DEFAULT_TITLE;
})

const onClickLeft = () => history.back();
const onClickRight = () => router.push('/search')


</script>


<style >
#content{
  padding-bottom: 50px;
}
</style>