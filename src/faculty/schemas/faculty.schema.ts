import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type FacultyDocument = Faculty & Document;

@Schema({ timestamps: true })
export class Faculty {
  @ApiProperty({ description: 'Full name of the faculty member' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Full name of the faculty member in Arabic' })
  @Prop({ required: true })
  arabicName: string;

  @ApiProperty({ description: 'Position/title of the faculty member' })
  @Prop({ required: true })
  position: string;

  @ApiProperty({ description: 'Position/title of the faculty member in Arabic' })
  @Prop({ required: true })
  arabicPosition: string;

  @ApiProperty({ description: 'Department of the faculty member' })
  @Prop()
  department?: string;

  @ApiProperty({ description: 'Department of the faculty member in Arabic' })
  @Prop()
  arabicDepartment?: string;

  @ApiProperty({ description: 'Profile image URL' })
  @Prop()
  image?: string;

  @ApiProperty({ description: 'Email address' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ description: 'Contact phone number' })
  @Prop()
  phone?: string;

  @ApiProperty({ description: 'Professional biography' })
  @Prop({ required: true })
  bio: string;

  @ApiProperty({ description: 'Professional biography in Arabic' })
  @Prop({ required: true })
  arabicBio: string;

  @ApiProperty({ description: 'Areas of specialization' })
  @Prop([String])
  specialization: string[];

  @ApiProperty({ description: 'Areas of specialization in Arabic' })
  @Prop([String])
  arabicSpecialization: string[];

  @ApiProperty({ description: 'Social media links' })
  @Prop({
    type: {
      linkedin: String,
      twitter: String,
      researchGate: String,
      googleScholar: String,
      website: String,
    },
  })
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    researchGate?: string;
    googleScholar?: string;
    website?: string;
  };

  @ApiProperty({ description: 'Whether the faculty member is in the leadership team' })
  @Prop({ default: 'false' })
  isLeadershipTeam?: string;
}

export const FacultySchema = SchemaFactory.createForClass(Faculty);

// Create text indexes for search
FacultySchema.index({
  name: 'text',
  position: 'text',
  department: 'text',
  bio: 'text',
  specialization: 'text',
  'education.institution': 'text',
  'education.field': 'text',
});
