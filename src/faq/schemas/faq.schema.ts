import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { FAQCategory } from './faq-category.schema';

export type FAQDocument = FAQ & Document;

@Schema({ timestamps: true })
export class FAQ {
  @ApiProperty({
    description: 'The frequently asked question',
    example: 'What are the admission requirements?',
  })
  @Prop({ required: true })
  question: string;

  @ApiProperty({
    description: 'The frequently asked question in Arabic',
    example: 'ما هي الشروط للقبول؟',
  })
  @Prop({ required: true })
  arabicQuestion: string;

  @ApiProperty({
    description: 'The answer to the question',
    example: 'Our admission requirements include...',
  })
  @Prop({ required: true })
  answer: string;

  @ApiProperty({
    description: 'The answer to the question in Arabic',
    example: 'الشروط للقبول هي...',
  })
  @Prop({ required: true })
  arabicAnswer: string;

  @ApiProperty({
    description: 'Category of the FAQ',
    type: () => FAQCategory,
  })
  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'FAQCategory',
  })
  category: FAQCategory;
}

export const FAQSchema = SchemaFactory.createForClass(FAQ);
