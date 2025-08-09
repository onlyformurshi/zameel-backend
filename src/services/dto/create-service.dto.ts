import {
  IsString,
  IsArray,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({
    description: 'Icon identifier for the service',
    example: 'fa-graduation-cap',
  })
  @IsString()
  @IsNotEmpty()
  icon: string;

  @ApiProperty({
    description: 'Title of the service in English',
    example: 'Professional Training',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Title of the service in Arabic',
    example: 'التدريب المهني',
  })
  @IsString()
  @IsNotEmpty()
  arabicTitle: string;

  @ApiProperty({
    description: 'Detailed description of the service',
    example: 'Our professional training program offers comprehensive skills development...',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'List of features/benefits included in the service',
    type: [String],
    example: ['Expert instructors', 'Hands-on training', 'Industry certification'],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  features: string[];

  @ApiProperty({
    description: 'Duration of the service',
    example: '3 months',
  })
  @IsString()
  @IsNotEmpty()
  duration: string;

  @ApiProperty({
    description: 'Schedule of the service',
    example: 'Mon-Fri, 9 AM - 1 PM',
  })
  @IsString()
  @IsNotEmpty()
  schedule: string;

  @ApiProperty({
    description: 'Price of the service',
    example: '1500 AED',
  })
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({
    description: 'Level of the service',
    enum: ['Foundation', 'Advanced', 'Professional', 'Specialized'],
    example: 'Professional',
  })
  @IsEnum(['Foundation', 'Advanced', 'Professional', 'Specialized'])
  @IsNotEmpty()
  level: string;

  @ApiProperty({
    description: 'Display order of the service',
    required: false,
    default: 0,
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  order?: number;
}
