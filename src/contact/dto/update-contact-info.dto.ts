import { IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class UpdateContactDetailDto {
  @ApiProperty({
    example: 'Main Campus',
    description: 'English label for the contact information',
    required: false,
  })
  @IsString()
  @IsOptional()
  label?: string;

  @ApiProperty({
    example: '123 Education Street, Academic District, City',
    description: 'English value of the contact information',
    required: false,
  })
  @IsString()
  @IsOptional()
  value?: string;

  @ApiProperty({
    example: 'المقر الرئيسي',
    description: 'Arabic label for the contact information',
    required: false,
  })
  @IsString()
  @IsOptional()
  arabicLabel?: string;

  @ApiProperty({
    example: 'شارع التعليم 123، الحي الأكاديمي، المدينة',
    description: 'Arabic value of the contact information',
    required: false,
  })
  @IsString()
  @IsOptional()
  arabicValue?: string;
}

export class UpdateContactInfoDto {
  @ApiProperty({
    example: '+971 50 123 4567',
    description: 'WhatsApp contact number',
    required: false,
  })
  @IsString()
  @IsOptional()
  whatsapp?: string;

  @ApiProperty({
    type: UpdateContactDetailDto,
    description: 'Physical address information in both English and Arabic',
    required: false,
    example: {
      label: 'Main Campus',
      value: '123 Education Street, Academic District, City',
      arabicLabel: 'المقر الرئيسي',
      arabicValue: 'شارع التعليم 123، الحي الأكاديمي، المدينة',
    },
  })
  @ValidateNested()
  @Type(() => UpdateContactDetailDto)
  @IsOptional()
  address?: UpdateContactDetailDto;

  @ApiProperty({
    type: UpdateContactDetailDto,
    description: 'Phone contact information in both English and Arabic',
    required: false,
    example: {
      label: 'Main Line',
      value: '+971 4 123 4567',
      arabicLabel: 'الخط الرئيسي',
      arabicValue: '٤٥٦٧ ١٢٣ ٤ ٩٧١+',
    },
  })
  @ValidateNested()
  @Type(() => UpdateContactDetailDto)
  @IsOptional()
  phone?: UpdateContactDetailDto;

  @ApiProperty({
    type: UpdateContactDetailDto,
    description: 'Email contact information in both English and Arabic',
    required: false,
    example: {
      label: 'General Inquiries',
      value: 'info@example.com',
      arabicLabel: 'الاستفسارات العامة',
      arabicValue: 'info@example.com',
    },
  })
  @ValidateNested()
  @Type(() => UpdateContactDetailDto)
  @IsOptional()
  email?: UpdateContactDetailDto;

  @ApiProperty({
    type: UpdateContactDetailDto,
    description: 'Office hours information in both English and Arabic',
    required: false,
    example: {
      label: 'Working Hours',
      value: 'Monday - Friday: 9:00 AM - 5:00 PM',
      arabicLabel: 'ساعات العمل',
      arabicValue: 'الاثنين - الجمعة: ٩:٠٠ صباحاً - ٥:٠٠ مساءً',
    },
  })
  @ValidateNested()
  @Type(() => UpdateContactDetailDto)
  @IsOptional()
  officeHours?: UpdateContactDetailDto;
}
