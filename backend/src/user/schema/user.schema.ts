import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  givenName: string;

  @Prop()
  familyName: string;

  @Prop()
  nickname: string;

  @Prop()
  name: string;

  @Prop()
  picture: string;

  @Prop()
  locale: string;

  @Prop()
  updatedAt: Date;

  @Prop()
  email: string;

  @Prop()
  emailVerified: boolean;

  @Prop()
  sub: string;

  @Prop()
  sid: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
