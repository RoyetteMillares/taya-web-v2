<!--第二版header-->
<template>
<div class="v2-header" >
  <d2-container class="header-container flex-box-between">
    <section class="full-height flex-box menu-box">
      <img @click="pageTo('index')" class="plat-logo cursor" :src="PLAT_LOGO" alt="" />
      <ul class="flex-box menu-view ml-10">
        <li :class="{'menu-active':routeName===item.name}" class="fs-16 menu-item flex-box " @click="pageTo(item.name)" v-for="item in leftMenu" :key="item.name">{{item.label}}</li>
      </ul>
    </section>
<!--    右边部分-->
    <section class="flex-box menu-box full-height">
      <ul class="flex-box menu-view">
        <li class="fs-16 flex-box menu-item " :class="{'menu-active':routeName===item.name}" @click="pageTo(item.name)" v-for="item in rightMenu" :key="item.name">
          <div class="fs-icon flex-box">
            <svg-icon :name="item.icon"></svg-icon>
          </div>
          <p class="fs-14">{{item.label}}</p>
        </li>
      </ul>
      <div class="user-module">
        <!--      un login-->
        <section class="flex-box" v-if="!getToken()">
          <div class="to-register is-bold is-button" @click="pageTo('register')">
            {{ t("new.Register") }}
          </div>
          <div class="to-login is-bold ml-10 is-button" @click="pageTo('login')">
            {{ t("new.signIn") }}
          </div>
        </section>
        <!--      section logined-->
        <section v-else class="flex-box">
          <!--        player information-->
          <div class="show-info">
            <div @click="pageTo('profile')" class="show-player-name flex-box fs-12">
              <span>{{ user.info.username }}</span>
              <!--        vip-->
              <div class="vip-model flex-box" @click="pageTo('vip')">
                <!-- <svg-icon :name="user.info.levelId - 1 || 0"></svg-icon> -->
                <img class="vip-icon" v-realImg="USER_VIP_ICON?.icon" alt="" />
                <!-- Vip{{ user.info.levelId - 1 }} -->
              </div>

            </div>
            <div class="flex-box player-balance" @click="pageTo('recharge')">

              <span class="add-icon fs-12 mr-5">{{ t('new.assets') }}:</span>
              <span>{{ walletInfo.reelCoin }}</span>
              <span class="ml-5">{{ walletInfo.mainCurrency }}</span>
            </div>
          </div>

          <!--        message-->
          <div
            @click="pageTo('information')"
            class="user-message is-circle fs-16 flex-box"
          >
            <svg-icon name="notice"></svg-icon>
            <span class="show-new" v-show="+message.noticeCount > 0"></span>
          </div>
          <!--        to deposit-->
          <div
            class="to-login flex-box to-deposit is-button"
            @click="pageTo('recharge')"
          >
<!--          <span class="flex-box deposit-icon">-->
<!--            <svg-icon name="add"></svg-icon>-->
<!--          </span>-->
            <span class="deposit-name is-bold fs-12">{{ t("new.Deposit") }}</span>
          </div>

        </section>
      </div>
    </section>
<!--    <header class="flex-box-between"></header>-->
  </d2-container>
</div>
</template>

<script setup>
import {computed, onMounted, reactive} from "vue";
import {getToken} from "../../utils/permission";
import {useI18n} from "vue-i18n";
import {useUserStore} from "../../store/user";
import {useConfig} from "../../hooks/platform";
import {useWallet} from "../../store/wallet";
import {useMessage} from "../../store/message";
import {useRoute, useRouter} from "vue-router";

