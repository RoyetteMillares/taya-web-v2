<template>
  <d2-container class="flex-box-between news-page">
    <ul class="category-ul">
      <li @click="navChange(navs)" :class="{'active-tab':activeName===navs.code}" v-for="(navs, index) in nav"
           :key="navs.code">{{navs.title}}</li>
    </ul>
    <section class="news-content">
      <ul class="game-model">
        <li class="news-item cursor flex-box" v-for="item in dataList"  @click="pageTo(item.title, item)" >
          <img v-realImg="item.image" alt="" class="news-banner" />
          <section class="news-info">
            <div class="item-title">{{ item.title }}</div>
            <div class="item-subtitle ellipsis-2">{{ item.titleSub }}</div>
            <p class="item-tile">{{timeForMat(item.createdAt)}}</p>
          </section>
        </li>
      </ul>
      <customPagination
        @handleCurrentChange="getList"
        :total="state.total"
        v-model:size="state.size"
        v-model:page="state.page"
      />
    </section>
              <!--    <div class="blog-page">-->
<!--      <el-tabs class="about-tabs" v-model="activeName" @tab-change="navChange">-->
<!--        <el-tab-pane-->
<!--          :name="navs.code"-->
<!--          v-for="(navs, index) in nav"-->
<!--          :key="navs.code"-->
<!--        >-->
<!--          <template #label>-->
<!--            <span class="item">{{ navs.title }}</span>-->
<!--          </template>-->
<!--          <div class="about-content">-->
<!--            <div class="new-main" v-if="index === 0 && state.page == 1">-->
<!--              <div class="new-big-main">-->
<!--                <div class="about-title">{{t("blog.latestNews")}}</div>-->
<!--                <img-->
<!--                  v-realImg="newBigMain.item.image"-->
<!--                  src=""-->
<!--                  alt=""-->
<!--                  @click="pageTo('blog-detail', newBigMain.item)"-->
<!--                />-->
<!--                <div class="newTitle">-->
<!--                  <div class="title ellipsis-2">{{ newBigMain.item.title }}</div>-->
<!--                  <div class="title-sub ellipsis-2">-->
<!--                    {{ newBigMain.item.titleSub }}-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->

<!--              <div class="new-big-main-right">-->
<!--                <div class="about-title">{{t("blog.highlights")}}</div>-->
<!--                <div class="new-silder-items">-->
<!--                  <div-->
<!--                    @click="pageTo('blog-detail', item)"-->
<!--                    class="item-slider-new"-->
<!--                    v-for="item in newSilderItems"-->
<!--                  >-->
<!--                    <div class="l">-->
<!--                      <img v-realImg="item.image" alt="" />-->
<!--                    </div>-->
<!--                    <div class="r ellipsis-2">{{ item.title }}</div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->

<!--            <div class="post-news">-->
<!--              <div-->
<!--                class="about-title about-title3"-->
<!--                v-if="index === 0 && state.page == 1"-->
<!--              >-->
<!--                {{t("blog.previousNews")}}-->
<!--              </div>-->

<!--              <div class="posts">-->
<!--                <div class="posts-item" v-for="item in dataList">-->
<!--                  <div class="item-content" @click="pageTo('blog-detail', item)">-->
<!--                    <img v-realImg="item.image" alt="" class="banner" />-->

<!--                    <div class="item-content-desc">-->
<!--                      <div class="item-title ellipsis-2">{{ item.title }}</div>-->
<!--                      <div class="item-subtitle ellipsis-2">-->
<!--                        {{ item.titleSub }}-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--              <customPagination-->
<!--                @handleCurrentChange="getList"-->
<!--                :total="state.total"-->
<!--                v-model:size="state.size"-->
<!--                v-model:page="state.page"-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-tab-pane>-->
<!--      </el-tabs>-->
<!--    </div>-->
  </d2-container>

</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { setLocalStorage } from "@/utils/localstore-util.js";
import { deepCopy } from "@/utils/localstore-util.js";
import { customPopup } from "../../components/custom-popup";
import { $post } from "@/request/index.js";
import { inject, computed } from "vue";
import { useI18n } from "vue-i18n";
import {dateTime} from "../../utils/date-filter";
import {timeForMat} from "../../utils/date-filter";

