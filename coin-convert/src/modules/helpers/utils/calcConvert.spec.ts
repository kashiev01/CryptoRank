import { IPriceResponse } from '../../currency-converter/interfaces/price-res.interface';
import { calcCurrencyConvert } from './calcConvert';

describe('calcCurrencyConvert', () => {
  const from: IPriceResponse = { USD: 1784.142609635509, BTC: 0, ETH: 0 };
  const to: IPriceResponse = { USD: 26256.095533922133, BTC: 0, ETH: 0 };
  const amount = 1;

  it('should calculate the currency conversion correctly', () => {
    const result = calcCurrencyConvert(from, to, amount);
    expect(result).toEqual('0.0679515584');
  });

  it('should handle if price not available', () => {
    const result = calcCurrencyConvert(from, to, 0);
    expect(result).toEqual('invalid');
  });

  it('should handle negative amount', () => {
    const result = calcCurrencyConvert(from, to, -5);
    expect(result).toEqual('invalid');
  });
});
