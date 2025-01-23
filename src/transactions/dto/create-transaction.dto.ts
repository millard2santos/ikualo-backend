import {
  IsEnum,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  Min,
} from 'class-validator';

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  PURCHASE = 'purchase',
  SALE = 'sale',
}

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsOptional()
  @IsMongoId()
  saleId: string;

  @IsOptional()
  @IsMongoId()
  sellerId: string;

  @IsInt()
  @Min(1)
  amount: number;

  @IsEnum(TransactionType)
  type: TransactionType;
}
