import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Transaction extends Document {
  @Prop({ required: true })
  userId: string;
  @Prop({ required: false })
  sellerId: string;
  @Prop({ required: true })
  amount: number;
  @Prop({ required: true })
  type: string;
}

export const TransactionsSchema = SchemaFactory.createForClass(Transaction);
