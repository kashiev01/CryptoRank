import { IPriceResponse } from '../../currency-converter/interfaces/price-res.interface';
import { CurrencySymbol } from '../enums/currency.enum';

export function calcCurrencyConvert(
  from: IPriceResponse,
  to: IPriceResponse,
  amount: number,
): string {
  try {
    if (amount <= 0) {
      return 'invalid';
    }
    const fromCurrencyUSD = from[CurrencySymbol.usd] * amount;
    const toCurrencyUSD = to[CurrencySymbol.usd] * amount;
    const result = (fromCurrencyUSD / toCurrencyUSD) * amount;
    return result.toFixed(10);
  } catch (error) {
    throw new Error(error.message);
  }
}
