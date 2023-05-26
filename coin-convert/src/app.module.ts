import { Module } from '@nestjs/common';

import { CurrencyConverterModule } from './modules/currency-converter/currency-converter.module';

@Module({
  imports: [CurrencyConverterModule],
})
export class AppModule {}
