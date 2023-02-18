<template>
  <div class="affiliate-banner">
    <d2-container>
      <div class="title-affiliate is-bold">{{ t("affiliate.banner.agencyEarnings") }}</div>
      <p class="affiliate-text">
        {{ t("affiliate.banner.text") }}
      </p>
      <el-button  @click="router.push('/commissionRules')" class="primary-btn  xis-bold" type="primary">
        {{ t("extra.rule") }}
      </el-button>
    </d2-container>

    <d2-container class="flex-box mt-affiliate">
      <main-container class="affiliate-container">
        <div class="flex-box-between mb-20">
          <div class="title">
            {{ t("affiliate.banner.TeamBenefits") }}
          </div>
          <p class="fs-14 affiliate-notice">{{ t("affiliate.Notification") }}</p>
        </div>
        <div class="flex-box-between">
          <section>
            <div class="text-box">
              <div class="item">
                <p>{{ t("affiliate.banner.AddAnAgentToday") }}</p>
                <span>
          <!-- 今日新增代理 -->
          {{ teamBenefitsObj?.todayIncreaseAgentNum }}
        </span>
              </div>
              <div class="item">
                <p>{{ t("affiliate.banner.NumberOfAgents") }}</p>
                <span>
          <!-- 总代理人数 -->
          {{ teamBenefitsObj?.totalAgentNum }}
        </span>
              </div>
            </div>
            <div class="text-box mt-20">
              <div class="item">
                <p>{{ t("affiliate.banner.TotalCommission") }}</p>
                <span v-if="teamBenefitsObj?.totalCommission">
          <!-- 总佣金 -->
          {{ teamBenefitsObj?.totalCommission }}
          {{ walletList?.mainCurrency }}
        </span>
              </div>
              <div class="item">
                <p>{{ t("affiliate.banner.AllowWithdrawal") }}</p>
                <span v-if="teamBenefitsObj?.allowWithdrawal">
          <!-- 佣金可提现金额 -->
          {{ teamBenefitsObj?.allowWithdrawal }}
          {{ walletList?.mainCurrency }}
        </span>
              </div>
            </div>
          </section>
          <div class="button-box">
            <el-button
              type="primary"
              class="btn primary mb-15"
              @click="withdrawal('withdrawReal')"
            >
              {{ t("affiliate.banner.Withdrawal") }}
            </el-button>
            <el-button type="primary" class="btn default" @click="transfer()">
              {{ t("affiliate.banner.Transfer") }}
            </el-button>
          </div>
        </div>


      </main-container>
      <main-container class="invite-info">
        <p class="invite-code">{{t('extra.invite')}}</p>
        <p class="text is-label">{{ t("affiliate.invitationCodeLink.InvitationCode") }}</p>
        <div class="flex-box is-active mt-10 cursor" @click="copy(InvitationCode, 'Invitation Code')">
          <span >{{InvitationCode}}</span>
          <div class="copy-btn ml-10">
            <svg-icon class="icon" name="copy"></svg-icon>
          </div>
        </div>
        <div class="item-link">
          <p class="text mb-10 is-label">{{ t("affiliate.invitationCodeLink.InviteLink") }}</p>
          <div class="flex-box is-active">
            <span @click="handleCopy(InviteLink, 'Invite Link')">{{InviteLink}}</span>
            <div class="copy-btn  ml-10"
                 @click="handleCopy(InviteLink, 'Invite Link')"
            >
              <svg-icon class="icon" name="copy"></svg-icon>
            </div>
          </div>

        </div>
      </main-container>
    </d2-container>

    <custom-dialog
      v-model="visible"
      :title="t('affiliate.banner.Transfer')"
      :showFooter="false"
    >
      <Transfer :mainWallet="teamBenefitsObj" v-model="visible" />
    </custom-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, inject, watch, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useWallet } from "../../../store/wallet";
import { useAppStore } from "../../../store/app";
import Transfer from "./transfer-input.vue";
import { customPopup } from "../../../components/custom-popup";
import { $post } from "@/request/index";
import { useI18n } from "vue-i18n";
// import { formatCoin } from "../../../utils/amount-format";
import {copy} from "../../../utils";
import {useUserStore} from "../../../store/user";

