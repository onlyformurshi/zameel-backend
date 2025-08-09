import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFaqCategoryDto {
  @ApiProperty({
    description: 'Category name',
    example: 'Admissions',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Category name in Arabic',
    example: 'القبول',
  })
  @IsString()
  @IsNotEmpty()
  arabicName: string;
}
