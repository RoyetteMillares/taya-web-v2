<template>
  <d2-container>

    <div class="blog-detail-page">
      <div class="blog-detail-content">
        <p class="is-active fs-18 cursor mt-10">返回上一页</p>
        <h2>{{ detail.codeZh }}</h2>
        <img v-splicing="detail.img" alt="" />
        <div class="activity">{{t('promote.title')}}</div>
        <div class="detail-content" v-html="detail.descript"></div>
        <div class="apply-now">
          <button
            class="apply-now-btn"
            :disabled="!detail.isActivated"
            @click="applyPromotion"
          >
           {{ info.isActivated!==1 ? t('promote.button01') : t('promote.button02') }}
          </button>
        </div>
      </div>
    </div>
  </d2-container>

</template>

<script setup>
import { $post } from "@/request/index";
import { setLocalStorage, getLocalStorage } from "@/utils/localstore-util";
// import { ElMessage } from "element-plus";
import { customPopup } from "../../components/custom-popup";
import { reactive } from "vue";
import { useI18n } from "vue-i18n";
import {dialogConfirm} from "../../components/custom-dialog";

const { t } = useI18n()
const detail = reactive(getLocalStorage("promote-detail"));

async function applyPromotion() {
  let { code } = await $post("applyPromotion", { id: detail.id });
  if (code === 0) {
    applySuccess()

  }else if(code===70316){
    dialogConfirm(msg,
      t('public.Reminder'),
      {
        showCancelButton:true,
        cancelText:t('extra.giveUp'),
        // confirmText:t('extra.giveUp')
      }).then(async ()=>{
      const data=await user.APPLY_PROMOTION({ id: detail.id })
      if(data.code===0) applySuccess()
    })
  }
}
const applySuccess=()=>{
  detail.isActivated = !detail.isActivated;
  setLocalStorage("promote-detail", detail);
  customPopup(t("promote.tooltip"),"",{isSuccess: true});
}
</script>

<style lang="scss" scoped>
.blog-detail-page {
  //margin-top: 30px;
  padding-bottom: 100px;
  .blog-detail-content {
    //margin: 0 auto;
    //width: 800px;

    .activity {
      color: #fff;
      line-height: 50px;
      padding-left: 30px;
      font-size: 20px;
      background: linear-gradient(92deg, #232a33 3%, #1a212a 99%);
      border-radius: 6px;
    }

    .detail-content {
      margin-top: 30px;
      font-size: 20px;
      font-family: AvertaStd-Regular, AvertaStd-Regular-☞;
      font-weight: normal;
      text-align: left;
      color: #8e99b6;
      line-height: 36px;
    }

    img {
      width: 100%;
      height: auto;
      border-radius: 12px;
      margin-bottom: 40px;
      margin-top: 60px;
    }

    h2 {
      color: #ffffff;
      line-height: 36px;
      font-size: 22px;
    }

    .apply-now {
      padding-top: 50px;
      text-align: center;

      .apply-now-btn {
        width: 223px;
        height: 50px;
        background: $main-button-bg;
        border-radius: 6px;
        font-size: 16px;
        color: #fff;
        border: none;
        cursor: pointer;

        &[disabled] {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>
