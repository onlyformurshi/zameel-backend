import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CourseCategoryDocument = CourseCategory & Document;

@Schema({ timestamps: true })
export class CourseCategory {
  @ApiProperty({ description: 'Name of the course category' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Name of the course category in Arabic' })
  @Prop({ required: true })
  arabicName: string;
}

export const CourseCategorySchema = SchemaFactory.createForClass(CourseCategory);
