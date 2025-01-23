import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get(':id')
  // @MessagePattern('findOneUser')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Post('/login')
  login(@Body() { email, password }) {
    return this.usersService.login({ email, password });
  }
  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }
  @Post()
  // @MessagePattern('createUser')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
