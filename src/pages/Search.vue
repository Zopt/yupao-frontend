<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router'
      const router = useRouter();

      const originTagList = [
        {
          text: '年级',
          children: [
            { text: '大一', id: '大一' },
            { text: '大二', id: '大二' },
            { text: '大三', id: '大三'},
          ],
        },
        {
          text: '方向',
          children: [
            { text: 'Java', id: 'Java' },
            { text: 'Python', id: 'Python' },
            { text: 'C++', id: 'C++' },
          ],
        },
        { text: '性别',
          children: [
            { text: '男', id: '男' },
            { text: '女', id: '女' },
          ],
        }
      ];

      let TagList = ref(originTagList);
      const searchText = ref('');
      const onSearch = () => {
       TagList.value = originTagList.map(parentTag => {
             const tempChildren = [...parentTag.children];
             const tempParentTag = {...parentTag};
             tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
             return tempParentTag;
           })

      };
      const onCancel = () => {
        searchText.value = "";
        TagList.value = originTagList;
      };


      const show = ref(true);


      const activeIds = ref([]);
      const activeIndex = ref(0);
/**
 *
 */
const deSearchResult = () => {
  router.push({
      path: '/user/list',
      query: {
        tags:activeIds.value
      }
  })
}



//删除标签
const doClose = (tag:string) => {
  activeIds.value = activeIds.value.filter(item => {
    return item != tag;
  })
}
</script>

<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
  >
    已选择的标签
  </van-divider>
  <van-row gutter="3">
    <van-col v-for="tag in activeIds" >
      <van-tag  :show="show" closeable size="medium" type="primary" @close="doClose(tag)">
        {{tag}}
      </van-tag>
    </van-col>
  </van-row>


  <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
  >
    可选择的标签
  </van-divider>

  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="TagList"
  />
  <div style="padding: 12px">
    <van-button block type="primary" @click="deSearchResult">搜素</van-button>
  </div>
</template>

<style scoped>

</style>