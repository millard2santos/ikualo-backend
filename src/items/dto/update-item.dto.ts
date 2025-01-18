import { IsInt } from '@nestjs/class-validator';
import { Min } from 'class-validator';

export class UpdateItemDto {
  @IsInt()
  @Min(1)
  price: number;
}
