import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale } from './entities/sales.entity';

@Injectable()
export class SalesService {
  constructor(@InjectModel('Sale') private readonly saleModel: Model<Sale>) {}
  getSales() {
    return this.saleModel.find().exec();
  }

  createSale(sale: Sale) {
    const newSale = new this.saleModel(sale);
    return newSale.save();
  }
}
