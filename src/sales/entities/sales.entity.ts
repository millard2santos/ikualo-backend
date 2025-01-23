import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Sale {
  @Prop({ required: true })
  colorId: string;
  @Prop({ required: true })
  colorName: string;
  @Prop({ required: true })
  sellerName: string;

  @Prop({ required: true })
  sellerId: string;

  @Prop({ required: true })
  price: number;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
