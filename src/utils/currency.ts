export enum Currency {
  EUR = 'EUR',
  USD = 'USD',
}
export const CurrencySymbol: Record<string, string> = {
  [Currency.EUR]: '€',
  [Currency.USD]: '$',
};
export const eurUsdValue = 1.12;
