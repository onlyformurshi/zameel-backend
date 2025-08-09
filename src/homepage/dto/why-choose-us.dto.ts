import { IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateWhyChooseUsDto {
  @ApiProperty({
    example: 'Expert Instructors',
    description: 'Title of the why choose us item in English',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'مدربون خبراء',
    description: 'Title of the why choose us item in Arabic',
  })
  @IsString()
  arabicTitle: string;

  @ApiProperty({
    example: 'Learn from industry experts with years of experience',
    description: 'Description of the why choose us item in English',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'تعلم من خبراء الصناعة ذوي الخبرة الطويلة',
    description: 'Description of the why choose us item in Arabic',
  })
  @IsString()
  arabicDescription: string;
}

export class UpdateWhyChooseUsDto extends PartialType(CreateWhyChooseUsDto) {}
