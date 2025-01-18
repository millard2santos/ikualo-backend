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
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  // @MessagePattern('createUser')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  // @MessagePattern('updateUser')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
  @Delete(':id')
  // @MessagePattern('deleteUser')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
