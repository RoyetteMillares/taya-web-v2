<template>
  <div class="van-over flex-box" v-show="maintenanceInfo.status==1">
    <div class="maintenance-container">
      <p class="maintenance-title is-bold">{{t('extra.maintenance')}}</p>
      <p class="estimated-time fs-14">{{t('extra.EstimatedTime')}}</p>
      <div class="maintenance-time fs-12">
        {{dayjs(maintenanceInfo.startTime*1000).format('MM/DD/YYYY HH:mm')  }}
        -
        {{dayjs(maintenanceInfo.endTime*1000).format('MM/DD/YYYY HH:mm')}}
      </div>
    </div>
  </div>
</template>

<script  setup>
import dayjs from "dayjs";
import {useI18n} from "vue-i18n";
import {useAppStore} from "@/store/app";
import {computed} from "vue";

const {t}=useI18n();
const config=useAppStore();

const maintenanceInfo=computed(()=>{
  let info={}
  try {
    info=JSON.parse(config.config.find(item=>item.title==='maintenance').value);
  }catch (e) {

  }finally {
    return  info
  }
})
</script>

<style lang="scss" scoped>
.van-over{
  z-index: 99999;
  justify-content: center;
  padding: 0 18px;
  font-size: 12px;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.7);
  .maintenance-container{
    background: url(@/assets/images/error/maintenance.png) no-repeat center center;
    background-size: 100% 100%;
    padding: 82px 0 0 100px;
    width: 595px;
    box-sizing: border-box;
    height: 237px;

    text-align: center;
    .maintenance-title{
      color: #B8D0D8;
      font-size: 20px;
    }
    .estimated-time{
      margin: 18px 0 12px;
      color: var(--theme-sub-color);
    }
    .maintenance-time{
      padding: 9px 14px;
      color: #ffff;
      background: rgba(52, 184, 213,.2);
      display: inline-block;
      border-radius: 6px;
    }
  }

}
</style>
