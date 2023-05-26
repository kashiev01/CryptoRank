import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

import { calcCurrencyConvert } from '../helpers/utils/calcConvert';
import { CurrencyConvertQueryDto } from './dto/currency-query.dto';
import { IPriceResponse } from './interfaces/price-res.interface';
import { IResponse } from './interfaces/response.interface';

@Injectable()
export class CurrencyConverterService {
  async convertCurrencyPair(data: CurrencyConvertQueryDto): Promise<IResponse> {
    const { amount, from, to } = data;
    try {
      const fromPrice = await this.getCurrencyPrice(from);
      const toPrice = await this.getCurrencyPrice(to);
      const result = calcCurrencyConvert(fromPrice, toPrice, amount);
      const response = { amount: amount, from: from, to: to, result: result };
      return response;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getCurrencyPrice(currency: string): Promise<IPriceResponse> {
    try {
      const coinData = await axios.get(
        `https://tstapi.cryptorank.io/v0/coins/${currency}`,
      );
      const { data } = coinData.data;
      return data.price;
    } catch (error) {
      throw new BadRequestException(
        `Неправильное название валюты. Перепроверьте: '${currency}'`,
      );
    }
  }
}
