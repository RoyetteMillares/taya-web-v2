<template>
  <div class="search-options">
<!--    <label>{{t('public.Type')}}</label>-->
<!--    <el-select v-model="state.type" :placeholder="t('public.Select')">-->
<!--      <el-option-->
<!--        v-for="item in cities"-->
<!--        :key="item.value"-->
<!--        :label="item.label"-->
<!--        :value="item.value"-->
<!--      >-->
<!--        <span style="float: left">{{ item.label }}</span>-->
<!--        <span-->
<!--          style="-->
<!--            float: right;-->
<!--            color: var(&#45;&#45;el-text-color-secondary);-->
<!--            font-size: 13px;-->
<!--          "-->
<!--          >{{ item.value }}-->
<!--        </span>-->
<!--      </el-option>-->
<!--    </el-select>-->
    <custom-select  :label="t('public.Type')" :placeholder="t('public.Select')"
      class="mr-20"

      :statusList="cities"
      v-model="state.type"
    />
    <section style="margin-left: 30px" class="flex-box date-style">
      <custom-date v-model="state.time" :label="t('public.Date')" />
      <el-button
        @click="handleCurrentChange()"
        class="inquire-button"
        type="primary"
        >{{t('public.Filter')}}</el-button
      >
    </section>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref, reactive, inject, computed } from "vue";
import {useDictionary} from "../../../hooks/dictionary";
const emit = defineEmits(["handleSearch"]);
const {getDirection}=useDictionary()
const { t } = useI18n();
const categoryList = computed(() => {
  let list = [{ title: t("public.All"), code: "" }];
  list = list.concat(getDirection("dic_coin_log_category") || []);

  return list;
});
// const value = ref("");
const cities = [
  // {
  //   value: "",
  //   label: t('public.All'),
  // },
  {
    code: "ASC",
    title: t("public.ASC"),
  },
  {
    code: "DESC",
    title: t("public.DESC"),
  },
];

const state = reactive({
  type: "ASC",
  time: [],
});
const handleCurrentChange = () => {
  emit("handleSearch", state);
};
</script>

<style lang="scss" scoped>
.search-options {
  //:deep {
  //  .el-input .el-input__wrapper,
  //  .el-select .el-input__wrapper {
  //    background: #1a212a !important;
  //    border-radius: 16px;
  //    box-shadow: none;
  //  }
  //}

  display: flex;
  align-items: center;

  .Inquire {
    width: 106px;
    height: 32px;
    background: #11b85a;
    border-radius: 16px;
    font-size: 14px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 12px;
  }

  .date {
    margin-left: 30px;
  }

  label,
  .lines {
    font-size: 14px;
    color: #8e99b6;
    display: inline-block;
    text-align: center;
    margin: 0 8px;
  }
}
.date-style{
  :deep(.el-input__wrapper){
    box-shadow: none;
  }
}
</style>
