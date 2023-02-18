<template>
<div class="top-player flex-box">
  <p class="is-bold is-top">{{ t('extra.rank') }}</p>
  <ul class="title-top flex-box">
    <li @click="state.key=item.key" class="title-list flex-box is-center fs-16 is-bold" :class="{'title-list-active':state.key===item.key}" v-for="item in titleList">{{item.label}}</li>
  </ul>
  <ul class="top-list flex-box">
    <li class="w-25 list-item" v-for="item in topHeader">{{item.label}}</li>
  </ul>
  <ul class="top-list scroll-view">
    <div class="full-page">
      <ul class="scroll-page">
        <li class="flex-box full-list" v-for="item in list">
          <div class="w-25">{{item.name.replace(/^(\S{3})(\S{4})(\S+)/,"$1****$2")}}</div>
          <div class="w-25">{{item.game}}</div>
          <div class="w-25">{{item.amount}}</div>
          <div class="w-25">{{item.reward}}</div>
        </li>
      </ul>
    </div>
  </ul>
</div>
</template>

<script setup>
import {reactive} from "vue";
import {useI18n} from "vue-i18n";
const {t}=useI18n()
const state=reactive({
  key:"top"
})
const titleList=[
  {label:t('extra.top'),key:"top"},
  {label:t('extra.todayProfit'),key:"today"},
]
const topHeader=[
  {label:t('extra.username'),key:"username"},
  {label:t('extra.game'),key:"username"},
  {label:t('extra.betAmount'),key:"username"},
  {label:t('extra.profit'),key:"username"},
]
const list=[
  {name:"gcacacacasc234234",game:"asdasdada",amount:"123123",reward:"12120"},
  {name:"gcacacacasc234234",game:"asdasdada",amount:"123123",reward:"12120"},
  {name:"gcacacacasc234234",game:"asdasdada",amount:"123123",reward:"12120"},
  {name:"gcacacacasc234234",game:"asdasdada",amount:"123123",reward:"12120"},
  {name:"gcacacacasc234234",game:"asdasdada",amount:"123123",reward:"12120"},
  {name:"gcacacacasc234234",game:"asdasdada",amount:"123123",reward:"12120"},
  {name:"gcacacacasc234234",game:"asdasdada",amount:"123123",reward:"12120"},
  {name:"gcacacacasc234234",game:"asdasdada",amount:"123123",reward:"12120"},
  {name:"gcacacacasc234234",game:"asdasdada",amount:"123123",reward:"12120"},
  {name:"gcacacacasc234234",game:"asdasdada",amount:"123123",reward:"12120"},
  {name:"gcacacacasc234234",game:"asdasdada",amount:"123123",reward:"12120"},
]
</script>

<style lang="scss" scoped>
.top-player{
  width: 608px;
  height: 440px;
  background: #0a2329;
  border-radius: 8px;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  flex-direction: column;
  color: #B6C0C3;
  .is-top{
    font-weight: 500;
    font-size: 20px;
    color: $main-color;
    width: 100%;

  }
  .top-list{
    background: $main-bg-color;
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    .w-25{
      width: 25%;}
    .list-item{
      padding: 16px 0 14px;
    }
  }
  .title-top{
    margin-top: 15px;
    width: 100%;

    .title-list{
      border-radius: 8px 8px 0px 0px;
      height: 48px;
      color: #b6c0c3;
      width: 50%;
      background: $main-bg-color;
      cursor: pointer;
      transition: all .3s;
      &-active{
        background: $main-color;
        color: #fff;
      }
    }
  }
  .scroll-view{
    position: relative;
    flex:1;
    .full-page{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      padding: 0 15px;
      box-sizing: border-box;
      .full-list{
        padding: 10px 0;
        text-align: center;
        border-bottom: 1px solid rgba(112, 112, 112,.2);
        &:first-child{
          padding-top: 0;
        }
      }
      .scroll-page{
        animation: scrollTop 10s linear infinite;
      }

    }
  }
}
@keyframes scrollTop {
  from{
    transform: translateY(0);
  }
  to{
    transform: translateY(-70%);
  }
}
</style>
