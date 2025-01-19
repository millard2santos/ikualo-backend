import { IsInt, Min } from '@nestjs/class-validator';

export class UpdateUserDto {
  @IsInt()
  @Min(0)
  amount: number;
}
