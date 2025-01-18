import { IsString, IsInt, Min, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateItemDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(1)
  price: number;

  @IsString()
  color: string;

  @IsNotEmpty()
  @IsMongoId()
  userId: string;
}
