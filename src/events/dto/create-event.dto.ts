import { IsString, IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ description: 'Title of the event' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Arabic title of the event' })
  @IsString()
  @IsNotEmpty()
  arabicTitle: string;

  @ApiProperty({ description: 'Date of the event (YYYY-MM-DD)' })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ description: 'Time of the event (e.g., "9:00 AM - 1:00 PM")' })
  @IsString()
  @IsNotEmpty()
  time: string;

  @ApiProperty({ description: 'Location where the event will be held' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ description: 'Arabic location of the event' })
  @IsString()
  @IsNotEmpty()
  arabicLocation: string;

  @ApiProperty({ description: 'Detailed description of the event' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Arabic description of the event' })
  @IsString()
  @IsNotEmpty()
  arabicDescription: string;

  @ApiProperty({ description: 'Main event image' })
  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @ApiProperty({ description: 'Additional event images', type: [String] })
  @IsArray()
  @IsString({ each: true })
  eventImages: string[];
}