const { t } = useI18n();

const init = true;
const activeName = ref("");
const dataList = ref([]);
const state = reactive({
  name: "Blog",
  page: 1,
  total: 0,
  size: 12,
});
const nav = ref([{ code: "all", title: t('public.All') }]);
let newBigMain = reactive({
  item: {},
});
const formParms = {
  current: 1,
  size: 12,
  data: {
    category: "",
  },
};

const newSilderItems = ref([]);

async function getDict() {
  let { data } = await $post("getDictionary", {
    category: "dic_blog_category",
  });
  nav.value.push(...data.dic_blog_category);
  activeName.value = "all";
  // getRecommend();
  getList();
}

const getRecommend = function () {
  // let param = { nums: 4 };
  // $post("blogRecommend", param).then(({ data }) => {
  //   if (data && data.length) {
  //     let item = data.shift();
  //     newBigMain.item = item;
  //     newSilderItems.value = data;
  //   }
  // });
};

const getList = function (currentPage = 1) {
  Object.assign(formParms, {
    current: currentPage,
    data: {
      category: activeName.value == "all" ? "" : activeName.value,
    },
  });
  $post("blog", formParms).then(({ data }) => {
    if (data && data.list) {
      dataList.value = data.list;
      // state.page = data.current;
      // state.size = +data.size;
      state.total = +data.total;
    }
  });
};

const getSearchData = function (title) {
  const params = {
    current: 1,
    size: 12,
    data: {
      title: title,
    },
  }
  $post("blogSearch", params).then(({ data }) => {
    if (data && data.list.length) {
      setLocalStorage("blogSearchDetail", {...data, title: title})
      router.push({name: "searchData"})
    } else {
      customPopup(t("blog.noData"));
    }
  });
};

/*async function getRecommend() {
      let param = {nums: 0}
      let { data } = await $post("blogRecommend", param);
      console.log(data);
    //   if (data && data.list && data.list.length) {
        // let item = data.list.shift();
        // newBigMain.item = item;
        // newSilderItems.value = data.list;
    //   }
    }*/
// getRecommend();

const navChange = function (val) {
  // if (activeName.value == nav.value[0].code) {
  //   getRecommend();
  // }
  console.log(val);
  activeName.value=val.code
  getList();
};

const router = useRouter();
const pageTo = (route, data) => {
  setLocalStorage("blogDetail", data);
  router.push( `blog-detail/${route}` );
};

onMounted(async () => {
  getDict();
  //   await getRecommend()
});

const global = inject("global", {});
const globalSearch = computed(() => global);

const getData = (val) => {
  getSearchData(val)
};
globalSearch.value.getSearchFunction(getData);
</script>

<style lang="scss" scoped>


.news-page{
  align-items: flex-start;
  margin-top: 40px;

}
.category-ul{
  background: $main-container-inner-bg;
  border-radius: 20px;
  padding: 20px 10px;
  min-width: 200px;
  box-sizing: border-box;
  margin-right: 20px;
  li{
    padding: 11px;
    font-size: 16px;
    color: #b6c0c3;
    font-weight: 400;
    border-radius: 23px;
    text-align: center;
    cursor: pointer;
  }
  .active-tab{
    background: $main-button-bg;
    color: #fff;
  }
}
.news-content{
  padding: 40px;
  background: $main-container-inner-bg;
  border-radius: 20px;
  flex: 1;
  .game-model{
    margin-bottom: 20px;
    .news-item{
      padding: 10px 0;
      border-bottom: 1px solid #242d31;
      .news-banner{
        width: 239px;
        height: 148px;
        border-radius: 12px;
      }
      .news-info{
        margin-left: 20px;
        cursor: pointer;
        .item-title{
          font-size: 18px;
          font-weight: 700;
          text-align: left;
          color: $main-color;
          margin-bottom: 16px;
        }
        .item-subtitle{
          color: #34b8d5;
          font-size: 14px;
          font-weight: 400;
          min-height: 73px;
        }
        .item-tile{
          color: #b6c0c3;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
