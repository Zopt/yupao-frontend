<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref} from 'vue';
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../service/user.ts";



const onSubmit = async () => {
  const currentUsers = await getCurrentUser();
  if (!currentUsers) {
    showFailToast("用户未登录");
    return;
  }
  // console.log(currentUsers,"currentUsers");
  const res = await myAxios.post("/user/update", {
    'id':currentUsers.id,
    [editUser.value.editKey as string]: editUser.value.currentValue
  })
  // console.log(res,"更新请求");
  if (res.data.code === 0 && res.data.data > 0 ){
    showSuccessToast("修改成功");
    history.back();
  }else {
    showFailToast("修改失败")
  }
  // console.log('submit', editUser.value.currentValue);
};

const route = useRoute();
const editUser = ref({
    editKey: route.query.editKey,
    currentValue: route.query.currentValue,
    editName: route.query.editName,
})



</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
          :rules="[{ required: true, message: '请填写正确的值' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>