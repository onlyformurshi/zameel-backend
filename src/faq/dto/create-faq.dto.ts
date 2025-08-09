import { IsString, IsNotEmpty, IsMongoId, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFaqDto {
  @ApiProperty({
    description: 'The frequently asked question',
    example: 'What are the admission requirements?',
  })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({
    description: 'The frequently asked question in Arabic',
    example: 'ما هي متطلبات القبول؟',
  })
  @IsString()
  @IsNotEmpty()
  arabicQuestion: string;

  @ApiProperty({
    description: 'The answer to the question',
    example: 'Our admission requirements include...',
  })
  @IsString()
  @IsNotEmpty()
  answer: string;

  @ApiProperty({
    description: 'The answer to the question in Arabic',
    example: 'الشروط للقبول هي...',
  })
  @IsString()
  @IsNotEmpty()
  arabicAnswer: string;

  @ApiProperty({
    description: 'Category ID of the FAQ',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'Display order of the FAQ',
    required: false,
    default: 0,
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  order?: number;
}
