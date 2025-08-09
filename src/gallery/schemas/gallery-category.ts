import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type GalleryCategoryDocument = GalleryCategory & Document;

@Schema({ timestamps: true })
export class GalleryCategory {
  @ApiProperty({ description: 'Category name' })
  @Prop({ required: true, unique: true })
  name: string;

  @ApiProperty({ description: 'Category name in Arabic' })
  @Prop({ required: true, unique: true })
  arabicName: string;
}

export const GalleryCategorySchema = SchemaFactory.createForClass(GalleryCategory);
