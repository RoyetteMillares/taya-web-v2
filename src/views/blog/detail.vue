<template>
  <d2-container>
    <div class="blog-detail-page">

      <main-container class="main-page">
        <p class="flex-box news-title mb-10">
          <span>{{ t('extra.current') }}:</span>
          <span @click="router.push({name:'blog'})" class="cursor">{{ t("blog.BlogNews") }} > </span>
          <span class="news-actives">{{ t("blog.BlogDetail")}} / {{ detail.title  }}</span>
        </p>
        <div class="blog-detail-content">
          <h2>{{detail.title}}</h2>
          <div class="time">
            <!-- {{detail.titleSub}} -->
            <span class="lebel">{{t("blog.releaseTime")}}:</span>
            <span>{{dateTime(detail.updatedAt)}}</span>
          </div>
          <!-- <img v-if="detail.image" v-splicing="detail.image" alt=""> -->
          <div class="detail-content" v-html="detail.content"></div>
        </div>
      </main-container>
    </div>
  </d2-container>

</template>

<script setup>
import {getLocalStorage} from "@/utils/localstore-util.js";
import { useI18n } from "vue-i18n";
import {dateTime} from "../../utils/date-filter";
import {useRouter} from "vue-router";
const router=useRouter()
let detail = getLocalStorage('blogDetail');
const { t } = useI18n();

</script>

<style lang="scss" scoped>
.blog-detail-page {
  margin-top: 30px;
  .main-page{
    padding: 30px 40px;
    .news-title{
      color: #b6c0c3;
      font-size: 14px;
      .news-actives{
        color: #fff;
      }
    }
  }
  .blog-detail-content {
    margin: 0 auto;
    //width: 800px;

    .detail-content{
      margin-top: 20px;
      font-size: 20px;
      font-family: AvertaStd-Regular, AvertaStd-Regular-☞;
      font-weight: normal;
      text-align: left;
      color: #8e99b6;
      line-height: 36px;

    }

    img {
      width: 100%;
      border-radius: 12px;
    }

    .time {
      color: #8e99b6;
      line-height: 14px;
      font-size: 12px;
      font-weight: normal;
      padding-top: 15px;
      padding-bottom: 26px;
    }
    .lebel{
        margin-right: 4px;
    }

    h2 {
      color: #ffffff;
      line-height: 36px;
      font-size: 22px;
    }

  }

}
</style>
