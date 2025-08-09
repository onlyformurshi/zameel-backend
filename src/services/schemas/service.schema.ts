import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ServiceDocument = Service & Document;

@Schema({ timestamps: true })
export class Service {
  @ApiProperty({
    description: 'Icon identifier for the service',
    example: 'fa-graduation-cap',
  })
  @Prop({ required: true })
  icon: string;

  @ApiProperty({
    description: 'Title of the service in English',
    example: 'Professional Training',
  })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    description: 'Title of the service in Arabic',
    example: 'التدريب المهني',
  })
  @Prop({ required: true })
  arabicTitle: string;

  @ApiProperty({
    description: 'Detailed description of the service',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    description: 'List of features/benefits included in the service',
    type: [String],
  })
  @Prop({ type: [String], required: true })
  features: string[];

  @ApiProperty({
    description: 'Duration of the service (e.g., "3 months")',
    example: '3 months',
  })
  @Prop({ required: true })
  duration: string;

  @ApiProperty({
    description: 'Schedule of the service (e.g., "Mon-Fri, 9 AM - 1 PM")',
    example: 'Mon-Fri, 9 AM - 1 PM',
  })
  @Prop({ required: true })
  schedule: string;

  @ApiProperty({
    description: 'Price of the service',
    example: '1500 AED',
  })
  @Prop({ required: true })
  price: string;

  @ApiProperty({
    description: 'Level of the service',
    enum: ['Foundation', 'Advanced', 'Professional', 'Specialized'],
  })
  @Prop({ required: true, enum: ['Foundation', 'Advanced', 'Professional', 'Specialized'] })
  level: string;

  @ApiProperty({
    description: 'Display order of the service',
    default: 0,
  })
  @Prop({ default: 0 })
  order: number;

  @ApiProperty({
    description: 'Whether the service is currently active',
    default: true,
  })
  @Prop({ default: true })
  isActive: boolean;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
