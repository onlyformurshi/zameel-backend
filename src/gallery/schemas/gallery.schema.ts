import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { GalleryCategory } from './gallery-category';

export type GalleryDocument = Gallery & Document;

@Schema({ timestamps: true })
export class Gallery {
  @ApiProperty({ description: 'Title of the gallery item' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ description: 'Title of the gallery item in Arabic' })
  @Prop({ required: true })
  arabicTitle: string;

  @ApiProperty({
    description: 'Base64 encoded image',
    example: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...',
  })
  @Prop({ required: true, type: String })
  image: string;

  @ApiProperty({ description: 'Category of the gallery item' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'GalleryCategory', required: true })
  category: GalleryCategory;

  @ApiProperty({ description: 'Arabic category of the gallery item' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'GalleryCategory', required: true })
  arabicCategory: GalleryCategory;
}

export const GallerySchema = SchemaFactory.createForClass(Gallery);
