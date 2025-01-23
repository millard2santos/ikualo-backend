import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  getUser(id: string) {
    const user = this.userModel
      .findById(id, {
        password: 0,
        __v: 0,
      })
      .exec();
    return user;
  }
  getFriend(id: string) {
    const user = this.userModel
      .findById(id, { name: 1, avatar: 1, email: 1 })
      .exec();
    return user;
  }
  async getUserFriends(id: string) {
    const user = await this.userModel.findById(id, { friends: 1 }).exec();
    return await Promise.all(user.friends.map((id) => this.getFriend(id)));
  }
  addFriend(id: string, friendId: string) {
    return this.userModel.findByIdAndUpdate(
      id,
      { $push: { friends: friendId } },
      { new: true },
    );
  }
  deleteFriend(id: string, friendId: string) {
    return this.userModel.findByIdAndUpdate(id, {
      $pull: { friends: friendId },
    });
  }

  create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }
  deposit(id: string, amount: number) {
    return this.userModel.findByIdAndUpdate(
      id,
      { $inc: { balance: amount } },
      { new: true },
    );
  }
  withdraw(id: string, amount: number) {
    return this.userModel.findByIdAndUpdate(
      id,
      { $inc: { balance: amount * -1 } },
      { new: true },
    );
  }
  delete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
