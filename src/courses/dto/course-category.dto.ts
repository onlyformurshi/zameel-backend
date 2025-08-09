import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CourseCategoryDto {
  @ApiProperty({
    description: 'Name of the course category in English',
    example: 'Web Development',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Name of the course category in Arabic',
    example: 'تطوير الويب',
  })
  @IsString()
  @IsNotEmpty()
  arabicName: string;
}
