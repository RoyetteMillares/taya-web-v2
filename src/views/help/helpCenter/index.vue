<template>
  <div class="help-page">
    <div class="help-title">{{t("help.title")}}</div>
    <div v-if="tyList.length > 0">
      <main-container
        class="helps"
        v-for="(group, index) in tyList"
        :key="index"
      >
        <div class="help-box" v-for="item in group" :key="item.id">
          <img v-splicing="item.imageUrl" />
          <div class="content">
            <div class="help-box-text">
              <div class="title">{{ item.typeName }}</div>
              <div class="sub-title" v-for="(listHelpInfo, j) in item.listHelpInfo" :key="j">{{listHelpInfo.title}}</div>
              <!-- <p
                :key="j"
                v-for="(listHelpInfo, j) in item.listHelpInfo"
                class="sub-title"
                v-html="listHelpInfo.content"
              /> -->
            </div>

            <!-- <div class="help-box-btn" @click="goDetail(item.id)">{{t("help.seeAll")}}</div> -->
            <div class="btn" @click="goDetail(item.id)">
              <span>{{t("help.seeAll")}}</span>
              <svg-icon name="arrow_r"></svg-icon>
            </div>

          </div>
        </div>
      </main-container>
    </div>

    <!-- <div class="help-wc">
      <img src="../../../assets/images/help/wechat.png">
      <h2>Live Chat</h2>
      <p>We offer 24/7 support</p>
    </div> -->
  </div>
</template>

<script setup>
import { useHelpStore } from "@/store/help.js";
import { computed, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const router = useRouter();

const help = useHelpStore();
const tyList = computed(() => help.typesList);

const getTypes = () => {
  const payload = { current: 1, size: 6 };
  help.HELPTYPES(payload);
};

const goDetail = (id) => {
  localStorage.setItem("helpId", id);
  router.push({ name: "helpDetail" });
};

onMounted(() => {
  getTypes();
});
</script>

<style lang="scss" scoped>
.help-title {
  margin: 30px 0px;
  color: #11b85a;
  font-size: 22px;
}
.helps {
  margin-bottom: 30px;
  padding: 30px 10px 28px 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.help-box {
  width: 100%;
  display: flex;
  flex-direction: row;

  img {
    width: 114px;
    height: 114px;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 33px;
    .help-box-text {
      color: #8e99b6;
      font-weight: normal;
      display: flex;
      flex-direction: column;
      gap: 12px;
      .title {
        color: #ffffff;
        font-size: 16px;
        line-height: 20px;
      }
      .sub-title {
        font-size: 14px;
        line-height: 20px;
        color: #8e99b6;
      }
    }
    .help-box-btn {
      color: #ffffff;
      //width: 106px;
      height: 32px;
      padding: 0 40px;
      background: #11b85a;
      border-radius: 16px;
      text-align: center;
      line-height: 32px;
      margin-top: 20px;
      cursor: pointer;
    }
    .btn {
      color: #ffffff;
      line-height: 32px;
      margin-top: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      span {
        margin-right: 8px;
      }
    }
  }
}
.help-wc {
  text-align: center;
  width: 100%;
  height: 100px;
  background: #11b85a;
  border-radius: 20px;
  h2 {
    color: #ffffff;
    font-size: 24px;
    padding-top: 20px;
    padding-bottom: 13px;
    position: relative;
    top: -86px;
  }
  p {
    font-size: 16px;
    color: #ffffff;
    font-family: AvertaStd-Regular, AvertaStd-Regular-☞;
    font-weight: normal;
    position: relative;
    top: -86px;
  }
  img {
    position: relative;
    left: -130px;
    height: 55px;
    margin-top: 20px;
  }
}
</style>
