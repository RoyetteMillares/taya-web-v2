<template>
  <section class="adjust-page">
    <MyWallet />

    <component
      :is="activeName === 'deposit' ? DepositRecord : WithdrawRecord"
    >
      <div class="module-switch flex-box">
        <div
          @click="changeModule(item)"
          v-for="item in tabList"
          :key="item.key"
          class="module-item is-bold"
          :class="{ 'module-item-active': activeName === item.key }"
        >
          {{ item.label }}
        </div>
      </div>
    </component>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import MyWallet from "./component/my-wallet.vue";
import DepositRecord from "./component/deposit-component.vue";
import { useI18n } from "vue-i18n";
import WithdrawRecord from "./component/withdraw-record.vue";
const { t } = useI18n();

const tabList = reactive([
  { label: t("additional.depositRecord"), key: "deposit" },
  { label: t("additional.withdrawRecord"), key: "withdraw" },
]);

const activeName = ref("deposit");

// 切换模块
const changeModule = (item) => {
  activeName.value = item.key;
};

onMounted(() => {
  // getData();
});
</script>

<style lang="scss" scoped>
.adjust-page {
  //margin-top: 30px;
}
.module-switch {
  //margin-bottom: 20px;
  .module-item {
    border-radius: 8px 8px 0 0;
    background: #112228;
    min-width: 111px;
    color: #b6c0c3;
    font-size: 16px;
    padding: 9px 16px;
    box-sizing: border-box;
    cursor: pointer;
    //margin-right: 20px;
    text-align: center;
    &-active {
      background: $main-color;
      color: #fff;
    }
  }
}
</style>
