<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";
import {ref} from 'vue'
const router = useRouter()  //useRoute是当前路由对象，useRounter是路由器对象


/**
 * 搜索队伍
 */

const searchText = ref('');

const searchTeam = async (val = '') => {
  const res = await myAxios.get("/team/list/my/join",{
    params:{
      searchText: val,
      pageNum:1,
    },
  });
  if(res?.data.code == 0 ){
    teamList.value = res.data.data;
  }else{
    showFailToast("加载队伍失败，请刷新重试")
  }
}

const onSearch =  (val:string) => {
  searchTeam(val)
};
const teamList = ref([]);
// 只会在页面加载的时候触发一次
onMounted( () => {
  searchTeam()
})


</script>

<template>
  <div id="teamPage" >
    <van-search v-model="searchText" placeholder="请输入要搜索的队伍名称"  @search="onSearch" />
    <team-card-list :team-list="teamList"></team-card-list>
    <van-empty v-if="teamList?.length < 1" description="没有相关队伍信息" />
  </div>
</template>

<style scoped>
#teamPage {
  width: 100%;
}


</style>