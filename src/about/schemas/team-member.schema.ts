import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type TeamMemberDocument = TeamMember & Document;

@Schema({ timestamps: true })
export class TeamMember {
  @ApiProperty({
    description: 'Name of the team member in English',
    example: 'John Doe',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'Name of the team member in Arabic',
    example: 'جون دو',
  })
  @Prop({ required: true })
  arabicName: string;

  @ApiProperty({
    description: 'Role/position of the team member in English',
    example: 'Senior Instructor',
  })
  @Prop({ required: true })
  role: string;

  @ApiProperty({
    description: 'Role/position of the team member in Arabic',
    example: 'مدرس أول',
  })
  @Prop({ required: true })
  arabicRole: string;

  @ApiProperty({
    description: 'Profile image URL of the team member',
    example: 'https://example.com/images/team/john-doe.jpg',
  })
  @Prop({ required: true })
  image: string;

  @ApiProperty({
    description: 'Brief description of the team member',
    example: 'John has over 10 years of experience in teaching...',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    description: 'List of specialties/expertise areas',
    type: [String],
    example: ['English Language', 'Business Communication', 'IELTS Preparation'],
  })
  @Prop({ type: [String], required: true })
  specialties: string[];

  @ApiProperty({
    description: 'Notable achievements of the team member',
    example: 'Certified IELTS trainer with over 1000 successful students',
  })
  @Prop({ required: true })
  achievements: string;

  @ApiProperty({
    description: 'Display order of the team member',
    default: 0,
  })
  @Prop({ default: 0 })
  order: number;

  @ApiProperty({
    description: 'Whether the team member is currently active',
    default: true,
  })
  @Prop({ default: true })
  isActive: boolean;
}

export const TeamMemberSchema = SchemaFactory.createForClass(TeamMember);
