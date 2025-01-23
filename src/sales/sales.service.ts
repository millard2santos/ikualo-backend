import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale } from './entities/sales.entity';
import { CreateSaleDto } from './dto/createSale.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel('Sale') private readonly saleModel: Model<Sale>,
    usersService: UsersService,
  ) {}
  getSales() {
    return this.saleModel.find().exec();
  }

  getSale(id: string) {
    return this.saleModel.findById(id).exec();
  }
  async createSale(createSellDto: CreateSaleDto) {
    const sale = await this.saleModel.find({ name: createSellDto.saleName });

    if (sale.length === 0) {
      const newSale = new this.saleModel({
        name: createSellDto.saleName,
        sellers: [
          {
            sellerId: createSellDto.sellerId,
            name: createSellDto.sellerName,
            price: createSellDto.price,
          },
        ],
      });
      return newSale.save();
    }
    sale[0].sellers.push({
      sellerId: createSellDto.sellerId,
      name: createSellDto.sellerName,
      price: createSellDto.price,
    });
    sale[0].save();

    return sale;
  }
}
