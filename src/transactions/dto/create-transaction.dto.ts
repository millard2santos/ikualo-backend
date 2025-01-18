import { IsInt, IsMongoId, IsNotEmpty, Min } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @IsMongoId()
  targetId: string;

  @IsInt()
  @Min(1)
  amount: number;
}
