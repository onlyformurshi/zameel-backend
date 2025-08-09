import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ContactMessageDocument = ContactMessage & Document;

@Schema({ timestamps: true })
export class ContactMessage {
  @ApiProperty({ description: 'Name of the person sending the message' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Email address of the sender' })
  @Prop({ required: true })
  email: string;

  @ApiProperty({ description: 'Subject of the message' })
  @Prop({ required: true })
  subject: string;

  @ApiProperty({ description: 'Content of the message' })
  @Prop({ required: true })
  message: string;

  @ApiProperty({
    description: 'Whether the message has been read',
    default: false,
  })
  @Prop({ default: false })
  isRead: boolean;

  @ApiProperty({
    description: 'Whether the message is currently active',
    default: true,
  })
  @Prop({ default: true })
  isActive: boolean;
}

export const ContactMessageSchema = SchemaFactory.createForClass(ContactMessage);
