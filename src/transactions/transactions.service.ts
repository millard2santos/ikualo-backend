import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './entities/transaction.entity';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { User } from 'src/users/users.schema';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionService: Model<Transaction>,
    @InjectModel(User.name)
    private readonly userService: Model<User>,
  ) {}

  async create(createTransaction: CreateTransactionDto) {
    await this.userService.findByIdAndUpdate(createTransaction.userId, {
      $inc: { balance: -createTransaction.amount },
    });

    await this.userService.findByIdAndUpdate(createTransaction.targetId, {
      $inc: { balance: createTransaction.amount },
    });

    const newTransaction = new this.transactionService(createTransaction);
    return newTransaction.save();
  }
}
