import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Transaction extends Document {
  @Prop({ required: true })
  userId: string;
  @Prop({ required: true })
  targetId: string;
  @Prop({ required: true })
  amount: number;
}

export const TransactionsSchema = SchemaFactory.createForClass(Transaction);
