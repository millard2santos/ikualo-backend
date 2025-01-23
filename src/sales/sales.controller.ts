import { Body, Controller, Get, Post } from '@nestjs/common';
import { SalesService } from './sales.service';
import { Sale } from './entities/sales.entity';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}
  @Get()
  getAll() {
    return this.salesService.getSales();
  }

  @Post()
  create(@Body() createSale: Sale) {
    return this.salesService.createSale(createSale);
  }
}
