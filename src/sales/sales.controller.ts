import { Body, Controller, Get, Post } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/createSale.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}
  @Get()
  getAll() {
    return this.salesService.getSales();
  }

  @Post()
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.createSale(createSaleDto);
  }
}
