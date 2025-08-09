import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ContactDetailDto {
  @ApiProperty({
    example: 'Main Campus',
    description: 'English label for the contact information',
  })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({
    example: '123 Education Street, Academic District, City',
    description: 'English value of the contact information',
  })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({
    example: 'المقر الرئيسي',
    description: 'Arabic label for the contact information',
  })
  @IsString()
  @IsNotEmpty()
  arabicLabel: string;

  @ApiProperty({
    example: 'شارع التعليم 123، الحي الأكاديمي، المدينة',
    description: 'Arabic value of the contact information',
  })
  @IsString()
  @IsNotEmpty()
  arabicValue: string;
}

export class CreateContactInfoDto {
  @ApiProperty({
    example: '+971 50 123 4567',
    description: 'WhatsApp contact number',
  })
  @IsString()
  @IsNotEmpty()
  whatsapp: string;

  @ApiProperty({
    type: ContactDetailDto,
    description: 'Physical address information in both English and Arabic',
    example: {
      label: 'Main Campus',
      value: '123 Education Street, Academic District, City',
      arabicLabel: 'المقر الرئيسي',
      arabicValue: 'شارع التعليم 123، الحي الأكاديمي، المدينة',
    },
  })
  @ValidateNested()
  @Type(() => ContactDetailDto)
  address: ContactDetailDto;

  @ApiProperty({
    type: ContactDetailDto,
    description: 'Phone contact information in both English and Arabic',
    example: {
      label: 'Main Line',
      value: '+971 4 123 4567',
      arabicLabel: 'الخط الرئيسي',
      arabicValue: '٤٥٦٧ ١٢٣ ٤ ٩٧١+',
    },
  })
  @ValidateNested()
  @Type(() => ContactDetailDto)
  phone: ContactDetailDto;

  @ApiProperty({
    type: ContactDetailDto,
    description: 'Email contact information in both English and Arabic',
    example: {
      label: 'General Inquiries',
      value: 'info@example.com',
      arabicLabel: 'الاستفسارات العامة',
      arabicValue: 'info@example.com',
    },
  })
  @ValidateNested()
  @Type(() => ContactDetailDto)
  email: ContactDetailDto;

  @ApiProperty({
    type: ContactDetailDto,
    description: 'Office hours information in both English and Arabic',
    example: {
      label: 'Working Hours',
      value: 'Monday - Friday: 9:00 AM - 5:00 PM',
      arabicLabel: 'ساعات العمل',
      arabicValue: 'الاثنين - الجمعة: ٩:٠٠ صباحاً - ٥:٠٠ مساءً',
    },
  })
  @ValidateNested()
  @Type(() => ContactDetailDto)
  officeHours: ContactDetailDto;
}
