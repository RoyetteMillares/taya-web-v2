<template>
<div class="details-overlay flex-box" v-if="modelValue">
  <transition enter-active-class="animated fadeIn">
    <div v-show="modelValue" class="promote-container">
      <div class="blog-detail-content">
        <h2 class="flex-box">
          <span> {{ info.codeZh }}</span>

          <div @click="close" class="icon-close flex-box">
            <svg-icon name="close" class="close"></svg-icon>
          </div>
        </h2>

        <img v-splicing="info.img" alt="" />
        <div class="left-title mt-10">{{t('promote.title')}}</div>
        <div class="detail-content" v-html="info.descript"></div>

      </div>
      <div class="apply-now" v-if="getToken()">
        <button
          class="apply-now-btn"
          :disabled="info.isActivated"
          @click="applyPromotion"
        >
        {{ info.isActivated!==1 ? t('promote.button01') : t('promote.button02') }}        
      </button>
      </div>
    </div>
  </transition>
  </div>
</template>

<script setup>
import { $post } from "@/request/index";
import { customPopup } from "../../components/custom-popup";
import { reactive } from "vue";
import { useI18n } from "vue-i18n";
import {getToken} from "../../utils/permission";
import {dialogConfirm} from "../../components/custom-dialog";

const { t } = useI18n()
const props=defineProps({
  modelValue:{
    type:Boolean,
    default:false
  },
  info:{
    type:Object,
    default:{}
  },
  getList:{
    type: Function,

  }
})
const emit=defineEmits(['update:modelValue'])
const close=()=>{
  emit('update:modelValue',false)
}
async function applyPromotion() {
  // @ts-ignore
  const { code, msg } = await $post("applyPromotion", {  id: props.info.id });
  // 70316
  if (code === 0) {
    applySuccess()
  } else if(code===70316){
    dialogConfirm(msg,
      t('public.Reminder'),
      {
        showCancelButton:true,
        cancelText:t('extra.giveUp'),
        // confirmText:t('extra.giveUp')
      }).then(async ()=>{
      const data=await user.APPLY_PROMOTION({  id: props.info.id });
      if(data.code===0) applySuccess()
    })
  } else {
    // toast.error(msg);
  }
  // 70316
}
const applySuccess=()=>{
  props.getList()
  close()
  customPopup(t("promote.tooltip"),"",{isSuccess: true});
}

</script>

<style lang="scss" scoped>
.icon-close{
	position: relative;
}
.close{
	position: absolute;
	transition: transform .25s, opacity .25s;
	opacity: .7;
	cursor: pointer;
	font-size: 3em;
	font-family: serif;
	line-height: 1;
}

.close:hover{
	opacity: 1;
	transform: rotate(90deg);
}

.details-overlay{
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.6);
  align-items: flex-start;
  justify-content: center;
  .promote-container{
    width: 860px;
    padding:0 23px 0;
    background: $main-container-inner-bg;
    margin-top: 100px;
    border-radius: 20px;
    max-height: 80vh;
    overflow-y: scroll;
    box-sizing: border-box;
    position: relative;

  }
}
.blog-detail-content {
  //margin: 0 auto;
  //width: 800px;

  .activity {
    color: #fff;
    line-height: 50px;
    padding-left: 30px;
    font-size: 20px;
    background: linear-gradient(92deg, #232a33 3%, #1a212a 99%);
    border-radius: 6px;
  }

  .detail-content {
    margin-top: 30px;
    font-size: 14px;
    font-weight: normal;
    text-align: left;
    color: #B6C0C3;
    line-height: 36px;
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 12px;

  }

  h2 {
    background: $main-container-inner-bg;
    font-size: 22px;
    position: sticky;
    color: #b6c0c3;
    top: 0;
    left: 0;
    z-index: 2;
    text-align: center;
    padding: 23px 0 22px;
    .icon-close{
      position: absolute;
      right: 0;
      top: 10px;
      font-size: 16px;
      z-index: 10;
      cursor: pointer;
    }
  }


}
.apply-now {
  position: sticky;
  background: #112228;
  left: 0;
  bottom: -1px;
  width: 100%;
  text-align: center;
  padding:10px 0 20px;
  .apply-now-btn {
    width: 223px;
    height: 50px;
    background: $main-button-bg;
    border-radius: 6px;
    font-size: 16px;
    color: #fff;
    border: none;
    cursor: pointer;

    &[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
