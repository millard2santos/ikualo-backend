import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './entities/item.entity';
import { Model } from 'mongoose';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private readonly itemsService: Model<Item>,
  ) {}
  create(createItemDto: CreateItemDto) {
    const newItem = new this.itemsService(createItemDto);
    return newItem.save();
  }

  findAll() {
    const items = this.itemsService.find();
    return items;
  }

  findOne(id: string) {
    return `This action returns a #${id} item`;
  }

  update(id: string, updateItemDto: UpdateItemDto) {
    console.log(id);

    console.log(updateItemDto);

    return this.itemsService.findByIdAndUpdate(id, updateItemDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.itemsService.findByIdAndDelete(id);
  }
}
