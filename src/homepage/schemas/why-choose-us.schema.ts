import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type WhyChooseUsDocument = WhyChooseUs & Document;

@Schema({ timestamps: true })
export class WhyChooseUs {
  @ApiProperty({ description: 'Title in English' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ description: 'Title in Arabic' })
  @Prop({ required: true })
  arabicTitle: string;

  @ApiProperty({ description: 'Description in English' })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ description: 'Description in Arabic' })
  @Prop({ required: true })
  arabicDescription: string;
}

export const WhyChooseUsSchema = SchemaFactory.createForClass(WhyChooseUs);
