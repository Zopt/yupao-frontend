<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showLoadingToast, showSuccessToast} from "vant";

const router = useRouter();
const route = useRoute();
const result = ref('');


const id = route.query.id;
const addTeamData = ref({})


onMounted(async () => {
// 获取当前用户修改的队伍信息
  const res = await myAxios.get("/team/get", {
    params: {
      id,
    },
  });
  if (res?.data.code === 0) {
    addTeamData.value = res.data.data;
  } else {
    showFailToast("加载队伍失败，请刷新重试")
  }
})

const onsubmit = async () => {
  const postData = {
    ...addTeamData.value,
    expireTime: new Date(result.value).toISOString(),
    status: Number(addTeamData.value.status)
  };

  const res = await myAxios.post("/team/update", postData)
  if (res?.data.code === 0 && res.data) {
    showSuccessToast("更新成功",);
    router.push({
      path: '/team',
      replace: true
    });
  } else {
    showFailToast("更新失败");
  }

}

const onConfirm = ({selectedValues}) => {
  result.value = selectedValues.join('/');
  showPicker.value = false;
};

const showPicker = ref(false);
const minDate = new Date();
const clearInput = () => {
  addTeamData.value.password = "";
};
</script>

<template>
  <div id="teamAdd">
    <van-form @submit="onsubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="队伍名"
            placeholder="请输入队伍名"
            :rules="[{ required: true, message: '请输入队伍名' }]"
        />
        <van-field
            v-model="addTeamData.description"
            rows="1"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍描述"
        />
        <van-field
            v-model="result"
            is-link
            readonly
            name="datePicker"
            label="过期时间"
            placeholder="点击选择过期时间"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker
              type="datetime"
              title="请选择过期时间"
              @confirm="onConfirm"
              @cancel="showPicker = false"
              :min-date="minDate"
          />
        </van-popup>


        <van-field label="队伍状态选择">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field v-if="addTeamData.status == 2"
                   v-model="addTeamData.password"
                   type="password"
                   name="userPassword"
                   label="密码"
                   placeholder="输入队伍密码"
                   :rules="[{ required: true, message: '请填写密码' }]"
        />


      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>

</template>

<style scoped>
#teamPage {
  width: 100%;
}
</style>