const { t } = useI18n();
const visible = ref(false);
const minCoin = ref(0);
const teamBenefitsObj = ref({});
const router = useRouter();
const user=useUserStore()
const wallet = useWallet();
const walletList = computed(() => wallet.walletList);
const InvitationCode=computed(()=>user.info?.promoCode);
const InviteLink=computed(()=>`${window.location.origin}/register?promoCode=${user.info?.promoCode}`)
const handleCopy = async (val, label) => {
  await copy(val);
};
// 提款最小额度
const minCoinLimit = async () => {
  let init = useAppStore().config;
  if (!init.length) {
    await useAppStore().GET_CONFIG();
    init = useAppStore().config;
  }
  minCoin.value = init.find((item) => item.title === "minCoin")?.value;
};

const transfer = async () => {
  await minCoinLimit();
  if (
    Number(teamBenefitsObj.value?.allowWithdrawal) > 0 &&
    Number(teamBenefitsObj.value?.allowWithdrawal) >= Number(minCoin.value)
  ) {
    visible.value = true;
  } else {
    customPopup(t("additional.minimumAmountIs"), minCoin.value);
  }
};

const withdrawal = async (name) => {
  await minCoinLimit();
  if (
    Number(teamBenefitsObj.value?.allowWithdrawal) > 0 &&
    Number(teamBenefitsObj.value?.allowWithdrawal) >= Number(minCoin.value)
  ) {
    router.push({ name, query: { type: "commission" } });
  } else {
    customPopup(t("additional.minimumAmountIs"), minCoin.value);
  }
};

const teamBenefits = async () => {
  await $post("teamBenefits").then((res) => {
    if (res?.code === 0) {
      teamBenefitsObj.value = res?.data ?? {};
    }
  });
};

watch(
  () => visible.value,
  () => {
    teamBenefits();
  }
);

onMounted(async () => {
  wallet.GET_USER_BALANCE();
  await teamBenefits();
});
</script>

<style lang="scss" scoped>
.affiliate-banner {
  //height: 500px;
  color: #ffffff;
  padding-top: 1px;
  //background-size: 100%;
  //background-position: 0 0;
  //background-repeat: no-repeat;
  //background-image: url('./../../../assets/images/affiliate/affiliate-banner@2x.png');
  background: url("./../../../assets/images/affiliate/ag-bg.png") no-repeat center center;
  background-size: cover;
  .mt-affiliate{
    margin-top: 120px;
    align-items: stretch;
    .affiliate-container{
      width: 665px;
      box-sizing: border-box;
    }
    .invite-info{
      flex: 1;
      margin-left: 20px;
      .invite-code{
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 20px;
        color: #B6C0C3;
      }
    }
  }
  .affiliate-notice{
    color: #b6c0c3;
  }
  .title {
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    //margin-bottom: 20px;
    //margin: 0 0 40px 50px;
  }
  .text-box {
    display: flex;
    //margin-left: 50px;
    .item {
      width: 180px;
      //margin-bottom: 30px;
      //margin-right: 131px;
      p {
        font-size: 14px;
        color: #b6c0c3;
        font-weight: 400;
        margin-bottom: 10px;
      }
      span {
        font-size: 18px;
        color: #ffffff;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .copy-btn{
    color: $main-color;
  }
  .item-link{
    margin-top: 20px;
  }
  .button-box {
    //display: flex;
    //margin-top: 10px;
    //margin-left: 50px;
    .btn {
      width: 128px;
      height: 40px;
      font-size: 16px;
      color: #ffffff;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      &.primary {
        //margin-right: 40px;
        background: $main-color;
      }
      &.default {
        margin-left: 0 !important;
        border-radius: 21px;
        background: none;
        color: $main-color;
        border: 1px solid $main-color;
      }
    }
  }
}
.is-label{
  color: #b6c0c3;
}
.title-affiliate {
  padding-top: 120px;
  margin: 0px 0 12px 0px;
  font-size: 26px;
  font-weight: normal;
  color: #ffffff;
}
.affiliate-text {
  width: 463px;
  font-size: 14px;

  font-weight: normal;
  text-align: left;
  color: $main-color;
  line-height: 24px;
}
.xis-bold{
  margin-top: 20px;
}
</style>
