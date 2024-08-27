<script setup lang="ts">

import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast} from "vant";


const searchText = ref('');
const teamList = ref([]);
const searchTeam = async (val = '',status = 0) => {
  const res = await myAxios.get("/team/list",{
    params:{
      searchText: val,
      pageNum:1,
      status,
    },
  });
  if(res?.data.code == 0 ){
    teamList.value = res.data.data;
  }else{
    showFailToast("加载队伍失败，请刷新重试")
  }
}
const onChange = (name) =>{
  if(name === 'public'){
    searchTeam(searchText.value,0);
  }else {
    searchTeam(searchText.value,2);
  }
}

const onSearch =  (val) => {
  searchTeam(val)
};

const active = ref('public');

// 只会在页面加载的时候触发一次
onMounted( () => {
  searchTeam()
})


</script>

<template>
  <div id="teamPage" >
    <van-search v-model="searchText" placeholder="请输入要搜索的队伍名称"  @search="onSearch" />
    <van-tabs v-model:active="active" @change="onChange">
      <van-tab title="公开" name="public"/>
      <van-tab title="加密" name="secret"/>
    </van-tabs>
    <team-card-list :team-list="teamList"></team-card-list>
    <van-empty v-if="teamList?.length < 1" description="没有相关队伍信息" />
  </div>
</template>

<style scoped>
#teamPage {
  width: 100%;
}


</style>