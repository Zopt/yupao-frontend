<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constrants/team.ts";
import ggb from "../assets/ggb.png"
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../service/user.ts";
import {useRouter} from "vue-router";

interface TeamCardListProps {  //定义一个类型
  teamList: TeamType[]
}

const showPasswordDialog = ref(false);
const password = ref("");
const JoinTeamid = ref();
const props = withDefaults(defineProps<TeamCardListProps>(), {
  //@ts-ignore
  teamList: [] as TeamType[],
});  //接受主页来的变量


const currentUser = ref();
onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

/**
 * 加入队伍
 */
const doJoinTeam = async () => {
  if (!JoinTeamid){
    return;
  }
  const res = await myAxios.post('/team/join', {
    teamId: JoinTeamid.value,
    password:password.value,
  })
  if (res?.data.code === 0) {
    showSuccessToast("加入成功");
    doCancelJoin();
  } else {
    showFailToast("加入失败" + (res.data.description ? `, ${res.data.description}` : ''));
  }
}
/**
 * 更新队伍信息
 */
const router = useRouter();
const doUpdateTeam = async (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}
/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit', {
    teamId: id
  })
  if (res?.data.code === 0) {
    showSuccessToast("退出成功");
  } else {
    showFailToast("退出失败" + (res.data.description ? `, ${res.data.description}` : ''));
  }
}
/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete', {
    id,
  })
  if (res?.data.code === 0) {
    showSuccessToast("队伍解散成功");
  } else {
    showFailToast("队伍解散失败" + (res.data.description ? `, ${res.data.description}` : ''));
  }
}

const preJoinTeam = (team:TeamType) => {
    JoinTeamid.value = team.id;
    if(team.status === 0){
      doJoinTeam();
    }else {
      showPasswordDialog.value = true;
    }
  }

const doCancelJoin = () =>{
  JoinTeamid.value = 0;
  password.value = '';
}
</script>

<template>
  <div id="teamCardList">
    <van-card v-for="team in props.teamList"
              :thumb="ggb"
              :desc="team.description"
              :title="`${team.name}`"
    >
      <template #tags>
        <van-tag plain type="primary" style="margin-right: 6px;margin-top: 6px">
          {{ teamStatusEnum[team.status] }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ `队伍人数: ${team.hasJoinNum}/${team.maxNum} `}}
        </div>
        <div v-if="team.expireTime">
          {{ '过期时间' + team.expireTime }}
        </div>
        <div>
          {{ '创建时间' + team.createTime }}
        </div>
      </template>
      <template #footer>
        <van-button v-if="team.hasJoin" size="small" type="primary" plain @click="doQuitTeam(team.id)">退出队伍
        </van-button>
        <van-button v-if="team.createUser?.id === currentUser?.id" size="small" type="danger" plain
                    @click="doDeleteTeam(team.id)">解散队伍
        </van-button>
        <van-button v-if="team.createUser?.id !== currentUser?.id && !team.hasJoin" size="small" type="primary" plain
                    @click="preJoinTeam(team)">加入队伍
        </van-button>
        <van-button v-if="team.createUser?.id === currentUser?.id" size="small" type="success" plain
                    @click="doUpdateTeam(team.id)">更新队伍
        </van-button>
      </template>
    </van-card>
    <van-dialog v-model:show="showPasswordDialog" title="输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doCancelJoin">
      <van-field v-model="password" label="密码" placeholder="请输入密码"/>
    </van-dialog>
  </div>

</template>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}

</style>