import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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
  @Get(':id/friends')
  getFriends(@Param('id') id: string) {
    return this.usersService.getUserFriends(id);
  }
  @Post()
  // @MessagePattern('createUser')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Patch(':id/friends')
  updateFriends(
    @Param('id') id: string,
    @Body() { action, friendId }: { action: string; friendId: string },
  ) {
    if (action === 'add') return this.usersService.addFriend(id, friendId);
    if (action === 'delete')
      return this.usersService.deleteFriend(id, friendId);
  }
}
