<template>
<div class="top-rank">
  <ul class="top-header flex-box">
    <li class="top-item cursor" @click="changeTitle(item)" :class="{'top-item-active':item.key===state.key}" v-for="item in menuList" :key="item.key">{{item.label}}</li>
  </ul>
  <section class="scroll-max">
    <ul class="rank-list scroll-page" ref="scroller">
      <li class="rank-item flex-box" v-for="(item,i) in rankList" :key="i">
      <span v-if="i<=2" class="flex-box fs-30 w-20 mr-10">
         <svg-icon :name="`w${i}`"></svg-icon>
      </span>
        <span class=" mr-10 fs-18 w-20" v-else>{{i}}</span>
        <div class="full-main">
          <p class="fs-16 mb-5">{{item.username.replace(/^([\S\s]{2})[\S\s]+([\S\s]{2})$/, "$1 **** $2")}}</p>
          <section class="flex-box-between">
            <span class="fs-16">{{t('extra.gameBet',{name:item.groupName,bet:item.validStake})}}</span>
            <span class="fs-16 is-active">{{t('extra.InProfit',{amount:item.profit})}}</span>
          </section>
        </div>
      </li>
    </ul>
  </section>

</div>
</template>

<script setup>
import {computed, reactive, onMounted, ref, nextTick} from "vue";
import {useI18n} from "vue-i18n";
import {useHomeStore} from "../../../../store/home";
const scroller=ref(null)
const home=useHomeStore()
const {t}=useI18n()
const state=reactive({
  key:"top"
})
const menuList=[
  {label:t('extra.top'),key:"top",category:0},
  {label:t('extra.todayProfit'),key:"todayProfit",category:1},
]
const rankList=computed(()=>home.rankList)
const changeTitle=(item)=>{
  scroller.value.classList.remove('scroll-page');
  setTimeout(()=>{
    scroller.value.classList.add('scroll-page');
  })
  state.key=item.key;
  getRankingList(item.category)
}

onMounted(()=>{
  getRankingList(0)
})
// 获取
const getRankingList=(category)=>{
  home.GET_RANK({category})
}
</script>

<style lang="scss" scoped>
.top-rank{
  width: 508px;
  background: var(--theme-header-bg);
  .top-header{
    width: 100%;
    .top-item{
      padding: 12px ;
      font-size: 16px;
      font-weight: 500;
      color: var(--theme-tab-color);
      text-align: center;
      width: 50%;
      box-sizing: border-box;
      border-radius: 8px 8px 0px 0px;
      &-active{
        background: var(--theme-main-color);
        color: #fff;
      }

    }
  }
}
.rank-list{
  padding: 11px;
  color: var(--theme-tab-color);
  .rank-item{
    padding: 13px 0;
    border-bottom: 1px solid rgba(255,255,255,.2);
    &:last-child{
      border-bottom: 0;
    }
    .w-20{
      width: 35px;

      text-align: center;
    }
    .fs-30{
      font-size: 30px;
    }
    .mr-20{
      margin-right: 20px;
    }
    .full-main{
      flex:1;
    }
  }
}
.scroll-max{
  max-height: 400px;
  overflow: hidden;
}
.scroll-page{
  animation: scrollTop 30s linear infinite;
  animation-play-state: running;
  cursor: pointer;
  &:hover {
    animation-play-state: paused;
  }
}
@keyframes scrollTop {
  from{
    transform: translateY(0);
  }
  to{
    transform: translateY(-50%);
  }
}
</style>
