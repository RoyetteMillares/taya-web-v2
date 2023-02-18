<template>
  <d2-container>
    <div class="affiliate">

      <div class="title is-bold">
        {{ t("menu.Affiliate") }}
        <!-- {{ t("affiliate.menu.Affiliate") }} -->
        <!-- {{ t("affiliate.about.AboutUs") }} -->
      </div>
      <p>
        {{ t("affiliate.about.title01") }}: <br />
        {{ t("affiliate.about.text01") }}
      </p>
      <p>
        {{ t("affiliate.about.title02") }}: <br />
        {{ t("affiliate.about.text02") }}
      </p>
      <p>
        {{ t("affiliate.about.title03") }}: <br />
        {{ t("affiliate.about.text03") }}
      </p>
      <p>
        {{ t("affiliate.about.title04") }}: <br />
        {{ t("affiliate.about.text04") }}
      </p>
      <div class="title is-bold">
<!--        {{ t("menu.Affiliate") }}-->
         {{ t("extra.rule") }}
        <!-- {{ t("affiliate.about.AboutUs") }} -->
      </div>
      <table>
        <thead>
        <tr>
          <th>{{ t("about.affiliates.thead", 0) }}</th>
          <th>{{ t("about.affiliates.thead", 1) }}</th>
          <th>{{ t("about.affiliates.thead", 2) }}</th>
          <th>{{ t("about.affiliates.Commission") }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in state.commissionTable">
          <td>
            {{ t("about.affiliates.col", { num: item.agentLevel }) }}
          </td>
          <td>{{ item.agentLevelRate*100 }}%</td>
          <td>100*{{ item.agentLevelRate*100 }}%</td>
          <td>{{ 100 * item.agentLevelRate }}</td>
        </tr>
        </tbody>
      </table>
    </div>

  </d2-container>

</template>

<script setup>

import { useI18n } from "vue-i18n";
import {$post} from "../../../request";
import {onMounted, reactive} from "vue";

const state=reactive({
  commissionTable:[]
})
const { t } = useI18n();
// 获取佣金列表
const getCommissionRateList = () => {
  $post("commissionRateList").then((res) => {
    if (res.code === 0) {
      state.commissionTable = res.data;
    }
  });
};
onMounted(()=>{
  getCommissionRateList()
})
</script>

<style lang="scss" scoped>
.affiliate {
  background: $main-container-inner-bg;
  border-radius: 20px;
  padding: 0 20px 48px;
  margin-bottom: 100px;
  .title {
    font-size: 18px;
    font-weight: normal;
    text-align: left;
    color: $main-color;
    //line-height: 14px;
    padding: 20px 0  10px 0;
  }
  p {
    //width: 1127px;
    font-size: 16px;
    font-weight: normal;
    text-align: left;
    color: var(--theme-sub-color);
    line-height: 22px;
    margin: 0 0 12px;
    //line-height: 20;
  }
}
table{
  width: 100%;
  color: var(--theme-sub-color);
  border: 1px solid #aaa;
  border-collapse: collapse;
  border-radius: 5px;
  margin-top: 10px;
  th{
    font-weight: 500;
  }
  th,td{
    text-align: center;
    padding: 15px 0;
    border: 1px solid #aaa;

  }
}
</style>
