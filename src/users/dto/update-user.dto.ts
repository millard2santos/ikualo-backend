import { IsInt, Min } from '@nestjs/class-validator';
import { IsEnum } from 'class-validator';

export enum TransactionType {
  INCREASE = 'increase',
  DECREASE = 'decrease',
}

export class UpdateUserDto {
  @IsInt()
  @Min(0)
  amount: number;
  @IsEnum(TransactionType)
  transactionType: TransactionType;
}
