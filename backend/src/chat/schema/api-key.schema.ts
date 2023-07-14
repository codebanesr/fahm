import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ApiKey extends Document {
  @Prop({ required: true, unique: true })
  apiKey: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  key: string;

  @Prop({ required: true, default: 0 })
  usageCount: number;

  @Prop({ required: true, default: 100 })
  requestLimit: number;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  enabled: boolean;
}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);
