import { createPinia } from "pinia";
import { PiniaLogger } from "pinia-logger";

const pinia = createPinia();

// Defaults are:
// const defaultOptions = {
//   logErrors: true,
//   disabled: false,
//   expanded: true,
//   showStoreName: true,
//   showDuration: false
// }
const logger = PiniaLogger({
  expanded: false,
  disabled: import.meta.env.PROD,
});

pinia.use(logger);

export default pinia;
