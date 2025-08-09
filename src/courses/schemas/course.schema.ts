import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { CourseCategory } from './course-category.schema';

export type CourseDocument = Course & Document;

@Schema({ timestamps: true })
export class Course {
  @ApiProperty({ description: 'Title of the course' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ description: 'Title of the course in Arabic' })
  @Prop({ required: true })
  arabicTitle: string;

  @ApiProperty({ description: 'Category of the course' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CourseCategory', required: true })
  category: CourseCategory;

  @ApiProperty({ description: 'Description of the course' })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ description: 'Description of the course in Arabic' })
  @Prop({ required: true })
  arabicDescription: string;

  @ApiProperty({
    description: 'Difficulty level of the course',
  })
  @Prop({ required: true })
  level: string;

  @ApiProperty({
    description: 'Difficulty level of the course in Arabic',
  })
  @Prop({ required: true })
  arabicLevel: string;

  @ApiProperty({ description: 'Duration of the course (e.g., "3 months")' })
  @Prop({ required: true })
  duration: string;

  @ApiProperty({ description: 'Duration of the course in Arabic (e.g., "3 months")' })
  @Prop({ required: true })
  arabicDuration: string;

  @ApiProperty({ description: 'Course schedule (e.g., "Mon, Wed 6-8 PM")' })
  @Prop({ required: true })
  schedule: string;

  @ApiProperty({ description: 'Course schedule in Arabic (e.g., "Mon, Wed 6-8 PM")' })
  @Prop({ required: true })
  arabicSchedule: string;

  @ApiProperty({ description: 'Course features/benefits', type: [String] })
  @Prop({ type: [String] })
  features: string[];

  @ApiProperty({ description: 'Course features/benefits in Arabic', type: [String] })
  @Prop({ type: [String] })
  arabicFeatures: string[];

  @ApiProperty({ description: 'Course images', type: [String] })
  @Prop({ type: String })
  image: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
