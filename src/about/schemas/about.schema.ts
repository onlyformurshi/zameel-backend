import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type AboutDocument = About & Document;

@Schema()
class Stats {
  @ApiProperty({
    description: 'Number of students enrolled',
    example: 1000,
  })
  @Prop({ required: true })
  studentsEnrolled: number;

  @ApiProperty({
    description: 'Success rate percentage',
    example: 95,
  })
  @Prop({ required: true })
  successRate: number;

  @ApiProperty({
    description: 'Number of expert educators',
    example: 50,
  })
  @Prop({ required: true })
  expertEducators: number;

  @ApiProperty({
    description: 'Years of excellence',
    example: 10,
  })
  @Prop({ required: true })
  yearsOfExcellence: number;
}

@Schema({ timestamps: true })
export class About {
  @ApiProperty({
    description: 'Title of the about section',
    example: 'About Zameel Academy',
  })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    description: 'Title of the about section',
    example: 'About Zameel Academy',
  })
  @Prop({ required: true })
  titleArabic: string;

  @ApiProperty({
    description: 'Detailed description about the institution',
    example: 'Zameel Academy is a leading educational institution...',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    description: 'Detailed description about the institution',
    example: 'Zameel Academy is a leading educational institution...',
  })
  @Prop({ required: true })
  descriptionArabic: string;

  @ApiProperty({
    description: 'Key statistics of the institution',
    type: Stats,
  })
  @Prop({ type: Stats, required: true })
  stats: Stats;

  @ApiProperty({
    description: 'Mission statement of the institution',
    example: 'Our mission is to provide quality education...',
  })
  @Prop({ required: true })
  mission: string;

  @ApiProperty({
    description: 'Mission statement of the institution',
    example: 'Our mission is to provide quality education...',
  })
  @Prop({ required: true })
  missionArabic: string;

  @ApiProperty({
    description: 'Vision statement of the institution',
    example: 'To become the leading educational institution...',
  })
  @Prop({ required: true })
  vision: string;

  @ApiProperty({
    description: 'Vision statement of the institution',
    example: 'To become the leading educational institution...',
  })
  @Prop({ required: true })
  visionArabic: string;

  @ApiProperty({
    description: 'Whether the about entry is currently active',
    default: true,
  })
  @Prop({ default: true })
  isActive: boolean;
}

export const AboutSchema = SchemaFactory.createForClass(About);