const { PLAT_LOGO } = useConfig();
const route=useRoute()
const router=useRouter()
const { t } = useI18n();
const user = useUserStore();
const vipList = computed(() => user.vipList);
const walletInfo = computed(() => useWallet().MAIN_WALLET); // 登陆成功请求钱包)
const USER_VIP_ICON = computed(() => user.USER_VIP_ICON);
const routeName = computed(() => route.name);
const message = useMessage();
const leftMenu=reactive([
  {label:t('new.home'),routes:"home",name:"index"},
  {label:t('extra.sports'),routes:"sports",name:"sports"},
  // {label:t('menu.Slots'),routes:"slots",name:"slots"},
  // {label:t('menu.Live'),routes:"live",name:"live"},
  // {label:t('extra.fishing'),routes:"fishing",name:"fishing"},
  // {label:t('extra.cockfight'),routes:"cockfight",name:"cockfight"},

])
const rightMenu=reactive([
  {label:t('menu.Affiliate'),routes:"agent",name:"affiliate",icon:"v2_agent"},
  {label:t('menu.Promotions'),routes:"promotions",name:"promote",icon:"v2_promotions"},
  {label:t('menu.Blog'),routes:"news",name:"blog",icon:"v2_news"},
  {label:"VIP",routes:"vip",name:"vip",icon:"v2_vip"},
])
const pageTo=(name)=>{
  router.push({name})
}
onMounted(async () => {
  if (getToken()) {
    await message.GET_NOTICE_COUNT();
    if (!vipList.value.length) await user.GET_VIP_INFO();
  }
});
</script>

<style lang="scss" scoped>
$header-height:60px;
.v2-header{
  background: $main-header-bg;
  position: sticky;
  left: 0;
  top: 0;
  //height: $header-height;
  width: 100%;
  padding: 10px 0 0;
  z-index: 100;
  .header-container{
    height: 100%;
    .full-height{
      height: 100%;
    }
    .plat-logo{
      height: 42px;
    }
    .menu-box{
      color: $main-text-color;
      .menu-view{
        //margin-left: 62px;
        .menu-item{
          padding:0 18px ;
          box-sizing: border-box;
          height:$header-height;
          flex-direction: column;
          justify-content: center;
          //line-height:$header-height ;
          cursor: pointer;
          position: relative;
          .fs-icon{
            font-size: 18px;
          }
          &:after{
            transform: scale(0);
            content: '';
            width: 100%;
            height: 4px;
            background: $main-color;
            position: absolute;
            left: 0;
            bottom: 0;
            transition: all .3s;
          }
          &:hover{
            background: linear-gradient(180deg,rgba(123,195,211,0.00), #8bddef);
            &:after{
              transform: scale(1);
            }
          }
        }
        .menu-active{
          background: linear-gradient(180deg,rgba(123,195,211,0.00), #8bddef);
          &:after{
            transform: scale(1);
          }
        }
      }

    }

  }
}
.user-module{
  margin-left: 20px;
}
.is-button {
  padding: 10px 22px;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
}
.to-register {
  background: #477684;
  color: #fff;
  animation: shadowZoom 1s infinite;
}
.to-login {
  background: $main-color;
  color: #fff;
}

.to-deposit {
  margin-left: 0;
  .deposit-icon {
    font-size: 12px;
    margin-right: 5px;
  }
}
.is-circle {
  width: 36px;
  height: 36px;
  background: #1a212a;
  border-radius: 50%;
  cursor: pointer;
  justify-content: center;
  color: #fff;
}
.user-message {

  position: relative;
  background: rgba(255,255,255,.2);
  margin-right: 16px;
  color: $main-color;
  .show-new {
    width: 4px;
    height: 4px;
    background: $main-color;
    border-radius: 50%;
    position: absolute;
    top: 7px;
    right: 7px;
  }
}

.show-info {
  text-align: right;
  margin-right: 50px;
  .show-player-name {
    color: #8e99b6;
    margin-bottom: 8px;
    cursor: pointer;
  }
  .player-balance {
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    .add-icon {
      //color: $main-color;
    }
  }
  .vip-model {
    //margin: 0 14px;
    //font-size: 33px;
    height: 15px;
    margin-left: 8px;
    cursor: pointer;
    .vip-icon {
      height: 100%;
      max-width: 52px;

      fill: currentColor;
      vertical-align: middle;
    }
  }
}
</style>
