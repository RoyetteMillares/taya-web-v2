<template>
  <section>
    <Teleport :disabled="showToBody" to="body">
      <transition name="modal">
        <section
          @click.self="closeDialog"
          v-show="modelValue"
          class="custom-overlay flex-box"
        >
          <transition name="fade-scale">
            <div class="dialog-modal modal-container" v-show="modelValue">
              <!--          header-->
              <div class="dialog-header">{{ title }}</div>
              <section class="show-content">
                <!--        content  -->
                <div class="show-content-modal">
                  <div class="show-message fs-18">{{ message }}</div>
                  <slot></slot>
                </div>
                <!--          footer-->
                <slot name="footer" v-if="slot.footer"></slot>
                <div
                  v-if="showFooter && !slot.foote"
                  class="footer-modal flex-box"
                >
                  <el-button
                    @click="cancel"
                    v-if="showCancelButton"
                    class="dialog-button is-half cancel-button"
                    type="info"
                  >
                    <span class="fs-14 is-bold">{{ cancelText }}</span>
                  </el-button>
                  <el-button
                    @click="confirm"
                    class="dialog-button"
                    :class="showCancelButton ? 'is-half' : 'is-full'"
                    type="primary"
                  >
                    <span class="fs-14 is-bold">{{ confirmText }}</span>
                  </el-button>
                </div>
              </section>

              <span class="close-icon" @click="closeDialog">
                <svg-icon name="close"></svg-icon>
              </span>
            </div>
          </transition>
        </section>
      </transition>
    </Teleport>
  </section>
</template>

<script setup>
import { useSlots } from "vue";

import i18n from "@/locales";
const t = i18n.global.t;
const slot = useSlots();
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: () => i18n.global.t("public.title"),
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
  showCancelButton: {
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
  cancelText: {
    type: String,
    default: () => i18n.global.t("public.Cancel"),
  },
  confirmText: {
    type: String,
    default: () => i18n.global.t("public.Confirm"),
  },
});
const emit = defineEmits(["update:modelValue", "confirm"]);
const closeDialog = () => {
  if (props.removeEl) props.removeEl();
  if (props.beforeClose) props.beforeClose();
  else emit("update:modelValue", false);
};
const cancel = () => {
  closeDialog();
  if (props.reject) props.reject(false);
};
const confirm = () => {
  emit("confirm");
  if (props.resolve) {
    props.resolve(true);
    closeDialog();
  }
  // closeDialog();
};
</script>

<style lang="scss" scoped>
.custom-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  padding-top: 150px;
  box-sizing: border-box;
  justify-content: center;
  align-items: flex-start;
  .dialog-modal {
    background: #1a212a;
    border-radius: 20px;
    padding: 30px 30px 60px 30px;
    min-width: 516px;
    //min-height: 428px;
    text-align: center;
    position: relative;
    box-sizing: border-box;
    .dialog-header {
      font-size: 18px;
      text-align: center;
      color: #8e99b6;
    }
    .show-content {
      margin-top: 50px;
      display: inline-block;
      min-width: 400px;
      .show-content-modal {
        min-height: 100px;
        .show-message {
          color: $main-text-color;
          max-width: 400px;
        }
      }
      .footer-modal {
        width: 100%;
        justify-content: space-between;
        .dialog-button {
          height: 44px;
          border-radius: 25px;
          font-size: 22px;
        }
        .is-full {
          width: 280px;
          margin: 0 auto;
        }
        .is-half {
          width: 49%;
        }
        .cancel-button {
          color: $main-text-color;
        }
      }
    }
    .close-icon {
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 16px;
      cursor: pointer;
    }
  }
}
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
