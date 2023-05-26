import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { CurrencyConverterService } from './currency-converter.service';
import { CurrencyConvertQueryDto } from './dto';

@ApiTags('Currency')
@Controller('currency')
export class CurrencyConverterController {
  constructor(private readonly currencyService: CurrencyConverterService) {}

  @Get('convert')
  @ApiOperation({ summary: 'Конвертировать валюты' })
  @ApiQuery({
    name: 'from',
    description: 'Укажите валюту которую нужно конвертировать',
  })
  @ApiQuery({
    name: 'to',
    description: 'Укажите валюту в которую нужно конвертировать',
  })
  @ApiQuery({
    name: 'amount',
    description: 'Конвертируемое количество',
  })
  //   @ApiResponse({ status: 200, description: 'Currency conversion successful' })
  //   @ApiResponse({ status: 400, description: 'Invalid parameters' })
  //   @ApiResponse({ status: 500, description: 'Currency conversion failed' })
  async convertCurrency(@Query() queryDto: CurrencyConvertQueryDto) {
    return await this.currencyService.convertCurrencyPair(queryDto);
  }
}
