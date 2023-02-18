<template>
  <div class="helpDetail-page">
    <div class="help-title">{{ t("help.GettingStarted") }}</div>
    <div class="details" v-for="(item, index) in state.helpList" :key="index">
      <div class="title" @click="showOff(index)">
        <div class="til">{{ item.title }}</div>
        <div class="arrow">
          <span
            :class="['arrowDown', { arrowUp: index === activeIndex }]"
          ></span>
        </div>
      </div>
      <div v-if="index === activeIndex" class="detailBox">
        <div v-html="item.content"></div>
      </div>
    </div>
    <no-data :text="t('noData.helpDetail')" v-show="!state.helpList.length" />
  </div>
</template>

<script setup>
import { useHelpStore } from "../../../store/help.js";
import { computed, onMounted, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const help = useHelpStore();

const state = reactive({
  helpList: {},
});
const activeIndex = ref("");
const getContents = async (data) => {
  const datas = await help.HELPCONTENT(data);
  state.helpList = datas.list.sort((a, b) => a.sort - b.sort);
};
const showOff = (index) => {
  activeIndex.value = activeIndex.value === index ? "" : index;
};
onMounted(() => {
  const id = localStorage.getItem("helpId");
  getContents({
    current: 1,
    data: {
      helpTypeId: id,
    },
    size: 100,
    sortField: [],
    sortKey: "DESC",
  });
});
</script>

<style lang="scss" scoped>
.help-title {
  margin: 30px 0px;
  color: #11b85a;
  font-size: 22px;
}
.details {
  background: #1a212a;
  border-radius: 12px;
  margin: 10px 0px;
  padding: 0 30px;
  .detailBox {
    padding: 20px 0;
    max-height: 294px;
    font-size: 14px;
    font-family: AvertaStd-Regular, AvertaStd-Regular-☞;
    font-weight: normal;
    text-align: left;
    color: #8e99b6;
    line-height: 20px;
    border-top: 1px solid #2d333c;
    overflow-y: scroll;
  }
  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 68px;
    width: 100%;
  }
  .til {
    flex: 1;

    font-size: 20px;
    text-align: left;
    color: #ffffff;
    font-family: AvertaStd-Bold, AvertaStd-Bold-☞;
  }
  .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
  .arrowUp {
    transform: rotateX(180deg);
  }
  .arrowDown {
    background: url("../../../assets/images/help/down.png") no-repeat;
    background-size: 100% auto;
    width: 10px;
    height: 6px;
    float: right;
    color: white;
  }
}
.help-row {
  display: flex;
  width: 100%;
  .help-box {
    flex: 1;
    height: 192px;
    .help-box-img {
      width: 141px;
      position: relative;
    }
    .help-box-text {
      position: relative;
      left: 150px;
      top: -141px;
      color: #8e99b6;
      font-weight: normal;
      h4 {
        color: #ffffff;
        margin: 10px 0px;
        font-size: 20px;
      }
      p {
        margin: 8px 0px;
        font-size: 16px;
      }
    }
    .help-box-btn {
      position: relative;
      left: 150px;
      color: #ffffff;
      width: 106px;
      height: 32px;
      background: #11b85a;
      border-radius: 16px;
      text-align: center;
      line-height: 32px;
      margin-top: 30px;
      top: -141px;
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
