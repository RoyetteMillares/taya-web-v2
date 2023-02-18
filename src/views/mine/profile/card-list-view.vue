<template>
  <section>
    <div class="wallet_types ">
      <a
        class="wallet_type flex-box is-center fs-14"
        :class="[{ acitve: state.selectedType === wtype.code }]"
        :key="wtype.code"
        v-for="wtype in titleList"
        @click="state.selectedType = wtype.code"
      >
        <span>{{ wtype.title }}</span>
      </a>
    </div>
    <div class="wallet_address mb-20">
      <ul class="address_wrap">
        <div class="address_list ">
          <section
            class="address_card"
            :class="{ 'address_card-active is-bold': card.status === 1 }"
            v-for="card in cardList"
            :key="card.id"
          >
            <div class="delete-text flex-box" @click="deleteItem(card)">
              <svg-icon name="delete"></svg-icon>
            </div>
            <section class="crypto-header flex-box-between">
              <span>{{ card.categoryTransferName }}</span>
              <div class="default-text fs-14" @click="setDefault(card)">
                {{
                  card.status === 1
                    ? t("mine.profile.Default")
                    : t("mine.profile.SetDefault")
                }}
              </div>
            </section>

            <!--            <div class="show-icon">-->
            <!--              <svg-icon :name="card.code"></svg-icon>-->
            <!--            </div>-->
            <section class="show-address">
              {{ card.title }}
              <!--              {{ isPix ? card.accountNo : card.address }}-->
            </section>
          </section>

          <div class="is-add flex-box is-center">
            <div
              v-if="cardList?.length < 3"
              class="add-card flex-box is-center"
              @click="switchVisible"
            >
              <svg-icon name="add"></svg-icon>
            </div>
          </div>
        </div>
      </ul>
    </div>

    <custom-dialog
      v-model="visible"
      :title="
        t('mine.profile.AddUSDTAddress', { name: isPix ? 'PIX' : 'USDT' })
      "
      :showFooter="false"
    >
      <AddCard
        :visible="visible"
        :switchVisible="switchVisible"
        :code="state.selectedType"
      />
    </custom-dialog>
  </section>
</template>

<script setup>
import { useCard } from "@/store/card";
import { computed, onMounted, reactive, ref, watch } from "vue";
import AddCard from "./components/add-card.vue";
import { dialogConfirm } from "@/components/custom-dialog";
import { customPopup } from "@/components/custom-popup";
import { $post } from "@/request";
import { useI18n } from "vue-i18n";
import { useDictionary } from "../../../hooks/dictionary";
import { useWallet } from "../../../store/wallet";

const { t } = useI18n();
const card = useCard();
const visible = ref(false);
const parseJson = computed(() => card.parseJson);
const cardList = computed(() =>
  card.cardList.filter(
    (item) => state.selectedType === item.categoryCurrency.toString()
  )
);
// console.log(card.cardList, "cardList");
const { getDirection } = useDictionary();
const titleList = computed(() => getDirection("dic_category_currency") || []);
const wallet = useWallet();
const state = reactive({
  selectedType: getDirection("dic_category_currency") ? [0]?.code ?? "0" : "0",
});

const isPix = computed(() => state.selectedType === "PIX");

const switchVisible = (v) => {
  visible.value = !visible.value;
};

const setDefault = ({ id }) => {
  operate("default", { id });
};
const deleteItem = ({ id }) => {
  operate("delete", { id });
};
const operate = (type, params) => {
  const message =
    type === "delete"
      ? t("mine.profile.sureDeleteCard")
      : t("mine.profile.sureSetCard");
  dialogConfirm(message, t("mine.profile.Reminder"), {
    showCancelButton: true,
  }).then(() => {
    $post(
      type === "delete" ? "deleteWithdrawalAddress" : "updateWithdrawalAddress",
      params
    ).then((res) => {
      if (res.code === 0) {
        getCards();
        customPopup(t("game.EditSuccessfully"), "", { isSuccess: true });
      }
    });
  });
};

const getCards = () => {
  // const payload = { code: state.selectedType };
  card.GET_USER_CARD({});
};

onMounted(() => {
  getCards();
  wallet.GET_WITHDRAW_CHANNEL();
});
</script>

<style lang="scss" scoped>
.show-address-title {
  margin: 35px 0 20px;
  font-size: 22px;
  color: $main-color;
}

.wallet_address {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 24px;
  background: #112228;
  box-sizing: border-box;
  border-radius: 12px;
  position: relative;
}

.wallet_types {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  padding-left: 4px;
  //gap: 12px;

  .wallet_type {
    min-width: 100px;
    padding: 0 20px;
    height: 36px;
    background: #112228;
    border-radius: 8px 8px 0px 0px;
    color: #b6c0c3;
    cursor: pointer;
    &.acitve {
      background: $main-color;
      color: #fff;
      font-weight: 700;
      .wallet_img {
        background-color: #11b85a;
      }
    }
  }
}

.address_wrap {
  // width: 50%;
  display: flex;
  flex-direction: column;
  .list-item-title {
    color: $main-color;
    margin-bottom: 30px;
    .withdraw-length {
      color: #8e99b6;
      margin-left: 12px;
    }
  }

  .address_list {
    //padding-bottom: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .address_card {
    background: #232a33;
    border-radius: 12px;
    padding: 16px;
    position: relative;
    background: url(@/assets/images/bank/bank.png) no-repeat center center;
    background-size: 100% 100%;
    .crypto-header {
      //padding: 0 20px;
      color: #fff;
      font-size: 16px;
      margin-top: 14px;
    }
    .delete-text {
      color: #b8d0d8;
      font-size: 14px;
      cursor: pointer;
      justify-content: flex-end;
    }
    .show-address {
      font-size: 13px;
      margin-top: 34px;
      color: #ffff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 90%;
    }
    .default-text {
      padding-left: 20px;
      cursor: pointer;
      color: #b8d0d8;
    }
    .show-icon {
      position: absolute;
      right: 16px;
      bottom: 32px;
      font-size: 54px;
      width: 54px;
      height: 54px;
      opacity: 0.5;
      color: #50555b;
    }

    &:last-child {
      margin-bottom: 0;
    }
    &-active {
      background-image: url(@/assets/images/bank/bank-active.png);
      .default-text,
      .delete-text {
        color: #34B8D5;
      }
      .show-icon {
        color: #ffffff;
      }
    }
  }
}
.is-add {
  //width: 33%;
  background: url(@/assets/images/bank/bank.png) no-repeat center center;
  background-size: 100% 100%;
  height: 130px;
  border-radius: 16px;
}
.add-card {
  width: 68px;
  height: 68px;
  background: #0c2930;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  //margin: 39px auto 0;
  color: #556770;
}
</style>

