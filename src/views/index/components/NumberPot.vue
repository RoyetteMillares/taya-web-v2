<template>
  <div class="main-banner">
    <div class="div-p1">
      <!-- <img src="@img/electron/el2.png" alt /> -->
      <div class="chartNum">
        <div class="box-item">
          <!-- {{numberArr}} -->
          <li v-for="(item, index) in numberArr" :key="index"
            :class="{ 'number-item': !isNaN(item), 'mark-item': isNaN(item) }" :style="{ 'transform': 'trans' }">
            <span v-if="!isNaN(item)">
              <i ref="numberItem" :style="{ 'transform': `translate(-50%, -${numberArr[index] * 10}%)` }">0123456789</i>
            </span>
            <span class="comma" v-else>{{ item }}{{item}}</span>
          </li>
        </div>
      </div>
    </div>
    <div class="div-p2">
      <!-- <img src="@img/electron/el1.png" alt /> -->
    </div>
  </div>
</template>

<script>
export default {
  props:{
    num:{
      type:Number,
      default:17245678
    }
  },
  data() {
    return {
      // 订单数字
      orderNum: [
        '0',
        '0',
        ',',
        '0',
        '0',
        '0',
        ',',
        '0',
        '0',
        '0',
      ],
      // 每个item
      numberItem: '01234567',
      // 数字数组
      numberArr: [
        '0',
        '0',
        '0',
        '0',
        '0',
        '0',
        '0',
        '0',
      ],
      data: {
        potrankList: [],
        jackpotSettings: [],
        decimals: 2, // 参数设置
        duration: 5000000000, // 参数设置
      },
      timrsTwo: null,
    }
  },
  methods: {
    setNumberTransform() {
      const numberItems = this.numberItem; // 拿到数字的ref，计算元素数量
      this.numberArr = this.orderNum.filter((item) => !isNaN(item));
      // 结合CSS 对数字字符进行滚动,显示订单数量
      if (numberItems.length) {
        for (let index = 0; index < numberItems.length; index++) {
          // const elem = numberItems[index];
          // elem.style.transform = `translate(-50%, -${this.numberArr[index] * 10}%)`;
        }
      }
    },
  // 处理总订单数字
  toOrderNum(num) {
      // console.log(num,'num-----')
      num = num.toString();
      // 把订单数变成字符串
      if (num.length < 8) {
        num = `0${num}`; // 如未满八位数，添加"0"补位
        this.toOrderNum(num); // 递归添加"0"补位
      } else if (num.length === 8) {
        // 订单数中加入逗号
        num = `${num.slice(0, 2)},${num.slice(2, 5)},${num.slice(5, 8)}`;
        this.orderNum = num.split(''); // 将其便变成数据，渲染至滚动数组
      } else {
        // 订单总量数字超过八位显示异常
        // this.$message.warning('订单总量数字过大，显示异常，请联系客服');
      }
    },
    platRun() {
      const { decimals, duration } = this.data;
      // 为了拉霸效果，设置.5s的动画
      const delay = 500;
      const st = new Date().getTime();
      // const i = 3;
      const list = [
        {name:1,
          pot_money: this.num
        },
      ];
      list.forEach((val) => {
        this.data.jackpotSettings[val.name] = {
          startVal: val.pot_money,
          endVal: val.pot_money * 2,
          duration,
          decimals,
        };
      });

      const st2 = new Date().getTime() - st;
      let pot = `${list[0].pot_money}`;
      pot = pot.replace(/\./g, '');
      pot = parseInt(pot);
      const end = pot * 2;
      let timrs = null;

      if (st2 > delay) {
        timrs = setInterval(() => {
          pot += 12;
          // this.$nextTick(() => {
          this.toOrderNum(pot);
          this.setNumberTransform();
          // })
          if (pot === end) {
            clearInterval(timrs);
          }
        }, 1000);
        this.data.potrankList = list;
      } else {
        setTimeout(() => {
          this.timrsTwo = setInterval(() => {
            pot += parseInt(Math.random()*100)+1;
            this.toOrderNum(pot);
            this.setNumberTransform();
            if (pot === end) {
              clearInterval(this.timrsTwo);
            }
          }, 1000);

          this.data.potrankList = list;
        }, delay - st2);
        // setTimeout(() => {
        //   data.potrankList = list;
        // }, delay - st2);
      }
    }
  },
  mounted() {
    clearInterval(this.timrsTwo);
    this.platRun()
  }
}
</script>

<style lang="scss" scoped>
.main-banner {
  position: relative;
  //width: 1200px;
  margin: 20px auto 0;
  display: flex;

  .div-p1 {
    margin-top: 20px;

    img {
      width: 508px;
    }
  }

  .div-p2 {
    img {
      width: 780px;
    }
  }

  >.bg {
    display: block;
    height: 500px;
    //width: 1300px;
    margin: 0 auto;
    background-position: center;
  }

  .chartNum {
    position: absolute;
    bottom: 0;
    left: 0;
  }

  /*订单总量滚动数字设置*/
  .box-item {
    position: relative;
    height: 40px;
    font-size: 24px;
    line-height: 41px;
    text-align: center;
    list-style: none;
    color: #2d7cff;
    writing-mode: vertical-lr;
    text-orientation: upright;
    /*文字禁止编辑*/
    -moz-user-select: none;
    /*火狐*/
    -webkit-user-select: none;
    /*webkit浏览器*/
    -ms-user-select: none;
    /*IE10*/
    -khtml-user-select: none;
    /*早期浏览器*/
    user-select: none;
    /* overflow: hidden; */

    li:nth-child(2) {
      margin-right: 15px;

      //&::after {
      //  content: ",";
      //  position: relative;
      //  left: -26px;
      //  bottom: -8px;
      //}
    }

    li:nth-child(5) {
      margin-right: 15px;
      //
      //&::after {
      //  content: ",";
      //  position: relative;
      //  left: -26px;
      //  bottom: -8px;
      //}
    }

    li:nth-child(8) {
      margin-right: 15px;

      &::after {
         //content: ".";
        position: relative;
        left: -26px;
        bottom: -8px;
      }
    }
  }

  /* 默认逗号设置 */
  .mark-item {
    width: 10px;
    height: 80px;
    margin-right: 5px;
    line-height: 10px;
    font-size: 18px;
    position: relative;
    background-image: none !important;

    &>span {
      position: absolute;
      width: 100%;
      bottom: 0;
      writing-mode: vertical-rl;
      text-orientation: upright;
      color: #556378;
    }
  }

  /*滚动数字设置*/
  .number-item {
    width: 25px;
    height: 54px;
    list-style: none;
    margin-right: 5px;
    border-radius: 4px;
    color: $main-color;
    // background: url("@img/electron/home_slot_jishu_bg.png");
    background-size: 100% 100%;

    &>span {
      position: relative;
      display: inline-block;
      margin-right: 10px;
      width: 100%;
      height: 100%;
      writing-mode: vertical-rl;
      text-orientation: upright;
      overflow: hidden;
      color: $main-color;
      &>i {
        font-style: normal;
        position: absolute;
        top: 11px;
        left: 50%;
        transform: translate(-50%, 0);
        transition: transform 1s ease-in-out;
        letter-spacing: 40px;
        font-size: 40px;
        font-weight: 600;
      }
    }
    .comma{
      font-size: 50px;
    }
  }

  .number-item:last-child {
    margin-right: 0;
  }
}
</style>
