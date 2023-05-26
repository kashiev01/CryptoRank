import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

import { QueryDefaultValues } from '../../helpers/enums/query.enum';
import { toLowerCase, toNumber } from '../../helpers/pipes/query.pipe';

export class CurrencyConvertQueryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => toLowerCase(value))
  from: string;

  @ApiProperty({
    default: 'tether',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => toLowerCase(value))
  to: string = QueryDefaultValues.TETHER;

  @ApiProperty({ default: 1 })
  @Transform(({ value }) => toNumber(value))
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount: number = QueryDefaultValues.amount;
}
