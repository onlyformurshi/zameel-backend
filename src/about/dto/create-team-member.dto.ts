import {
  IsString,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUrl,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamMemberDto {
  @ApiProperty({
    description: 'Name of the team member in English',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Name of the team member in Arabic',
    example: 'جون دو',
  })
  @IsString()
  @IsNotEmpty()
  arabicName: string;

  @ApiProperty({
    description: 'Role/position of the team member in English',
    example: 'Senior Instructor',
  })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({
    description: 'Role/position of the team member in Arabic',
    example: 'مدرس أول',
  })
  @IsString()
  @IsNotEmpty()
  arabicRole: string;

  @ApiProperty({
    description: 'Profile image URL of the team member',
    example: 'https://example.com/images/team/john-doe.jpg',
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @ApiProperty({
    description: 'Brief description of the team member',
    example: 'John has over 10 years of experience in teaching...',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'List of specialties/expertise areas',
    type: [String],
    example: ['English Language', 'Business Communication', 'IELTS Preparation'],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  specialties: string[];

  @ApiProperty({
    description: 'Notable achievements of the team member',
    example: 'Certified IELTS trainer with over 1000 successful students',
  })
  @IsString()
  @IsNotEmpty()
  achievements: string;

  @ApiProperty({
    description: 'Display order of the team member',
    required: false,
    default: 0,
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  order?: number;
}
