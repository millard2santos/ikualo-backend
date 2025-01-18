import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get(':id')
  // @MessagePattern('findOneUser')
  findOne(@Param() params: any) {
    return this.usersService.findOne(params.id);
  }

  @Post()
  // @MessagePattern('createUser')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  // @MessagePattern('updateUser')
  update(@Param() params: any, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(params.id, updateUserDto);
  }
  @Delete(':id')
  // @MessagePattern('deleteUser')
  delete(@Param() params: any) {
    return this.usersService.delete(params.id);
  }
}
