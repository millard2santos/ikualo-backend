import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale } from './entities/sales.entity';
import { CreateSaleDto } from './dto/createSale.dto';
import { UsersService } from 'src/users/users.service';
import { ItemsService } from 'src/items/items.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel('Sale') private readonly saleModel: Model<Sale>,
    private readonly usersService: UsersService,
    private readonly itemsService: ItemsService,
  ) {}
  async getSales() {
    const sales = await this.saleModel.find();
    const salesInObject = sales.reduce((acc: any, sale) => {
      if (!acc[sale.colorId]) {
        acc[sale.colorId] = {
          colorId: sale.colorId,
          colorName: sale.colorName,
          sales: [
            {
              saleId: sale.id,
              price: sale.price,
              sellerId: sale.sellerId,
              sellerName: sale.sellerName,
            },
          ],
        };
      } else {
        acc[sale.colorId].sales.push({
          saleId: sale._id,
          price: sale.price,
          sellerId: sale.sellerId,
          sellerName: sale.sellerName,
        });
      }

      return acc;
    }, {});
    return Object.values(salesInObject);
  }

  getSale(id: string) {
    return this.saleModel.findById(id).exec();
  }
  async createSale(createSale: CreateSaleDto) {
    const newSale = new this.saleModel(createSale);
    this.usersService.addSale(createSale.sellerId, newSale.id);
    return newSale.save();
  }

  deleteSale(id: string) {
    return this.saleModel.findByIdAndDelete(id);
  }

  // Patch method
}
