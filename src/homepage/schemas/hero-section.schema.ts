import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type HeroSectionDocument = HeroSection & Document;

@Schema({ timestamps: true })
export class HeroSection {
  @ApiProperty({ description: 'Title in English' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ description: 'Title in Arabic' })
  @Prop({ required: true })
  arabicTitle: string;

  @ApiProperty({ description: 'Subtitle in English' })
  @Prop({ required: true })
  subtitle: string;

  @ApiProperty({ description: 'Subtitle in Arabic' })
  @Prop({ required: true })
  arabicSubtitle: string;
}

export const HeroSectionSchema = SchemaFactory.createForClass(HeroSection);
