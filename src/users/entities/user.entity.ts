import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
  @Prop([String])
  transactions: string[];
  @Prop([String])
  friends: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
