import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './entities/transaction.entity';
import { Model } from 'mongoose';
import {
  CreateTransactionDto,
  TransactionType,
} from './dto/create-transaction.dto';
import { UsersService } from 'src/users/users.service';
import { SalesService } from 'src/sales/sales.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionService: Model<Transaction>,
    private readonly userService: UsersService,
    private readonly salesService: SalesService,
  ) {}

  findAll(id: string) {
    return this.transactionService.find({ userId: id }).exec();
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
      default:
        break;
    }
    return newTransaction.save();
  }

  async buyItem(buyTransaction: CreateTransactionDto) {
    const saleId = buyTransaction.saleId;
    delete buyTransaction.saleId;
    const transaction = await this.create({
      ...buyTransaction,
      type: TransactionType.SALE,
    });

    try {
      const itemOnSale = await this.salesService.getSale(saleId);
      // Buyer User
      await this.userService.addColor(
        buyTransaction.userId,
        itemOnSale.colorId,
      );
      await this.userService.addTransaction(
        buyTransaction.userId,
        transaction.id,
      );

      await this.userService.withdraw(
        buyTransaction.userId,
        buyTransaction.amount,
      );

      // Seller User
      await this.userService.removeColor(
        buyTransaction.sellerId,
        itemOnSale.colorId,
      );
      await this.userService.removeSale(buyTransaction.sellerId, saleId);
      await this.userService.addTransaction(
        buyTransaction.sellerId,
        transaction.id,
      );
      await this.userService.deposit(
        buyTransaction.sellerId,
        buyTransaction.amount,
      );

      await this.salesService.deleteSale(saleId);
    } catch (error) {
      console.log(error);
      throw new Error('Error buying item');
    }

    return transaction.save();
  }
}
