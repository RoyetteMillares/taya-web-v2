<template>
  <section>
    <div class="promote-bg">
      <d2-container>
        <div class=" game-text" >
          <p class="bg-title is-bold">{{ t('menu.Promotions') }}</p>
          <p>{{t('extra.promoText')}}</p>
        </div>
      </d2-container>
    </div>
    <d2-container class="promote-page">
      <div class="about-content">
        <div class="post-news">
          <div class="posts">
            <transition-group enter-active-class="animated rotateInDownLeft" appear>
              <div
                class="posts-item"
                :key="obj.id"
                v-for="obj in state.dataList"
                @click="lookInfo(obj)"
              >
                <div class="item-content">
                  <div class="flex-box">
                    <img v-splicing="obj.img" alt="" />
                  </div>

                  <div class="item-content-desc">
                    <div class="item-title">
                      <span>{{ obj.codeZh || "-" }}</span>
                      <b
                      >{{ t("bet.betrecord.Time") }}:
                        {{ dateTime(obj.startedAt) }}
                        -
                        {{ dateTime(obj.endedAt) }}</b
                      >
                    </div>
                  </div>
                </div>
              </div>
            </transition-group>

          </div>
        </div>
      </div>
<!--      <el-tabs class="about-tabs">-->
<!--        <el-tab-pane :key="item.id"  v-for="item in state.dataList">-->
<!--          &lt;!&ndash;        <template #label>&ndash;&gt;-->
<!--          &lt;!&ndash;          <span class="item">{{ item.codeZh }}</span>&ndash;&gt;-->
<!--          &lt;!&ndash;        </template>&ndash;&gt;-->
<!--          <div class="about-content">-->
<!--            <div class="post-news">-->
<!--              <div class="posts">-->
<!--                <transition-group enter-active-class="animated rotateInDownLeft" appear>-->
<!--                  <div-->
<!--                    class="posts-item"-->
<!--                    :key="obj.id"-->
<!--                    v-for="obj in item.promotionsResDtoList"-->
<!--                    @click="lookInfo(obj)"-->
<!--                  >-->
<!--                    <div class="item-content">-->
<!--                      <div class="flex-box">-->
<!--                        <img v-splicing="obj.img" alt="" />-->
<!--                      </div>-->

<!--                      <div class="item-content-desc">-->
<!--                        <div class="item-title">-->
<!--                          <span>{{ obj.codeZh || "-" }}</span>-->
<!--                          <b-->
<!--                          >{{ t("bet.betrecord.Time") }}:-->
<!--                            {{ dateTime(obj.startedAt) }}-->
<!--                            - -->
<!--                            {{ dateTime(obj.endedAt) }}</b-->
<!--                          >-->
<!--                        </div>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </transition-group>-->

<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-tab-pane>-->
<!--      </el-tabs>-->
      <CheckDetails :getList="getList" :info="state.info" v-model="state.show" />
    </d2-container>
  </section>

</template>

<script setup>
import { reactive, onMounted} from "vue";
import { useRouter } from "vue-router";
import { setLocalStorage } from "@/utils/localstore-util";
import { $post } from "@/request/index";
import { dateTime } from "@/utils/date-filter";
import {useI18n} from "vue-i18n";
import CheckDetails from "./check-details.vue"
const {t} = useI18n()
const state = reactive({
  dataList: [],
  page: 1,
  total: 30,
  size: 10,
  info:{},
  show:false
});

async function getList() {
  let { data } = await $post("getPromoteList");
  const list=[]
  // data.forEach((item) => {
  //   item.promotionsResDtoList.forEach(val => {
  //     list.push(val)
  //   })
  // })
  state.dataList = data;
}

const lookInfo = item => {
  state.info = item;
  state.show = true
}
const router = useRouter();
const pageTo = (data) => {
  setLocalStorage("promote-detail", data);
  router.push("promote-detail");
};
onMounted(() => {
  getList();
})
</script>

<style lang="scss" scoped>
.promote-page {
  margin-top: -100px;
  .post-news {
    .posts {
      margin-bottom: 30px;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      .posts-item {
        cursor: pointer;
        width: calc(50% - 10px);

        img {
          height: 214px;
          width: 100%;
          object-fit: cover;
        }

        .item-content {
          border-radius: 12px;
          //background: #2b3547;
          //margin: 0px;
          overflow: hidden;

          .item-title {
            color: #ffffff;
            font-size: 16px;
            display: flex;
            align-items: center;

            b {
              margin-left: auto;
              height: 30px;
              //padding: 0 10px;
              //border: 1px solid #11b85a;
              //border-radius: 16px;
              //font-weight: normal;
              color: #b6c0c3;
              font-size: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }

          .item-subtitle {
            color: #8e99b6;
            line-height: 18px;
            font-size: 12px;
          }

          .item-content-desc {
            background: #0c2930;
            border-radius: 0px 0px 12px 12px;
            padding: 10px 20px;
          }
        }
      }
    }
  }

  .about-content {
    border-radius: 20px;
  }

  .about-content2 {
    margin-bottom: 20px;
  }

  .p {
    font-size: 14px;
    padding-top: 15px;
    color: $main-text-color;
    line-height: 20px;
    display: flex;
  }

  .about-tabs {
    .item {
      font-size: 14px;
      padding: 9px 26px;
      color: #B6C0C3;
      background: #213539;
      border-radius: 8px;
      //height: 32px;
      //display: flex;
      //justify-content: center;
      //align-items: center;
    }

    :deep {
      .el-tabs__nav-wrap::after {
        height: 0;
      }

      .el-tabs__header {
        margin-left: -8px;
      }

      .el-tabs__nav {
        .el-tabs__item {
          padding: 0 10px;
        }

        .el-tabs__active-bar {
          display: none;
        }

        .el-tabs__item.is-active {
          .item {
            background: $main-button-bg;
            color: white;
            font-weight: bold;
          }
        }
      }
    }
  }
}
.promote-bg{
  background: url("@/assets/images/common/promote.png") no-repeat center center;
  background-size: cover;
  height: 500px;
  padding-top: 50px;
}
.game-text{
  max-width: 60%;
  color: var(--theme-main-color);
  font-size: 30px;
  .bg-title{
    font-size: 60px;
    margin-bottom: 10px;
    color: #fff;
  }
}
</style>
