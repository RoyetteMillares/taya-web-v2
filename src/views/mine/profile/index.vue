<template>
  <section class="profile-main">
    <CardListView />

    <section class="flex-box-between mine-user">
      <main-container
        class="change-item"
        v-for="item in playerInfoList"
        :key="item.icon"
      >
        <div class="flex-box-between">
          <div class="flex-box">
            <span class="flex-box show-icon">
              <svg-icon :name="item.icon"></svg-icon>
            </span>
            <div>
              <span class="show-label">{{ item.label }}</span>
              <div class="show-value">{{ item.value }}</div>
            </div>

          </div>
          <div class="flex-box">

            <span class="show-revise flex-box is-center" @click="openDialog(item)">
              {{ item.edit }}
            </span>
          </div>
        </div>
      </main-container>
    </section>
    <custom-dialog
      v-model="visible"
      :title="componentInfo.title"
      :showFooter="false"
    >
      <component
        :visible="visible"
        :changeVisible="changeVisible"
        :googleInfo="state.googleInfo"
        :openInputAuth="openInputAuth"
        :is="componentInfo.component"
      ></component>
    </custom-dialog>
    <InputAuth
      :login="bindCode"
      :title="t('mine.profile.GoogleAuthenticator')"
      v-model="inputVisible"
    />
  </section>
</template>

<script setup>
import { useUserStore } from "../../../store/user";
import { reactive, computed, ref, onMounted } from "vue";
import CardListView from "./card-list-view.vue";
import GoogleAuthenticator from "./components/google-authenticator.vue";
import ResetPassword from "./components/reset-password.vue";
import InputAuth from "@/views/login/component/input-auth.vue";
import ResetMail from "./components/reset-mail.vue";
import { dialogConfirm } from "../../../components/custom-dialog";
import { $post } from "@/request";
import ResetMobile from "./components/reset-mobile.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const visible = ref(false);
const inputVisible = ref(false);
const user = useUserStore();
const info = computed(() => user.info);
const name = ref("google");
const state = reactive({
  googleInfo: {},
});
const playerInfoList = computed(() => [
  // {
  //   label: t("mine.profile.Email"),
  //   icon: "main-box",
  //   value: info.value.email,
  //   edit: t("additional.Change"),
  //   key: "email",
  //   component: ResetMail,
  //   title: "Email Modification",
  // },
  {
    label: t("mine.profile.Password"),
    title: "Password",
    value:"*******",
    icon: "Password",
    edit: t("additional.Change"),
    key: "password",
    component: ResetPassword,
  },
  {
    label: t("mine.profile.Phone"),
    title: "Phone Number",
    icon: "phone-number",
    value: `${info.value.areaCode} ${info.value.mobile}`,
    edit: t("additional.Change"),
    key: "phone",
    component: ResetMobile,
  },
  {
    label: t("mine.profile.GoogleAuthenticator"),
    title: "Google Authenticator",
    icon: "google-authenticator",
    value:
      info.value.googleCodeStatus === -1
        ? t("mine.profile.Unbind")
        : info.value.googleCodeStatus === 1
        ? t("mine.profile.Opened")
        : t("mine.profile.Unopened"),
    edit:
      info.value.googleCodeStatus === -1
        ? t("mine.profile.Bind")
        : t("mine.profile.Change"),
    key: "google",
    component: GoogleAuthenticator,
  },
]);

const componentInfo = computed(() =>
  playerInfoList.value.find((val) => val.key === name.value)
);
const changeVisible = () => {
  visible.value = !visible.value;
};
const openInputAuth = () => {
  visible.value = false;
  inputVisible.value = true;
};
const openDialog = (item) => {
  if (item.key === "google") {
    const { googleCodeStatus } = info.value;
    if (googleCodeStatus === -1) {
      getCode();
      visible.value = true;
    } else changeStatus();
  } else {
    visible.value = true;
  }
  name.value = item.key;
  // console.log(item);
  // dialogConfirm("test", "demo").then(() => {
  //   console.log(99999);
  // });
  // visible.value = true;
};
const getCode = () => {
  $post("createGoogleCode").then((res) => {
    if (res.code === 0) {
      state.googleInfo = res.data;
    }
  });
};
// bind the code of google authenticator
const bindCode = (data) => {
  const { secret } = state.googleInfo;
  const params = { ...data, secret };

  $post("bindGoogleCode", params).then((res) => {
    if (res.code === 0) {
      inputVisible.value = false;
      user.GET_USER_PROFILE();
    }
  });
};
const changeStatus = () => {
  // 	谷歌验证码状态:-1未绑定 0开启，1关闭
  const { googleCodeStatus } = info.value;
  const message =
    googleCodeStatus === 1
      ? t("mine.profile.sureTurnOffGoogleAuthenticator")
      : t("mine.profile.sureTurnONGoogleAuthenticator");
  dialogConfirm(message, t("mine.profile.Reminder"), {
    showCancelButton: true,
  }).then(() => {
    $post("openOrCloseGoogleCode", {
      status: googleCodeStatus === 0 ? 1 : 0,
    }).then(async (res) => {
      if (res.code === 0) {
        user.GET_USER_PROFILE();
        // if (googleCodeStatus === -1) {
        //   getCode();
        //   await user.GET_USER_PROFILE();
        //   openDialog(playerInfoList.value[3]);
        // } else user.GET_USER_PROFILE();
      }
    });
  });
};
onMounted(async () => {
  const { id } = info.value;
  if (!id) await user.GET_USER_PROFILE();
  const { googleCodeStatus } = info.value;
  // if (googleCodeStatus === -1) getCode();
});
</script>

<style lang="scss" scoped>
.profile-main {
  margin-bottom: 100px;
  .mine-user {
    flex-wrap: wrap;
    //margin-top: 40px;
    padding: 20px 20px 0;
    background: #112228;
    border-radius: 20px;
    .change-item {
      width: 49%;
      margin-bottom: 20px;
      padding: 20px;
      box-sizing: border-box;
      background: #18292f;
      border-radius: 12px;
      .show-icon {
        font-size: 30px;
        color: $main-color;
        margin-right: 12px;
      }
      .show-label {
        font-size: 16px;
        font-weight: 400;
        color: #fff;
        //margin-left: 20px;
      }
      .show-value {
        font-size: 16px;
        color: $main-color;
        margin-top: 8px;
      }
      .show-revise {
        padding: 0 34px;
        color: $main-color;
        height: 36px;
        font-size: 16px;
        font-weight: 400;
        box-sizing: border-box;
        cursor: pointer;
        border: 1px solid #34b8d5;
        border-radius: 19px;
      }
    }
  }
}
</style>
