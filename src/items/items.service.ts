import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './entities/item.entity';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private readonly itemsService: Model<Item>,
    private readonly userService: UsersService,
  ) {}
  create(createItemDto: CreateItemDto) {
    const newItem = new this.itemsService({ name: createItemDto.name });
    try {
      this.userService.addColor(createItemDto.userId, newItem.id);
    } catch (error) {
      console.log(error);
    }
    return newItem.save();
  }

  async getItem(id: string) {
    const color = await this.itemsService.findById(id).lean();
    return color;
  }

  // update(id: string, updateItemDto: UpdateItemDto) {
  //   return this.itemsService.findByIdAndUpdate(id, updateItemDto, {
  //     new: true,
  //   });
  // }
}
