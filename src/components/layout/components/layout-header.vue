<!-- 全局头部 -->
<template>
  <section class="flex-box-between layout-header">
    <div class="key-search">
      <!--       v-show="showSearch"-->
      <el-input
        v-show="showSearch"
        v-model="state.keywords"
        size="large"
        :placeholder="t('public.EnterSearch')"
        @keyup.enter="globalSearch"
        @blur="globalSearch"
        :prefix-icon="Search"
      />
    </div>
    <div class="user-module">
      <!--      un login-->
      <section class="flex-box" v-if="!getToken()">
        <div class="to-register is-bold is-button" @click="pageTo('register')">
          {{ t("new.Register") }}
        </div>
        <div class="to-login is-bold ml-10 is-button" @click="pageTo('login')">
          {{ t("new.signIn") }}
        </div>
      </section>
      <!--      section logined-->
      <section v-else class="flex-box">
        <!--        player information-->
        <div class="show-info">
          <div @click="pageTo('profile')" class="show-player-name fs-12">
            {{ user.info.username }}
          </div>
          <div class="flex-box player-balance" @click="pageTo('recharge')">
            <span class="add-icon mr-5">+</span>
            <span>{{ walletInfo.reelCoin }}</span>
            <span class="ml-5">{{ walletInfo.mainCurrency }}</span>
          </div>
        </div>
        <!--        vip-->
        <div class="vip-model flex-box" @click="pageTo('vip')">
          <!-- <svg-icon :name="user.info.levelId - 1 || 0"></svg-icon> -->
          <img class="vip-icon" v-realImg="USER_VIP_ICON?.icon" alt="" />
          <!-- Vip{{ user.info.levelId - 1 }} -->
        </div>
        <!--        message-->
        <div
          @click="pageTo('information')"
          class="user-message is-circle fs-16 flex-box"
        >
          <svg-icon name="notice"></svg-icon>
          <span class="show-new" v-show="+message.noticeCount > 0"></span>
        </div>
        <!--        to deposit-->
        <div
          class="to-login flex-box to-deposit is-button"
          @click="pageTo('wallet')"
        >
          <span class="flex-box deposit-icon">
            <svg-icon name="add"></svg-icon>
          </span>
          <span class="deposit-name is-bold fs-12">{{ t("new.Deposit") }}</span>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "../../../store/user";
import { getToken } from "../../../utils/permission";
import { useMessage } from "../../../store/message";
import { useWallet } from "../../../store/wallet";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const vipList = computed(() => user.vipList);

const walletInfo = computed(() => useWallet().MAIN_WALLET); // 登陆成功请求钱包)
const message = useMessage();
const user = useUserStore();
const USER_VIP_ICON = computed(() => user.USER_VIP_ICON);
const route = useRoute();
const emit = defineEmits(["search"]);
// const IS_LOGIN = computed(() => {
//   if (getToken()) return true;
//   else return user.isLogin;
// });
const showSearch = computed(() => route.meta.showSearch);
const state = reactive({
  keywords: "",
});
const router = useRouter();
const pageTo = (name) => {
  router.push({ name });
};
const search = () => {};

const globalSearch = () => {
  emit("search", state.keywords);
};
onMounted(async () => {
  if (getToken()) {
    await message.GET_NOTICE_COUNT();
    if (!vipList.value.length) await user.GET_VIP_INFO();
  }
});
</script>

<style lang="scss" scoped>
.layout-header {
  width: 100%;
  padding: 30px 0 10px;
  //position: sticky;
  //left: 0;
  //top: 0;
  z-index: 1;
  //background: #232a33;
  .key-search {
    :deep {
      --el-input-focus-border-color: $main-color;
      --el-input-border-color: #2d333c;
      --el-border-color: #2d333c;
      --el-input-hover-border-color: transparent;
      --el-input-border-radius: 20px;
      .el-input {
        background: #1a212a;
        border-radius: 20px;
        height: 40px;
        width: 288px;
        .el-input__wrapper {
          background: #1a212a;
          border-radius: 20px;
          &:hover {
            box-shadow: none;
          }
          .el-input__inner {
            font-size: 16px;
            color: #fff;
            &::placeholder {
              font-size: 14px;
              color: #8e99b6;
            }
          }
        }
      }
    }
  }
  .is-button {
    padding: 10px 22px;
    font-size: 14px;
    border-radius: 20px;
    cursor: pointer;
  }
  .to-register {
    background: #1a212a;
    color: #8e99b6;
  }
  .to-login {
    background: $main-color;
    color: #fff;
  }
}
.to-deposit {
  margin-left: 0;
  .deposit-icon {
    font-size: 12px;
    margin-right: 5px;
  }
}
.is-circle {
  width: 36px;
  height: 36px;
  background: #1a212a;
  border-radius: 50%;
  cursor: pointer;
  justify-content: center;
  color: #fff;
}
.user-message {
  margin: 0 20px;
  position: relative;

  .show-new {
    width: 4px;
    height: 4px;
    background: #e75353;
    border-radius: 50%;
    position: absolute;
    top: 7px;
    right: 7px;
  }
}
.vip-model {
  margin-left: 14px;
  font-size: 33px;
  cursor: pointer;
  .vip-icon {
    width: 1em;
    height: 1em;
    border-radius: 50%;
    fill: currentColor;
    vertical-align: middle;
  }
}
.show-info {
  text-align: right;
  .show-player-name {
    color: #8e99b6;
    margin-bottom: 8px;
    cursor: pointer;
  }
  .player-balance {
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    .add-icon {
      color: $main-color;
    }
  }
}
</style>
