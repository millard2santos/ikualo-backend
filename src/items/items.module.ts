import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemsSchema } from './entities/item.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Item.name, schema: ItemsSchema }]),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
