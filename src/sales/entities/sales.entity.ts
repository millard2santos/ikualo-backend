import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Sale {
  @Prop({ required: true })
  name: string;

  // @Prop({ required: true })
  // price: number;

  // @Prop({ required: true })
  // color: string;

  // @Prop({ required: true })
  // userId: string;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
