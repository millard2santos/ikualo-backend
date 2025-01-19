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

  findOne(id: string) {
    const user = this.userModel.findById(id);
    return user;
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
