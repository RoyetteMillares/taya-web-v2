<template>
  <section>
    <Teleport :disabled="showToBody" to="body">
      <transition name="modal">
        <section
          v-show="msgActivatedShow"
          class="custom-overlay flex-box"
        >
          <div
            v-show="msgActivatedShow"
            :class="{ activated: msgActivated, success: isSuccess }"
            class="customPopup"
          >
            <div class="msg">
              <svg-icon name="successfully"></svg-icon>
              {{ message }} {{extra}}
            </div>
            <!-- <p>
              <svg-icon v-if="isSuccess" name="successfully"></svg-icon>
              <svg-icon v-else name="err_msg"></svg-icon>
              {{ message }} {{ extra }}
            </p>
            <div class="linear" :class="{ expand: msgActivated }"></div> -->
          </div>
        </section>
      </transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, onMounted, useSlots } from "vue";
// import i18n from "@/locales";
// const t = i18n.global.t;
// const slot = useSlots();

const msgActivated = ref(false);
const msgActivatedShow = ref(false);

const customPopup = () => {
  setTimeout(() => {
    msgActivated.value = true;
  }, 0);
  setTimeout(() => {
    msgActivatedShow.value = false;
    msgActivated.value = false;
  }, 2000);
  msgActivatedShow.value = true;
};

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  extra: {
    type: String,
    default: "",
  },
  beforeClose: {
    type: Function,
  },
  // when click the overlay if need to hidden of the dialog
  overlayClick: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  isSuccess: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
  },
  resolve: {
    type: Function,
    default: () => {},
  },
  reject: {
    type: Function,
    default: () => {},
  },
  removeEl: {
    type: Function,
    default: null,
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
  showToBody: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

onMounted(async () => {
  await customPopup();
});
</script>

<style lang="scss" scoped>
.custom-overlay {
  position: fixed;
  //width: 100%;
  height: 100%;
  z-index: 100;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0);
  box-sizing: border-box;
  justify-content: center;
  align-items: flex-start;
  .customPopup {
    opacity: 0.3;
    //min-width: 320px;
    height: 39px;
    background: #e75353;
    border-radius: 8px 8px 0px 0px;
    text-align: center;
    line-height: 36px;
    position: fixed;
    z-index: 100;
    top: 18px;
    left: 50%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    
    opacity: 1;
    height: 39px;
    line-height: 39px;
    background: #7d8189;
    border-radius: 6px;
    font-size: 14px;
    font-weight: normal;
    color: #efefef;
    .msg {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      vertical-align: middle;
      padding: 0 20px;
      text-overflow: ellipsis;
      white-space: nowrap;
      .svg-icon {
        width: 18px;
        height: 18px;
        margin-right: 10px;
        vertical-align: middle;
      }
    }

    p {
      font-size: 14px;
      color: #ffffff;
      line-height: 40px;

      display: flex;
      justify-content: center;
      align-items: center;
      vertical-align: middle;
      .svg-icon {
        width: 18px;
        height: 18px;
        margin-right: 10px;
        vertical-align: middle;
      }
    }
    .linear {
      width: 0px;
      height: 3px;
      background: #e75353;
      position: absolute;
      left: 0;
      bottom: 0;
      &.expand {
        width: 320px;
        height: 3px;
        background: #ffffff;
        transition: all 2s ease-out;
        transition: transform 2s ease;
        transition: all 2s linear;
        -webkit-transition: all 2s linear;
      }
    }
    &.successXXX {
      background: #00bc4e;
      .linear {
        background: #ffffff !important;
      }
    }
    &.activated {
      opacity: 1;
      transition: all 250ms ease-out;
      transition: all 2s linear;
      -webkit-transition: all 2s linear;
    }
  }
}
</style>
