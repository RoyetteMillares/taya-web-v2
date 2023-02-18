<template>
  <div>
    <main-container class="mb-20">
      <p class="rtitle">{{ t("wallet.recharge.title") }}</p>
      <div class="plats">
        <div
          v-for="(item, i) in depositList"
          :key="i"
          @click="chDeposit(item)"
          class="plat"
        >
          <div :class="item.code === state.depositInfo.code ? 'active' : ''">
            <div class="rimg">
              <svg-icon :name="item.currency"></svg-icon>
            </div>
            <p class="fs-12">{{ item.name.split("_")[0] }}</p>
          </div>
        </div>
      </div>
    </main-container>
    <main-container class="rechargeR">

      <!--      pix-->
      <rechargeOfPix
        :depositInfo="state.depositInfo"
        v-if="depositList && depositList.length"
      />

      <EmptyContent v-show="!depositList || !depositList.length" />
    </main-container>
  </div>
</template>

<script setup>
import QrcodeVue from "qrcode.vue";
import { computed, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { useWallet } from "../../../store/wallet.js";
import { useUserStore } from "../../../store/user.js";
import { copy } from "@/utils";
import { useI18n } from "vue-i18n";
import EmptyContent from "./components/empty-content.vue";
import RechargeOfPix from "./components/recharge-of-pix.vue";
const { t } = useI18n();

const router = useRouter();

const wallet = useWallet();
const user = useUserStore();
const tyList = computed(() => wallet.platsList);
// const address = computed(() => wallet.platAddress);
const userInfo = computed(() => user.info);

const state = reactive({
  channelList: [],
  depositInfo: {},
});
const depositList = computed(() => wallet.depositList);

const chDeposit = async (data) => {
  state.depositInfo = data;
};

const handleCopy = async () => {
  if (!state.address) return;
  await copy(state.address);
};

onMounted(async () => {
  const { data, code } = await wallet.GET_DEPOSIT_CHANNEL();
  if (code === 0 && data && data.length) state.depositInfo = data[0];
  // user.GET_USER_PROFILE();
});
</script>

<style lang="scss" scoped>
.rtitle {
  margin:0 0 10px ;
  color: #fff;
}
.rechargeR {
  margin-bottom: 50px;
}
.plats {
  display: flex;
  margin-top: 20px;
  .plat {
    display: inline-grid;
    margin-right: 12px;
    width: 80px;
    text-align: center;
    color: #506871;


    .rimg {
      width: 80px;
      height: 50px;
      background: #18292f;
      border-radius: 6px;
      margin-bottom: 12px;
      cursor: pointer;
      border: 1px solid #18292f;
      .svg-icon {
        width: 30px;
        height: 30px;
        color: #8e99b6;
        margin-top: 10px;
      }
    }
    .active {
      color: #ffffff !important;
      .rimg {
        background:#0c2930 ;
        border-color: $main-color;
        .svg-icon {
          color: $main-color;
        }
      }
      p{
        color: $main-color;
      }
    }
  }
}

</style>
