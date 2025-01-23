import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { TransactionsModule } from './transactions/transactions.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://millard2santos:Futbol12@ikualo.vlnxp.mongodb.net/ikualo?retryWrites=true&w=majority',
    ),
    RabbitmqModule,
    TransactionsModule,
    UsersModule,
    ItemsModule,
    SalesModule,
  ],
})
export class AppModule {}
