<!--左侧导航栏-->
<template>
  <ul class="layout-routes">
<!--    <li-->
<!--      @click="pageTo({ name: 'sport' })"-->
<!--      class="layout-logo flex-box is-center"-->
<!--    >-->
<!--      <img :src="PLAT_LOGO" alt="" />-->
<!--    </li>-->
    <div class="show-info">

      <div class="player-information">
        <div class="player-info">
          <div class="fs-18 is-bold user-name flex-box">
            <span> {{ info.username }}</span>
            <div
              @click="pageTo({ name: 'vip' })"
              class="player-level flex-box is-center"
            >
              <img v-realImg="USER_VIP_ICON?.icon" alt="" />
              <!--          Vip{{ info.levelId - 1 }}-->
            </div>
          </div>
<!--          <div class="flex-box-between fs-14">-->
<!--            <span>{{t('extra.currentLevel')}}</span>-->
<!--            <span>{{vipInfo.name}}</span>-->
<!--          </div>-->
          <div class="is-label fs-12 flex-box">
            <span>{{ t("new.assets") }}：</span>
            <div class="player-balance fs-12 ml-20">
              {{ walletInfo.reelCoin }} {{ walletInfo.mainCurrency }}
            </div>
          </div>

        </div>

      </div>
    </div>
    <div class="show-bottom">
      <li
        @click="pageTo(item)"
        :class="{
          'layout-items-active': item.routes.split(',').includes(routeName),
        }"
        class="layout-items flex-box is-center"
        v-for="item in firstMenu"
        :key="item.routes"
      >
<!--        <span class="left-icon flex-box" v-if="item.icon">-->
<!--          <svg-icon :name="item.icon"></svg-icon>-->
<!--        </span>-->
        <span class="routes-name is-bold flex-box">{{ item.label }}</span>
        <span class="show-count" v-show="item.count">({{ item.count }})</span>
      </li>
    </div>
    <div @click="visible = true" class="player-logout flex-box is-center fs-16">
      {{ t("new.signOut") }}
    </div>
    <custom-dialog
      showCancelButton
      :message="t('additional.logout')"
      :title="t('public.Reminder')"
      v-model="visible"
      @confirm="confirm"
    ></custom-dialog>
  </ul>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useUserStore } from "../../../store/user";
import { useMessage } from "../../../store/message";
import { useWallet } from "../../../store/wallet";
import { useI18n } from "vue-i18n";
import { useConfig } from "../../../hooks/platform";
const USER_VIP_ICON = computed(() => user.USER_VIP_ICON);
const { PLAT_LOGO } = useConfig();
const { t } = useI18n();
const visible = ref(false);
const route = useRoute();
const router = useRouter();
const message = useMessage();
const routeName = computed(() => route.name);
const user = useUserStore();
const info = computed(() => user.info);
const vipInfo=computed(()=>user.vipInfo)
const walletInfo = computed(() => useWallet().MAIN_WALLET); // 登陆成功请求钱包)
const firstMenu = computed(() => {
  return [
    {
      label: t("wallet.myWallet.wallet"),
      routes: "wallet,withdrawSubmit,recharge,withdrawReal",
      name: "wallet",
      icon: "wallet",
    },
    {
      label: 'VIP',
      routes: "Clubhouse",
      name: "vip",
      icon: "Clubhouse",
    },
    {
      label: t("mine.adjust.AccountHistory"),
      routes: "adjust",
      name: "adjust",
      icon: "adjust",
    },

    {
      label: t("extra.betRecord"),
      routes: "betRecord",
      name: "betRecord",
    },
    {
      label: t("mine.information.Information"),
      routes: "information,detail",
      name: "information",
      icon: "information",
      count: message.noticeCount,
    },
    {
      label: t("new.myAccount"),
      routes: "profile",
      name: "profile",
      icon: "profile",
    },
  ];
});
const pageTo = ({ name }) => {
  router.push({ name });
};
const confirm = async () => {
  const code = await user.LOGOUT();
  code === 0 && router.replace("/login");
};
</script>

<style lang="scss" scoped>
.layout-routes {
  width: 100%;
  .layout-logo {
    border-bottom: 1px solid #2d333c;
    padding: 23px 15px;
    cursor: pointer;
    img {
      height: 31px;
    }
  }
  .layout-items {
    padding: 10px 15px;
    cursor: pointer;
    position: relative;
    color: #506871;
    transform-origin: center;
    &:hover {
      color: #fff;
    }
    .left-icon {
      font-size: 14px;
      margin-right: 13px;
    }
    .show-count {
      color: #fff;
      margin-left: 5px;
    }
    &-active {
      color: $main-color;
      &:hover {
        color: $main-color;
      }
      .routes-name,
      .left-icon {
        animation: zoomIn ease-in 0.2s forwards;
      }

      &:before {
        content: "";
        width: 3px;
        height: 11px;
        background: $main-color;
        border-radius: 2px;
        left: 0;
        top: 13px;
        position: absolute;
      }
    }
  }
  .show-bottom {
    padding:15px 0 ;
    position: relative;
    background: #112228;
    border-radius: 20px;
    margin-bottom: 20px;
    //&:after {
    //  content: "";
    //  height: 1px;
    //  background: linear-gradient(135deg, #2d333c, rgba(45, 52, 60, 0));
    //  position: absolute;
    //  bottom: 0;
    //  left: 0;
    //  width: 100%;
    //}
    .routes-name {
      font-size: 14px;
    }
  }
  .show-info {
    margin:0 0 20px;
    background: #0c2930;
    border-radius: 20px;
    padding: 20px;
    box-sizing: border-box;
    .player-information {
      //padding: 20px 0 0;
      //background: #2b3547;
      border-radius: 4px;
      .player-info {
        color: $main-text-color;
        .user-name{
          color: #fff;
          text-align: center;
          margin-bottom: 19px;
        }
        .is-label {
          margin-top: 12px;
          //margin: 12px 0 8px;
        }
        .player-balance {
          color: #fff;
        }
      }
    }
    .player-level {

      height: 15px;
      margin-left: 8px;
      img{
        max-width: 52px;
        height: 1005;
      }
      cursor: pointer;
    }
  }

  .player-logout {
    background: #112228;
    border-radius: 20px;
    height: 40px;
    color: #506871;
    cursor: pointer;
  }
}
</style>
