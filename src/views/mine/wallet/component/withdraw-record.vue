<template>
  <section class="adjust-page">
    <div class="record-search flex-box-between">
      <slot></slot>
<!--      <span class="record-name">{{ t("additional.withdrawRecord") }}</span>-->
      <section class="flex-box">
        <!--        <custom-select-->
        <!--          class="mr-20"-->
        <!--          label="Mainnet"-->
        <!--          :statusList="cryptoList"-->
        <!--          v-model="state.platName"-->
        <!--        />-->
        <custom-select
          class="mr-20"
          :label="t('additional.state')"
          :statusList="statusList"
          v-model="state.status"
        />
        <custom-date v-model="state.time" :label="t('public.Date')" />
        <el-button
          @click="handleCurrentChange(1)"
          class="inquire-button"
          type="primary"
          >{{ t("public.Filter") }}</el-button
        >
      </section>
    </div>
    <main-container class="adjust-record">
      <el-table
        class="custom-table"
        :data="state.tableData"
        style="width: 100%"
        header-cell-class-name="thead-cell"
      >
        <el-table-column prop="platName" :label="t('additional.channel')" />
        <el-table-column
          prop="orderId"
          :label="t('wallet.withdraw.TransactionID')"
        >
          <template #default="{ row }">
            <span class="cursor" @click="copy(row.orderId)">
              {{
                row.orderId.replace(/^(\S{4})\S+(\S{4})$/, "$1 **** $2")
              }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="withdrawalAmount" :label="t('new.Amount')" />
        <el-table-column
          prop="exchangeRate"
          :label="t('wallet.withdraw.ExchangeRate')"
        />
        <el-table-column
          prop="mainNetFees"
          :label="t('wallet.withdraw.mainnetFees')"
        />
        <el-table-column
          prop="realAmount"
          :label="t('wallet.withdraw.ActualCredit')"
        />
        <el-table-column prop="address" :label="t('wallet.withdraw.State')">
          <template #default="{ row }">
            <span
              :class="[
                {
                  'is-success': row.status === 1,
                  'is-fail': row.status === 2,
                },
              ]"
            >
              {{ getTitle(statusList, row.status) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          width="170px"
          :label="t('wallet.withdraw.Time')"
        >
          <template #default="{ row }">
            <span>{{ time(row.createdAt) }}</span>
          </template>
        </el-table-column>
        <template #empty>
          <no-data class="empty-tip"></no-data>
        </template>
      </el-table>
      <custom-pagination
        @handleCurrentChange="handleCurrentChange"
        :total="state.total"
        v-model:size="state.size"
        v-model:page="state.page"
      />
    </main-container>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive } from "vue";

import { useDictionary } from "@/hooks/dictionary";
import { $post } from "@/request";
import { time } from "@/utils/date-filter";
import { copy } from "@/utils";
import { formatCoin } from "@/utils/amount-format";
import { useI18n } from "vue-i18n";
import { useWallet } from "@/store/wallet";
const { t } = useI18n();

const { getDirection, getTitle } = useDictionary();

const statusList = computed(() => {
  let list = [{ title: t("public.All"), code: "" }];
  if (
    getDirection("dic_withdrawal_record_status") &&
    getDirection("dic_withdrawal_record_status").length
  )
    list = list.concat(getDirection("dic_withdrawal_record_status"));
  return list;
});
const state = reactive({
  status: "",
  platName: "",
  time: [],
  page: 1,
  size: 20,
  total: 0,
  tableData: [],
  platList: [],
});
const handleCurrentChange = (val) => {
  state.page = val;
  getData();
};
const wallet = useWallet();
const cryptoList = computed(() => {
  let list = [{ title: t("public.All"), code: "" }];
  list = list.concat(wallet.cryptoList);
  return list;
  // wallet.cryptoList
});
const getData = () => {
  // const [startTime, endTime] = state.time;
  const {
    page,
    size,
    status,
    platName,
    time: [startTime, endTime],
  } = state;
  const params = {
    current: page,
    size,
    data: {
      startTime,
      endTime,
      status,
      platName,
    },
  };
  $post("getWithdrawalRecord", params).then((res) => {
    if (res.code === 0) {
      state.tableData = res.data.list;
      state.total = +res.data.total;
    }
  });
};
const getPlatConfigList = () => {
  $post("getPlatConfigList").then((res) => {
    if (res.code === 0) {
      state.platList = res.data.map((item) => {
        item.title = item.name;
        return item;
      });
      state.platList.unshift({
        title: t("public.ALL"),
        code: "ALL",
      });
    }
  });
};
onMounted(() => {
  getData();
  // wallet.GET_WITHDRAW_PLATS();
});
</script>

<style lang="scss" scoped>
.adjust-page {
  margin-top: 30px;
  .record-search {
    .record-name {
      font-size: 22px;
      color: $main-color;
    }
  }
  .inquire-button {
    border-radius: 16px;
    width: 106px;
    height: 32px;
  }
  .adjust-record {
    margin: 25px 0 60px;
    padding: 0 30px 40px;
    .custom-table {
      margin-bottom: 40px;
      :deep {
        .el-table__cell {
          padding: 20px 0;
          .cell {
            padding: 0;
          }
        }
        .thead-cell {
          color:  $main-color !important;
          padding: 24px 0;
        }
      }
    }
  }
}
</style>
