<template>
  <el-carousel height="500px">
    <el-carousel-item v-for="item in bannerList" :key="item.img">
      <img class="banner-img" :src="item.img" alt="">
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
import Banner from "@/assets/images/home/banner.png"
import {useHomeStore} from "../../../store/home.js";
import {computed, onMounted} from "vue";
const Home = useHomeStore();
const bannerList = computed(() => Home.bannerList)
onMounted(() => {
  Home.GET_BANNER()
})
</script>

<style lang="scss" scoped>
.banner-img{
  height: 100%;
  width: 100%;
}
</style>
