<template>
  <section class="vip-more">
    <p class="vip-tip is-bold">{{ t("club.text02") }}</p>
    <p class="vip-text fs-16">{{ t("club.text03") }}</p>
    <main-container>
      <div class="vip-tips flex-box mb-30">
        <p class="vip-title">{{t('extra.vip')}}</p>
        <p class="ml-5">{{ t("affiliate.Notification") }}</p>
      </div>
      <section  class="flex-box-between show-bg">
        <section class="show-vip-list">
          <ul class="flex-box vip-section">
            <li
              class="vip-item flex-box is-center  fs-14"
              :class="{ 'vip-item-active': item.id - 1 === index }"
              v-for="item in vipList"
              @click="index = item.id - 1"
              :key="item.id"
            >
              {{ item.code }}
            </li>
          </ul>
<!--          <el-button @click="pageTo" class="vip-button is-bold" type="primary">-->
<!--            {{ getToken() ? t("vip.UpgradeMembership") : t("vip.SignIn") }}-->
<!--          </el-button>-->
        </section>

        <section class="show-vip-data">
          <ul class="vip-data-list flex-box-between">
            <li
              class="flex-box-between data-item"
              v-for="item in vipData"
              :key="item.value"
            >
              <section class="flex-box">
                <div class="vip-info-icon flex-box">
                  <svg-icon name="vip_info"></svg-icon>
                </div>
                <section>
                  <p>{{ item.label }}</p>
                  <span class="is-bold fs-14" v-if="item.isRange">
                    {{ formatCoin(dataInfo[item.value.split(",")[0]]) }} -
                    {{ formatCoin(dataInfo[item.value.split(",")[1]]) }}
                  </span>
                  <div class="is-bold fs-14 flex-box" v-else
                  >
                    <span v-if="item.value!=='code'">
                      {{
                        isNaN(item.value)
                          ? dataInfo[item.value]
                          : formatCoin(dataInfo[item.value])
                      }}
                    </span>
                    <section v-if="dataInfo?.icon&&item.value==='code'" class="vip-icon flex-box">
                      <img :src="dataInfo?.icon" alt="dataInfo.icon" />
                      <!--          <svg-icon :name="dataInfo.id - 1"></svg-icon>-->
                    </section>
                  </div>
                </section>

              </section>

            </li>
          </ul>

        </section>
      </section>

    </main-container>
    <section class="vip-intro flex-box-between">
      <div class="show-text">
        <p class="show-title is-bold">{{ t("club.text06") }}</p>
        <p>{{ t("club.text07") }}</p>
      </div>
      <img
        class="img-promoted"
        src="../../../assets/images/vip/vip-promoted.png"
        alt=""
      />
    </section>
  </section>
</template>

<script setup>
import { formatCoin } from "../../../utils/amount-format";
import { computed, onMounted, ref } from "vue";
import { getToken } from "@/utils/permission";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const router = useRouter();
const index = ref(0);
const props = defineProps({
  vipList: {
    type: Array,
  },
  info: {
    type: Object,
  },
});
const dataInfo = computed(() => props.vipList[index.value] || {});
const vipData = [
  { label: t("additional.vipName"), value: "code" },
  { label: t("additional.range"), value: "points,tierReward", isRange: true },
  { label: t("additional.rate"), value: "pointsMultiplier" },
];
const pageTo = () => {
  if (getToken()) router.push({ name: "recharge" });
  else router.push({ name: "login" });
};
onMounted(() => {
  if (props.info.levelId) index.value = props.info.levelId - 1;
});
</script>

<style lang="scss" scoped>
.vip-more {
  margin-top: 28px;
  color: $main-color;
  .show-bg {
    //background: url(@/assets/images/vip/info-bg.png) no-repeat center center;
    //background-size: cover;
  }

  .vip-tip {
    font-size: 22px;
  }
  .vip-text {
    color: #8e99b6;
    margin: 20px 0;
  }
  .show-vip-list {
    //margin-right: 75px;
    max-width: 490px;
    .vip-section {
      flex-wrap: wrap;
      .vip-item {
        width: 106px;
        height: 32px;
        background: #14282f;
        border-radius: 16px;
        margin: 0 22px 13px 0;
        cursor: pointer;
        text-align: center;
        color: $main-text-color;
        font-size: 18px;
        &:nth-child(4n) {
          margin-right: 0;
        }
        &-active {
          background: $main-color;
          color: #fff;
        }
      }
    }
    .vip-button {
      border-radius: 23px;
      width: 220px;
      height: 46px;
      font-size: 16px;
      margin-top: 60px;
    }
  }
  .show-vip-data {
    padding: 20px;
    min-width: 500px;
    box-sizing: border-box;
    background: #213539;
    color: #B6C0C3;
    border-radius: 5px;
    position: relative;
    .vip-data-list {
      //width: 50%;
      .data-item {
        //margin-bottom: 24px;
        .vip-info-icon{
          font-size: 48px;
          margin-right: 12px;
        }

        span {
          font-size: 12px;
          color: #fff;
        }
      }
    }

  }
}
.vip-icon {
  width: 55px;
  height: 15px;
  img {
    width: 100%;
    height: 100%;
  }
}
.vip-intro {
  padding: 20px 161px 14px 64px;
  margin: 40px 0;
  background: url(@/assets/images/vip/bottom-bg.png) no-repeat center center;
  background-size: cover;
  color: $main-color;
  .show-text {
    color: #fff;
    font-size: 20px;
    max-width: 480px;
    .show-title {
      font-size: 40px;
      margin-bottom: 20px;
      color: $main-color;
    }
  }
  .img-promoted {
    width: 199px;
    height: 206px;
  }
}
.vip-tips{
  margin-bottom: 30px;
  font-weight: 400;
 font-size: 14px;
  color: #b6c0c3;
  .vip-title{
    font-size: 18px;
    color: #fff;
    font-weight: 700;
  }
}
</style>
