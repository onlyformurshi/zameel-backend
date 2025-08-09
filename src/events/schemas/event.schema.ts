import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  arabicTitle: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  arabicDescription: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  time: string;

  @Prop()
  registrationDeadline: Date;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  arabicLocation: string;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ type: [String], default: [] })
  eventImages: string[];
}

export const EventSchema = SchemaFactory.createForClass(Event);
