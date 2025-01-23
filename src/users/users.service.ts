import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async register(createUserDto: CreateUserDto) {
    const user = await this.userModel.findOne({ email: createUserDto.email });
    if (user) {
      throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 15);
    return this.create({ ...createUserDto, password: hashedPassword });
  }
  async login({ email, password }) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('Email or password incorrect');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Email or password incorrect');
    }
    return user;
  }

  getUser(id: string) {
    const user = this.userModel
      .findById(id, {
        password: 0,
        __v: 0,
      })
      .lean()
      .exec();
    return user;
  }

  async addSale(id: string, saleId: string) {
    const user = await this.userModel
      .findByIdAndUpdate(id, { $push: { colorsSale: saleId } }, { new: true })
      .exec();

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async addColor(id: string, colorId: string) {
    const user = await this.userModel
      .findByIdAndUpdate(id, { $push: { colors: colorId } }, { new: true })
      .exec();

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async removeColor(id: string, colorId: string) {
    const user = await this.userModel
      .findByIdAndUpdate(id, { $pull: { colors: colorId } }, { new: true })
      .exec();

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  removeSale(id: string, saleId: string) {
    return this.userModel
      .findByIdAndUpdate(id, { $pull: { colorsSale: saleId } }, { new: true })
      .exec();
  }

  addTransaction(id: string, transactionId: string) {
    return this.userModel
      .findByIdAndUpdate(
        id,
        { $push: { transactions: transactionId } },
        { new: true },
      )
      .exec();
  }

  create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }
  deposit(id: string, amount: number) {
    return this.userModel
      .findByIdAndUpdate(id, { $inc: { balance: amount } }, { new: true })
      .exec();
  }
  withdraw(id: string, amount: number) {
    return this.userModel
      .findByIdAndUpdate(id, { $inc: { balance: amount * -1 } }, { new: true })
      .exec();
  }
}
