<template>
  <div class="about-page">
    <el-tabs class="about-tabs">
      <el-tab-pane>
        <template #label>
          <span class="item">{{ t("about.tab", 0) }}</span>
        </template>
        <div class="about-content">
          <div class="about-title">{{ t("about.tab", 0) }}</div>
          <div class="c">
            <div class="r">
              <div class="p">{{ t("about.aboutUs.text01") }}</div>
              <div class="p">{{ t("about.aboutUs.text02") }}</div>
              <div class="p">{{ t("about.aboutUs.text03") }}</div>
              <div class="p">{{ t("about.aboutUs.text04") }}</div>
            </div>
            <div class="r">
              <img :src="PLAT_LOGO" alt="" />
            </div>
          </div>
        </div>

        <div class="partner">
          <div class="about-title">{{ t("about.partnerLabel") }}</div>
          <div class="partner-item">
            <div class="partner-title">
              <div class="partner-logo">
                <svg-icon name="digitain" class="icon"></svg-icon>
              </div>
              <div class="partner-name">{{ t("about.partnerTitle", 0) }}</div>
            </div>
            <div class="p" v-html="t('about.partnerCotent1')"></div>
          </div>
          <div class="partner-item">
            <div class="partner-title">
              <div class="partner-logo">
                <svg-icon name="leap" class="icon"></svg-icon>
              </div>
              <div class="partner-name">{{ t("about.partnerTitle", 1) }}</div>
            </div>
            <div class="p" v-html="t('about.partnerCotent2')"></div>
          </div>
          <div class="partner-item">
            <div class="partner-title">
              <div class="partner-logo">
                <svg-icon name="Sponsor" class="icon"></svg-icon>
              </div>
              <div class="partner-name">{{ t("about.partnerTitle", 2) }}</div>
            </div>
            <div class="p" v-html="t('about.partnerCotent3')"></div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="item">{{ t("about.tab", 1) }}</span>
        </template>
        <div class="about-content about-content2">
          <div class="about-title about-title2">{{ t("about.tab", 1) }}</div>
          <!-- <div v-html="t('about.affiliates')"></div> -->

          <div class="p">{{ t("about.affiliates.text01") }}</div>
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
          <div class="p">{{ t("about.affiliates.text02") }}</div>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span class="item">{{ t("about.tab", 2) }}</span>
        </template>
        <div class="about-content about-content2">
          <div class="about-title about-title2">
            {{ t("about.clubhouse") }}
            <!-- {{ t("menu.Club") }} -->
          </div>
          <div class="p" v-html="t('about.club.text01')"></div>
          <div class="p">{{ t("about.club.text02") }}</div>
          <div class="p">{{ t("about.club.text03") }}</div>
          <div class="p">{{ t("about.club.text04") }}</div>
          <div class="p">{{ t("about.club.text05") }}</div>
          <table>
            <thead>
              <tr>
                <th>{{ t("about.club.thead", 0) }}</th>
                <th>{{ t("about.club.thead", 1) }}</th>
                <th>{{ t("about.club.thead", 2) }}</th>
                <th>{{ t("about.club.keep") }}</th>
                <th>{{ t("about.club.multiplier") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in state.vipTable">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.scoreUpgradeMax }}</td>
                <td>{{ item.scoreRelegation }}</td>
                <td>{{ item.scoreUpgradeRate }}</td>
              </tr>
            </tbody>
          </table>
          <div class="p">{{ t("about.club.text06") }}</div>
          <div class="p">{{ t("about.club.text07") }}</div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { computed, onMounted, reactive } from "vue";
import { useUserStore } from "../../../store/user";
import { $post } from "../../../request";
import { useConfig } from "../../../hooks/platform";

const { PLAT_LOGO } = useConfig();
const state = reactive({
  vipTable: [],
  commissionTable: [],
});
const user = useUserStore();
const vipList = computed(() => user.vipList);
const { t } = useI18n();

const getVipTable = () => {
  $post("listLevel").then((res) => {
    if (res.code === 0) {
      state.vipTable = res.data;
    }
  });
};
// 获取佣金列表
const getCommissionRateList = () => {
  $post("commissionRateList").then((res) => {
    if (res.code === 0) {
      state.commissionTable = res.data;
    }
  });
};
onMounted(() => {
  getVipTable();
  getCommissionRateList();
  // if (!vipList.value.length) user.GET_VIP_INFO();
});
</script>

<style lang="scss" scoped>
:deep {
  .el-tabs__header {
    margin: 8px 0 30px;
    height: 32px;
  }
  .el-tabs__nav-wrap::after {
    display: none;
  }
  .p {
    font-size: 14px;
    padding-top: 20px;
    color: $main-text-color;
    line-height: 20px;
    display: flex;
  }
  table {
    margin-top: 15px;
    margin-bottom: 15px;
    border-spacing: 0;
    color: #8e99b6;
    width: 100%;
    text-align: center;
    border-right: solid 1px #8e99b6;
    border-bottom: solid 1px #8e99b6;
    line-height: 2;
    font-size: 18px;

    td,
    th {
      border-left: solid 1px #8e99b6;
      border-top: solid 1px #8e99b6;
    }
  }
}
.about-page {
  .about-content {
    background: #1a212a;
    border-radius: 20px;
    padding: 30px;
    margin-bottom: 36px;
  }

  .c {
    display: flex;
    align-items: center;

    .r {
      img {
        max-width: 180px;
      }
    }
  }

  .partner {
    padding: 30px;
    background: url("../../../assets/images/common/bg.png") center / cover
      no-repeat;
  }

  .about-content2 {
    margin-bottom: 20px;
  }

  .partner-item {
    margin-bottom: 50px;
    &:nth-child(2) {
      margin-top: 40px;
    }
  }

  .partner-title {
    display: flex;
    align-items: center;

    .partner-logo {
      margin-right: 14px;
      height: 34px;
      width: 34px;
      border-radius: 50%;
      overflow: hidden;

      img {
        height: 100%;
        width: 100%;
      }

      .icon {
        height: 100%;
        width: 100%;
      }
      //   background: #ffffff;
    }

    .partner-name {
      font-size: 20px;
      color: #ffffff;
      line-height: 14px;
    }
  }

  .about-title2 {
    border-bottom: solid 1px $main-border-bottom-color;
    padding-bottom: 30px;
  }

  .about-title {
    font-size: 22px;
    color: $main-color;
    font-weight: bold;
  }

  .about-tabs {
    .item {
      font-size: 14px;
      padding-left: 15px;
      padding-right: 15px;
      color: #8e99b6;
      background: #1a212a;
      border-radius: 16px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    :deep {
      .el-tabs__nav {
        .el-tabs__item {
        }

        .el-tabs__active-bar {
          display: none;
        }

        .el-tabs__item.is-active {
          .item {
            background: #11b85a;
            color: white;
          }
        }
      }
    }
  }
}
</style>
