<template>
  <div class="post-news">
    <div class="posts">
      <div class="posts-item" v-for="item in dataList">
        <div class="item-content" @click="pageTo('blogDetails', item)">
          <img v-realImg="item.image" alt="" class="banner" />

          <div class="item-content-desc">
            <div class="item-title ellipsis-2">{{ item.title }}</div>
            <div class="item-subtitle ellipsis-2">
              {{ item.titleSub }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <customPagination
      @handleCurrentChange="getSearchData"
      :total="state.total"
      v-model:size="state.size"
      v-model:page="state.page"
    />
    <no-data
      v-show="!dataList.length"
      type="collection"
      class="empty-tip"
      :text="t('noData.blog')"
    ></no-data>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getLocalStorage, setLocalStorage } from "@/utils/localstore-util.js";
import { customPopup } from "../../components/custom-popup";
import { inject, computed } from "vue";
import { $post } from "@/request/index.js";
import { useI18n } from "vue-i18n";
const {t} = useI18n()

const dataList = ref([]);
const state = reactive({
  name: "BlogSearchData",
  page: 1,
  total: 15,
  size: 12,
});
const formParms = reactive({
  current: 1,
  size: 12,
  data: {
    title: "",
  },
});

onMounted(async () => {
  const data = getLocalStorage("blogSearchDetail")
  dataList.value = data.list;
  state.page = data.current;
  state.size = +data.size;
  state.total = +data.total;
  formParms.data.title = data.title
});

const getSearchData = function (currentPage = 1) {
  formParms.current = currentPage
  $post("blogSearch", formParms).then(({ data }) => {
    if (data && data.list) {
      dataList.value = data.list;
      state.page = data.current;
      state.size = +data.size;
      state.total = +data.total;
    } else {
      customPopup(t('blog.noData'));
    }
  });
};

const router = useRouter();
const pageTo = (route, data) => {
  setLocalStorage("blogDetail", data);
  router.push({ name: route });
};

const global = inject("global", {});
const globalSearch = computed(() => global);

const getData = (val) => {
  formParms.data.title = val
  getSearchData()
};
globalSearch.value.getSearchFunction(getData);
</script>

<style lang="scss" scoped>
.post-news {
  background: #1a212a;
  border-radius: 20px;
  padding: 30px;
  margin-top: 30px;
  .about-title3 {
    padding-top: 30px;
  }
  .posts {
    margin-bottom: 30px;
    display: flex;
    flex-wrap: wrap;

    .posts-item {
      // flex: 1 0 368px;
      width: 33.33%;

      img {
        height: 192px;
        max-width: 100%;
      }

      .item-content {
        background: #232a33;
        margin: 7px;
        cursor: pointer;
        border-radius: 12px 12px 0px 0px;
        overflow: hidden;

        .banner {
          width: 100%;
        }
        .item-title {
          height: 36px;
          color: #ffffff;
          font-size: 16px;
          line-height: 18px;
        }

        .item-subtitle {
          margin-top: 6px;
          height: 30px;
          color: #8e99b6;
          line-height: 15px;
          font-size: 12px;
        }

        .item-content-desc {
          padding: 8px;
          word-break: break-all;
        }
      }
    }
  }
}

.post-news2 {
  padding-top: 0;
}
// .p {
//   font-size: 14px;
//   padding-top: 15px;
//   color: $main-text-color;
//   line-height: 20px;
//   display: flex;
// }
.ellipsis-2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
