import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGalleryCategoryDto {
  @ApiProperty({ description: 'Category name in English' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Category name in Arabic' })
  @IsNotEmpty()
  @IsString()
  arabicName: string;
}
