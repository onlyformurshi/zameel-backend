import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGalleryDto {
  @ApiProperty({
    description: 'Title of the gallery item',
    example: 'Graduation Ceremony 2023',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Arabic title of the gallery item',
    example: 'المرحلة التخرجية 2023',
  })
  @IsString()
  @IsNotEmpty()
  arabicTitle: string;

  @ApiProperty({
    description: 'Category ID of the gallery item',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'Arabic category ID of the gallery item',
    example: '507f1f77bcf86cd799439011',
  })
  @IsMongoId()
  @IsNotEmpty()
  arabicCategory: string;
}
