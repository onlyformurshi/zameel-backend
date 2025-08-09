import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ContactInfoDocument = ContactInfo & Document;

@Schema({ _id: false })
class ContactDetail {
  @ApiProperty({
    example: 'Main Campus',
    description: 'Label for the contact information',
  })
  @Prop({ required: true })
  label: string;

  @ApiProperty({
    example: '123 Education Street, Academic District, City',
    description: 'Value of the contact information',
  })
  @Prop({ required: true })
  value: string;

  @ApiProperty({
    example: 'المقر الرئيسي',
    description: 'Arabic label for the contact information',
  })
  @Prop({ required: true })
  arabicLabel: string;

  @ApiProperty({
    example: 'شارع التعليم 123، الحي الأكاديمي، المدينة',
    description: 'Arabic value of the contact information',
  })
  @Prop({ required: true })
  arabicValue: string;
}

@Schema({ timestamps: true })
export class ContactInfo {
  @ApiProperty({
    example: '+971 50 123 4567',
    description: 'WhatsApp contact number',
  })
  @Prop({ required: true })
  whatsapp: string;

  @ApiProperty({
    type: ContactDetail,
    description: 'Physical address information',
  })
  @Prop({ type: ContactDetail, required: true })
  address: ContactDetail;

  @ApiProperty({
    type: ContactDetail,
    description: 'Phone contact information',
  })
  @Prop({ type: ContactDetail, required: true })
  phone: ContactDetail;

  @ApiProperty({
    type: ContactDetail,
    description: 'Email contact information',
  })
  @Prop({ type: ContactDetail, required: true })
  email: ContactDetail;

  @ApiProperty({
    type: ContactDetail,
    description: 'Office hours information',
  })
  @Prop({ type: ContactDetail, required: true })
  officeHours: ContactDetail;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-30T12:00:00.000Z',
  })
  createdAt?: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-30T12:00:00.000Z',
  })
  updatedAt?: Date;
}

export const ContactInfoSchema = SchemaFactory.createForClass(ContactInfo);
