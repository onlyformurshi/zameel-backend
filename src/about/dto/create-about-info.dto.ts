import { IsString, IsArray, IsNotEmpty, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class StatisticDto {
  @ApiProperty({
    description: 'Label of the statistic',
    example: 'Students Trained',
  })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({
    description: 'Value of the statistic',
    example: '5000+',
  })
  @IsString()
  @IsNotEmpty()
  value: string;
}

export class CreateAboutInfoDto {
  @ApiProperty({
    description: 'Mission statement of the institution',
    example:
      'Our mission is to provide quality education and empower students with knowledge and skills for success.',
  })
  @IsString()
  @IsNotEmpty()
  mission: string;

  @ApiProperty({
    description: 'Mission statement of the institution in Arabic',
    example:
      'Our mission is to provide quality education and empower students with knowledge and skills for success.',
  })
  @IsString()
  @IsNotEmpty()
  missionArabic: string;

  @ApiProperty({
    description: 'Vision statement of the institution',
    example:
      'To become the leading educational institution in the region, recognized for excellence in teaching and student success.',
  })
  @IsString()
  @IsNotEmpty()
  vision: string;

  @ApiProperty({
    description: 'Vision statement of the institution in Arabic',
    example:
      'To become the leading educational institution in the region, recognized for excellence in teaching and student success.',
  })
  @IsString()
  @IsNotEmpty()
  visionArabic: string;

  @ApiProperty({
    description: 'Key statistics and achievements',
    type: [StatisticDto],
    example: [
      { label: 'Students Trained', value: '5000+' },
      { label: 'Expert Instructors', value: '50+' },
      { label: 'Success Rate', value: '95%' },
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => StatisticDto)
  statistics: StatisticDto[];
}
