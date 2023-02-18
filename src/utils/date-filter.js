import { dayjs } from "element-plus";
import {useI18n} from "vue-i18n";

const VITE_APP_FULL_TIME = import.meta.env.VITE_APP_FULL_TIME;
const VITE_APP_TIME = import.meta.env.VITE_APP_TIME;
export const time = (timestamp) => {
  return dayjs(timestamp * 1000).format(VITE_APP_FULL_TIME);
};

export const dateTime = (timestamp) => {
  return dayjs(timestamp * 1000).format(VITE_APP_TIME);
};
// 时间转换
export const timeForMat = (timestamp) => {
  var timeFlag = "";
  const days = dayjs().diff(dayjs( timestamp * 1000 ), 'day');
  const hours = dayjs().diff(dayjs( timestamp * 1000 ), 'hour');
  const minutes = dayjs().diff(dayjs( timestamp * 1000 ), 'minutes');
  const seconds = dayjs().diff(dayjs( timestamp * 1000 ), 'seconds');
  if (hours > 24) {
    timeFlag =  dayjs(timestamp * 1000).format(VITE_APP_FULL_TIME);
  } else if (hours > 1 && hours <= 24) {
    timeFlag = useI18n().t("public.lastFewHours",{hour:hours});
  } else if (minutes <= 60&&seconds>=60) {
    timeFlag = useI18n().t("public.lastFewMinutes",{min:minutes});
  } else if (seconds < 60) {
    timeFlag = useI18n().t("public.lastFewSeconds",{S:seconds});
  }
  return timeFlag;
};
