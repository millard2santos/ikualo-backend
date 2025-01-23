import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class ColorsSale {
  color: string;
  price: number;
}

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop()
  avatar: string;
  @Prop({ default: 0 })
  balance: number;
  @Prop([String])
  colors: string[];
  @Prop({ type: [ColorsSale] })
  colorsSale: ColorsSale[];
  @Prop([String])
  transactions: string[];
  @Prop([String])
  friends: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
