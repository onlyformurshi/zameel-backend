import { IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateHeroSectionDto {
  @ApiProperty({
    example: 'Welcome to Zameel Institute',
    description: 'Title of the hero section in English',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'مرحباً بكم في معهد زميل',
    description: 'Title of the hero section in Arabic',
  })
  @IsString()
  arabicTitle: string;

  @ApiProperty({
    example: 'Your Gateway to Excellence in Education and Professional Development',
    description: 'Subtitle of the hero section in English',
  })
  @IsString()
  subtitle: string;

  @ApiProperty({
    example: 'بوابتك نحو التميز في التعليم والتطوير المهني',
    description: 'Subtitle of the hero section in Arabic',
  })
  @IsString()
  arabicSubtitle: string;
}

export class UpdateHeroSectionDto extends PartialType(CreateHeroSectionDto) {}
