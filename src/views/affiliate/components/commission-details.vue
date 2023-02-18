<template>
  <div class="commission-details">
    <div class="commission-details-option">
      <span class="h2">
        <b class="is-white">{{
          t("affiliate.commissionDetails.CommissionDetails")
        }}</b>
      </span>
      <SearchOptions @handleSearch="handleSearch" />
    </div>

    <div class="padding20 commission-details-table-container">
      <table class="commission-details-table">
        <thead>
          <tr>
            <td class="is-bold">{{ t("affiliate.commissionDetails.Username") }}</td>
            <td class="is-bold">{{ t("affiliate.commissionDetails.Level") }}</td>
            <td class="is-bold">{{ t("affiliate.commissionDetails.BettingTurnover") }}</td>
            <td class="is-bold">{{ t('public.Date') }}</td>
            <td class="is-bold">{{ t("affiliate.commissionDetails.CommissionUSD") }}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in state.tableData" :key="index">
            <td>{{ item.username }}</td>
            <td>
              {{ t("affiliate.commissionDetails.Level") }} {{ item.agentLevel }}
            </td>
            <td>{{ item.bettingTurnOver }}</td>
            <td>
              {{ time(item.createdAt) }}
              <!-- {{ time(item.updatedAt) }} -->
            </td>
            <td>{{ item.commissionUsd }}</td>
          </tr>
        </tbody>
      </table>
      <!-- <el-table
        class="commission-details-table custom-table"
        size="large"
        :data="state.tableData"
        style="width: 100%"
      >
        <el-table-column prop="username" label="Username" />
        <el-table-column prop="agentLevel" label="Agency level" />
        <el-table-column prop="bettingTurnOver" label="Betting Turnover" />
        <el-table-column prop="commissionUsd" label="Commission USD" />
        <template #empty>
          <no-data class="empty-tip"></no-data>
        </template>
      </el-table> -->
      <no-data
        v-if="!state.tableData.length"
        type="record"
        class="empty-tip"
        :text="t('affiliate.commissionDetails.NoRecords')"
      ></no-data>
      <div
        class="pagination-area"
        v-show="state.total >= state.size || state.page > 1"
      >
        <custom-pagination
          @handleCurrentChange="handleCurrentChange"
          :total="state.total"
          v-model:size="state.size"
          v-model:page="state.page"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, inject, computed, onMounted } from "vue";
import SearchOptions from "./search-options.vue";
import { $post } from "@/request/index";
import { time } from "@/utils/date-filter";
import { number } from "@intlify/core-base";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const state = reactive({
  sortField: [],
  sortKey: "",
  time: [],
  page: 1,
  size: 10,
  total: 30,
  tableData: [],
});

const handleSearch = (val) => {
  state.sortKey = val.type;
  state.time = val.time;
  commissionRecords();
};

const commissionRecords = async () => {
  const {
    page,
    size,
    sortField,
    sortKey,
    time: [startTime, endTime],
  } = state;

  const params = {
    current: page,
    data: {
      startTime,
      endTime,
    },
    size,
    sortField: [],
    sortKey: sortKey, //ASC或DESC
  };
  await $post("commissionRecords", params).then((res) => {
    if (res?.code === 0) {
      state.tableData = res?.data?.list ?? [];
      state.total = Number(res?.data?.total);
    }
  });
};

const handleCurrentChange = (val) => {
  state.page = val;
  commissionRecords();
};
onMounted(async () => {
  await commissionRecords();
});
</script>

<style lang="scss" scoped>
.commission-details {
  padding-top: 40px;

  .h2 {
    font-size: 22px;

    span {
      color: white;
      display: inline-block;
      margin-left: 8px;
    }
  }

  .commission-details-option {
    display: flex;

    .search-options {
      margin-left: auto;
    }
  }

  .commission-details-table-container {
    background: $main-container-inner-bg;
    border-radius: 20px;
    padding-top: 0;
    margin-bottom: 40px;
    margin-top: 20px;
    padding-bottom: 50px;

    .commission-details-table {
      margin-bottom: 30px;
      width: 100%;
      border-spacing: 0;

      thead tr {
        //display: flex;
        //justify-content: space-between;
        td{
          color: $main-color;
          font-size: 14px;
        }
      }

      td {
        line-height: 3;
        border-bottom: #2d333c solid 1px;
      }

      thead td,
      .el-table .el-table__cell {
        color: #8e99b6;
        font-size: 18px;
        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(4) {
          text-align: center;
        }
        &:last-child {
          text-align: right;
        }
      }

      tbody td,
      .el-table .el-table__cell {
        font-size: 14px;
        color: #ffffff;
        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(4) {
          text-align: center;
        }
        &:last-child {
          text-align: right;
        }
      }
    }
  }
}
</style>
