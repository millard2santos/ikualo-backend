import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Item extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  userId: string;
}

export const ItemsSchema = SchemaFactory.createForClass(Item);
