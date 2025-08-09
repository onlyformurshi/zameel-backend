import { IsString, IsArray, IsNotEmpty, ArrayMinSize } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Title of the course in English',
    example: 'Introduction to Web Development',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Title of the course in Arabic',
    example: 'مقدمة في تطوير الويب',
  })
  @IsString()
  @IsNotEmpty()
  arabicTitle: string;

  @ApiProperty({
    description: 'Duration of the course',
    example: '3 months',
  })
  @IsString()
  @IsNotEmpty()
  duration: string;

  @ApiProperty({
    description: 'Duration of the course in Arabic',
    example: '3 أشهر',
  })
  @IsString()
  @IsNotEmpty()
  arabicDuration: string;

  @ApiProperty({
    description: 'Course schedule',
    example: 'Mon, Wed 6-8 PM',
  })
  @IsString()
  @IsNotEmpty()
  schedule: string;

  @ApiProperty({
    description: 'Course schedule in Arabic',
    example: 'الإثنين، الأربعاء 6-8 مساءً',
  })
  @IsString()
  @IsNotEmpty()
  arabicSchedule: string;

  @ApiProperty({
    description: 'Difficulty level of the course',
    example: 'Beginner',
  })
  @IsNotEmpty()
  level: string;

  @ApiProperty({
    description: 'Difficulty level of the course in Arabic',
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    example: 'Beginner',
  })
  @IsNotEmpty()
  arabicLevel: string;

  @ApiProperty({
    description: 'Detailed description of the course',
    example: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Detailed description of the course in Arabic',
    example: 'تعلم الأساسيات في تطوير الويب بما في ذلك HTML, CSS, و JavaScript.',
  })
  @IsString()
  @IsNotEmpty()
  arabicDescription: string;

  @ApiProperty({
    description: 'List of features/benefits included in the course',
    type: [String],
    example: ['Feature 1', 'Feature 2', 'Feature 3'],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  features: string[];

  @ApiProperty({
    description: 'List of features/benefits included in the course in Arabic',
    type: [String],
    example: ['Feature 1', 'Feature 2', 'Feature 3'],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  arabicFeatures: string[];

  @ApiProperty({
    description: 'Image of the course',
    example: 'https://example.com/course-image.jpg',
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    description: 'Category of the course',
    example: 'Web Development',
  })
  @IsString()
  @IsNotEmpty()
  category: string;
}
