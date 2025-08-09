import {
  IsString,
  IsEmail,
  IsOptional,
  IsArray,
  ValidateNested,
  IsPhoneNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class SocialLinksDto {
  @ApiProperty({
    required: false,
    description: 'LinkedIn profile URL',
    example: 'https://linkedin.com/in/username',
  })
  @IsOptional()
  @IsString()
  linkedin?: string;

  @ApiProperty({
    required: false,
    description: 'Twitter profile URL',
    example: 'https://twitter.com/username',
  })
  @IsOptional()
  @IsString()
  twitter?: string;

  @ApiProperty({
    required: false,
    description: 'ResearchGate profile URL',
    example: 'https://researchgate.net/profile/username',
  })
  @IsOptional()
  @IsString()
  researchGate?: string;

  @ApiProperty({
    required: false,
    description: 'Google Scholar profile URL',
    example: 'https://scholar.google.com/citations?user=userid',
  })
  @IsOptional()
  @IsString()
  googleScholar?: string;

  @ApiProperty({
    required: false,
    description: 'Personal or academic website URL',
    example: 'https://example.com',
  })
  @IsOptional()
  @IsString()
  website?: string;
}

export class CreateFacultyDto {
  @ApiProperty({
    description: 'Full name of the faculty member in English',
    example: 'Dr. John Smith',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Full name of the faculty member in Arabic',
    example: 'د. جون سميث',
  })
  @IsString()
  arabicName: string;

  @ApiProperty({
    description: 'Position/title of the faculty member in English',
    example: 'Associate Professor of Computer Science',
  })
  @IsString()
  position: string;

  @ApiProperty({
    description: 'Position/title of the faculty member in Arabic',
    example: 'أستاذ مشارك في علوم الحاسب',
  })
  @IsString()
  arabicPosition: string;

  @ApiProperty({
    required: false,
    description: 'Department name in English',
    example: 'Computer Science Department',
  })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiProperty({
    required: false,
    description: 'Department name in Arabic',
    example: 'قسم علوم الحاسب',
  })
  @IsOptional()
  @IsString()
  arabicDepartment?: string;

  @ApiProperty({
    required: false,
    description: 'Profile image URL',
    example: 'https://example.com/faculty/profile.jpg',
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({
    description: 'Professional email address',
    example: 'john.smith@university.edu',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: false,
    description: 'Contact phone number with country code',
    example: '+1234567890',
  })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({
    description: 'Professional biography in English',
    example:
      'Dr. Smith is an experienced researcher in artificial intelligence with over 15 years of academic experience.',
  })
  @IsString()
  bio: string;

  @ApiProperty({
    description: 'Professional biography in Arabic',
    example: 'د. سميث باحث متمرس في الذكاء الاصطناعي مع خبرة أكاديمية تزيد عن 15 عاماً.',
  })
  @IsString()
  arabicBio: string;

  @ApiProperty({
    description: 'Areas of specialization in English',
    type: [String],
    example: ['Artificial Intelligence', 'Machine Learning', 'Data Science'],
  })
  @IsArray()
  @IsString({ each: true })
  specialization: string[];

  @ApiProperty({
    description: 'Areas of specialization in Arabic',
    type: [String],
    example: ['الذكاء الاصطناعي', 'تعلم الآلة', 'علم البيانات'],
  })
  @IsArray()
  @IsString({ each: true })
  arabicSpecialization: string[];

  @ApiProperty({
    type: SocialLinksDto,
    required: false,
    description: 'Social media and professional profile links',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SocialLinksDto)
  socialLinks?: SocialLinksDto;

  @ApiProperty({
    description: 'Whether the faculty member is in the leadership team',
    default: false,
  })
  @IsString()
  isLeadershipTeam?: string;
}
