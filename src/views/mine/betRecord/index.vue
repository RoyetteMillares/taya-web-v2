<template>
  <section class="adjust-page">
    <div class="record-search flex-box-between">
      <span class="record-name">{{ t("extra.betRecord") }}</span>
      <section class="flex-box">
        <custom-select
          class="mr-20"
          :label="t('extra.platform')"
          :statusList="categoryList"
          v-model="state.gameId"
        />
        <custom-select
          class="mr-20"
          :label="t('additional.Status')"
          :statusList="statusList"
          v-model="state.outIn"
        />
        <custom-date v-model="state.time" :label="t('mine.adjust.Date')" />
        <el-button
          class="inquire-button"
          type="primary"
          @click="handleCurrentChange(1)"
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
        <el-table-column prop="date" :label="t('mine.adjust.DateTime')">
          <template #default="{ row }">
            <span>{{ time(row.createdAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          :label="t('extra.orderId')"
        />
        <el-table-column prop="category" :label="t('extra.game')">
          <template #default="{ row }">
            <span>{{ getTitle(categoryList, row.gameId) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="coinBefore"
          :label="t('extra.balance')"
        />
        <el-table-column
          prop="stake"
          :label="t('extra.bet')"
        />
        <el-table-column
          prop="payout"
          :label="t('extra.payout')"
        />
        <el-table-column
          prop="name"
          :label="t('additional.Status')"
        >
          <template #default="{ row }">
            <span>{{ getTitle(statusList, row.xbStatus) }}</span>
          </template>
        </el-table-column>
        <template #empty>
          <no-data class="empty-tip"></no-data>
        </template>
      </el-table>
      <custom-pagination
        v-show="state.total >= state.size || state.page > 1"
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
import { useDictionary } from "../../../hooks/dictionary";
import { $post } from "../../../request";
import { time } from "../../../utils/date-filter";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const { getDirection, getTitle } = useDictionary();

const statusList = computed(() => {
  let list = [{ title: t("public.All"), code: "" }];
  list = list.concat(getDirection("dic_bet_status") || []);
  return list;
});
const categoryList = computed(() => {
  let list = [{ title: t("public.All"), code: "" }];
  list = list.concat(getDirection("dic_game_id_name") || []);

  return list;
});
const getData = () => {
  const {
    page,
    size,
    status,
    time: [startTime, endTime],
    gameId,
    outIn,
  } = state;
  const params = {
    current: page,
    size,
    data: {
      startTime,
      endTime,
      outIn,
      gameId,
    },
  };
  $post("betLists", params).then((res) => {
    if (res.code === 0) {
      state.tableData = res.data.list;
      state.total = +res.data.total;
    }
  });
};
const state = reactive({
  gameId: "",
  outIn: "",
  time: [],
  page: 1,
  size: 20,
  total: 0,
});
const handleCurrentChange = (val) => {
  state.page = val;
  getData();
};
onMounted(() => {
  getData();
});
</script>

<style lang="scss" scoped>
.adjust-page {
  margin-top: 30px;
  .record-search {
    .record-name {
      font-size: 18px;
      color: #fff;
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
          color: $main-color !important;
          padding: 20px 0;
        }
      }
    }
  }
}
</style>
