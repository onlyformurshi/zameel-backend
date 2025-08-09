import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type FooterDocument = Footer & Document;

@Schema({ timestamps: true })
export class SocialLink {
  @ApiProperty({ example: 'Facebook' })
  @Prop({ required: true })
  platform: string;

  @ApiProperty({ example: 'https://facebook.com/zameel' })
  @Prop({ required: true })
  url: string;

  @ApiProperty({ example: 'facebook-icon', required: false })
  @Prop()
  icon?: string;

  _id?: string;
}

@Schema({ timestamps: true })
export class Footer {
  @ApiProperty({ example: 'Zameel Academy is a leading educational institution...' })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ example: 'أكاديمية زميل هي مؤسسة تعليمية رائدة...', required: false })
  @Prop()
  arabicDescription?: string;

  @ApiProperty({ type: [SocialLink] })
  @Prop({ type: [{ platform: String, url: String, icon: String }], default: [] })
  socialLinks: SocialLink[];
}

export const FooterSchema = SchemaFactory.createForClass(Footer);
