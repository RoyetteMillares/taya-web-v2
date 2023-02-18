<template>
  <ul class="flex-box-between game-info">
    <li @click="pageTo(item)" :class="`b-h${i+1}`" class="game-list" v-for="(item,i) in gameList">
      <p class="is-bold game-name">{{item.name}}</p>
    </li>
  </ul>
</template>

<script  setup>
import {computed} from "vue";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
const {t}=useI18n()
const router=useRouter()
const props=defineProps({
  platList:{
    type:Array,
    default:[]
  }
})
const gameList=computed(()=>{
  const {platList}=props;
  // const gameList=[]
  const extraData={
    name:platList.length<3?t('extra.comingSoon'):t('extra.moreGame'),
    key:platList.length<3?'coming':'extra'
  }
  const realGame=platList.slice(0,3);
  const gameList=[...realGame]
  // console.log(realGame);
  const length=4-realGame.length;
  for (let i=0;i<length;i++){
    gameList.push(extraData)
  }
  return gameList
})
const pageTo=item=>{
  console.log(item);
  if(item.key){
    if(item.key==='extra') router.push({name:'slots'})
  }else router.push({name:'slots',params:{id:item.id}})
}
</script>

<style lang="scss" scoped>
.game-info{
  width: 820px;
  flex-wrap: wrap;
  .game-list{
    width: 400px;
    height: 212px;
    border-radius: 8px;
    background: url(@/assets/images/home/h1.png) no-repeat center center;
    background-size: 100% 100%;
    overflow: hidden;
    transition: all .3s;
    cursor: pointer;
    padding: 30px;
    box-sizing: border-box;
    margin-bottom: 16px;
    &:last-child,&:nth-child(3n){
      margin-bottom: 0;
    }
    &:hover{
      background-size: 110% 110%;
    }
    .game-name{
      font-weight: 700;
      font-size: 26px;
      color: #fff;
      margin-top: 50px;
    }
  }
  .b-h1{
    background-image:url(@/assets/images/home/h1.png)
  }
  .b-h2{
    background-image:url(@/assets/images/home/h2.png)
  }
  .b-h3{
    background-image:url(@/assets/images/home/h3.jpg)
  }
  .b-h4{
    background-image:url(@/assets/images/home/h4.png)
  }
}

</style>
