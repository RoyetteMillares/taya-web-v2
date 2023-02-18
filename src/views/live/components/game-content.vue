<template>
  <section class="game-content">
    <div class="all-header flex-box-between">
      <p class="p-title left-title is-bold">{{ title || t("live.AllGames") }}</p>
      <!--      <div class="game-search flex-box">-->
      <!--        <span class="mr-10">Type</span>-->
      <!--        <el-select :teleported="false">-->
      <!--          <el-option v-for="item in 10" :label="item" :value="item"></el-option>-->
      <!--        </el-select>-->
      <!--      </div>-->
    </div>
    <section class="section-all">
      <ul class="game-all flex-box">
        <GameItem :item="item" v-for="item in gameList" />
<!--        <li class="all-item" @click="startGame(item)" v-for="item in gameList">-->
<!--          &lt;!&ndash;           :style="{ backgroundImage: `url(${item.img})` }"&ndash;&gt;-->
<!--          <div v-ground="item.img" class="show-img flex-box">-->
<!--            <div @click.stop="gameCollection(item)" class="flex-box show-icon">-->
<!--              <svg-icon-->
<!--                :name="item.isFavorite ? 'collection-active' : 'collection'"-->
<!--              ></svg-icon>-->
<!--            </div>-->
<!--          </div>-->
<!--          <p class="game-name is-hidden">{{ item.name }}</p>-->
<!--          &lt;!&ndash;          <p class="is-hidden game-title">{{ item.platName }}</p>&ndash;&gt;-->
<!--        </li>-->
      </ul>
      <div class="flex-box is-center" v-show="total >= size || page > 1">
        <custom-pagination
          @handleCurrentChange="handleCurrentChange"
          :total="total"
          :size="size"
          :page="page"
        />
        <!--        <el-pagination-->
        <!--          v-model:page="page"-->
        <!--          v-model:page-size="size"-->
        <!--          :small="false"-->
        <!--          :disabled="false"-->
        <!--          prev-text="Previous"-->
        <!--          next-text="Next"-->
        <!--          layout="prev, pager, next"-->
        <!--          :total="total"-->
        <!--          @size-change="handleSizeChange"-->
        <!--          @current-change="handleCurrentChange"-->
        <!--        />-->
      </div>
      <no-data
        v-show="!gameList.length"
        type="collection"
        class="empty-tip"
        :text="t('noData.modeGame')"
      ></no-data>
      <!--      <p class="empty-tip" v-show="!gameList.length">Not game yet</p>-->
    </section>
  </section>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const {t} = useI18n()
import GameItem from "../../index/components/modules/game-item.vue"
const props = defineProps({
  page: {
    type: [Number, String],
  },
  size: {
    type: [Number, String],
  },
  total: {
    type: [Number, String],
  },
  gameList: {
    type: Array,
  },
  gameCollection: {
    type: Function,
  },
  handleCurrentChange: {
    type: Function,
  },
  title: {
    type: String
  },
  startGame: {
    type: Function,
  },
});
const currentChange = (val) => {
  // console.log(val);
};
</script>

<style lang="scss" scoped>
.game-content {
  .p-title {
    //font-size: 22px;
    //color: $main-color;
    margin-bottom: 20px;
  }
  .game-search {
    font-size: 14px;
    color: $main-text-color;
  }
  :deep(.el-input__wrapper) {
    background: #1a212a;
    border-radius: 16px;
    height: 32px;
    box-shadow: none;
    &:hover {
      //--el-input-hover-border-color: $main-color;
      box-shadow: none;
    }
    .el-input__inner {
      font-size: 16px;
      color: #fff;
      &::placeholder {
        font-size: 14px;
        color: #8e99b6;
      }
    }
  }
  :deep(.el-popper) {
    --el-bg-color-overlay: #232a33;
    --el-fill-color-light: rgba(0, 0, 0, 0.2);
  }
  .section-all {
    //background: #1a212a;
    //border-radius: 20px;
    //padding: 24px 0 40px 24px;
    //margin-top: 20px;
  }
  .game-all {
    flex-wrap: wrap;

    //.all-item {
    //  //width: 160px;
    //  cursor: pointer;
    //  position: relative;
    //  .show-icon {
    //    position: absolute;
    //    top: 10px;
    //    right: 10px;
    //  }
    //  &:hover {
    //    .show-img {
    //      transform: scale(1.1);
    //      //background-size: 130% 130%;
    //    }
    //  }
    //  .show-img {
    //    height: 126px;
    //    width: 168px;
    //    background: url(@/assets/default/taya.gif) no-repeat center center;
    //    background-size: cover;
    //    border-radius: 6px;
    //    transition: all 0.3s;
    //    transform: scale(1);
    //    //padding: 10px;
    //    box-sizing: border-box;
    //    justify-content: flex-end;
    //    align-items: flex-start;
    //  }
    //  margin: 0 30px 24px 0;
    //  &:nth-child(6n) {
    //    margin-right: 0;
    //  }
    //  .game-name {
    //    font-size: 14px;
    //    color: #fff;
    //    margin: 10px 0 0;
    //    max-width: 168px;
    //    white-space: nowrap;
    //    overflow: hidden;
    //    text-overflow: ellipsis;
    //  }
    //  .game-title {
    //    color: $main-text-color;
    //    font-size: 12px;
    //  }
    //}
  }
}
.empty-tip {
  //margin: 50px 0;
  color: #fff;
  font-size: 18px;
  text-align: center;
}
</style>
