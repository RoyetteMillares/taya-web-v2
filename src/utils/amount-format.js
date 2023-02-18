const CURRENCY = import.meta.env.VITE_APP_CURRENCY;
const CURRENCY_POSITION = import.meta.env.VITE_APP_CURRENCY_POSITION;

export const toggleAmountFormat = (str, showCurrency = true) => {
  let currency = showCurrency ? CURRENCY : "";

  return CURRENCY_POSITION === "front"
    ? `${currency}${str}`
    : `${str}${currency}`;
};
/*货币格式分割逗号*/
export function formatCoin(num) {
  //取整，三行逗号隔开
  return parseFloat(num).toLocaleString();
}
