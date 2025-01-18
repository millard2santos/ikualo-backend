import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { TransactionType, UpdateUserDto } from './dto/update-user.dto';

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
  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      id,
      {
        $inc: {
          balance:
            updateUserDto.transactionType === TransactionType.INCREASE
              ? updateUserDto.amount
              : updateUserDto.amount * -1,
        },
      },
      {
        new: true,
      },
    );
  }
  delete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
