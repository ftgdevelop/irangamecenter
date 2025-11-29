export enum CurrencyEnum {
  IRR = "IRR",
  USD = "USD",
  EUR = "EUR",
  TRY = "TRY",
  AED = "AED",
  GBP = "GBP",
}

// const currencyToFarsiMap: Record<CurrencyEnum, string> = {
//   [CurrencyEnum.IRR]: "ریال",
//   [CurrencyEnum.USD]: "دلار آمریکا",
//   [CurrencyEnum.EUR]: "یورو",
//   [CurrencyEnum.TRY]: "لیر ترکیه",
//   [CurrencyEnum.AED]: "درهم امارات",
//   [CurrencyEnum.GBP]: "پوند انگلیس",
// };

export const getCurrencyLabelFa = (currency?: string): string => {
  console.log(currency?.toString())
  return "ریال"
  // if (!currency) return "";
  // const upper = currency.toUpperCase() as CurrencyEnum;
  // return currencyToFarsiMap[upper] || upper;
};