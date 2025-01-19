import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './entities/transaction.entity';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionService: Model<Transaction>,
    private readonly userService: UsersService,
  ) {}

  findAll(id: string) {
    return this.transactionService.find({ _id: id }).exec();
  }

  async create(createTransaction: CreateTransactionDto) {
    const newTransaction = new this.transactionService(createTransaction);

    switch (createTransaction.type) {
      case 'deposit':
        await this.userService.deposit(
          createTransaction.userId,
          createTransaction.amount,
        );
        break;
      case 'withdraw':
        await this.userService.withdraw(
          createTransaction.userId,
          createTransaction.amount,
        );
        break;
      case 'transfer':
        await this.userService.withdraw(
          createTransaction.userId,
          createTransaction.amount,
        );
        await this.userService.deposit(
          createTransaction.targetId,
          createTransaction.amount,
        );
        break;
      default:
        break;
    }
    return newTransaction.save();
  }
}
