import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

class Sellers {
  sellerId: string;
  name: string;
  price: number;
}

@Schema()
export class Sale {
  @Prop({ required: true })
  name: string;
  @Prop({ type: [Sellers], required: true })
  sellers: Sellers[];

  // @Prop({ required: true })
  // price: number;

  // @Prop({ required: true })
  // color: string;

  // @Prop({ required: true })
  // userId: string;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
