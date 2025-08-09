import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSocialLinkDto {
  @ApiProperty({
    description: 'Name of the social media platform',
    example: 'Facebook',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  platform: string;

  @ApiProperty({
    description: 'URL of the social media profile or page',
    example: 'https://facebook.com/zameel',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    description: 'Icon identifier for the social media platform',
    example: 'facebook-icon',
    required: false,
  })
  @IsString()
  @IsOptional()
  icon?: string;
}
