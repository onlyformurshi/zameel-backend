import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Homepage extends Document {
  @Prop({
    type: {
      title: String,
      arabicTitle: String,
      subtitle: String,
      arabicSubtitle: String,
      imageUrl: String,
      isActive: Boolean,
    },
  })
  heroSection: {
    title: string;
    arabicTitle: string;
    subtitle: string;
    arabicSubtitle: string;
    imageUrl: string;
    isActive: boolean;
  };

  @Prop({
    type: [
      {
        id: String,
        title: String,
        arabicTitle: String,
        description: String,
        arabicDescription: String,
        icon: String,
        isActive: Boolean,
      },
    ],
  })
  whyChooseUs: Array<{
    id: string;
    title: string;
    arabicTitle: string;
    description: string;
    arabicDescription: string;
    icon: string;
    isActive: boolean;
  }>;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  subtitle: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  backgroundImage?: string;

  @Prop({
    type: [
      {
        id: String,
        title: String,
        arabicTitle: String,
        description: String,
        arabicDescription: String,
        duration: String,
        arabicDuration: String,
        imageUrl: String,
        features: [String],
        arabicFeatures: [String],
        isActive: Boolean,
      },
    ],
  })
  programs: Array<{
    id: string;
    title: string;
    arabicTitle: string;
    description: string;
    arabicDescription: string;
    duration: string;
    arabicDuration: string;
    imageUrl: string;
    features: string[];
    arabicFeatures: string[];
    isActive: boolean;
  }>;

  @Prop({
    type: [
      {
        id: Number,
        category: String,
        title: String,
        description: String,
        image: String,
        startTime: String,
        endTime: String,
        location: String,
      },
    ],
  })
  events: Array<{
    id: number;
    category: string;
    title: string;
    description: string;
    image: string;
    startTime: string;
    endTime: string;
    location: string;
  }>;

  @Prop({
    type: [
      {
        id: Number,
        title: String,
        image: String,
      },
    ],
  })
  gallery: Array<{
    id: number;
    title: string;
    image: string;
  }>;

  @Prop({
    type: {
      totalStudents: Number,
      totalCourses: Number,
      totalEvents: Number,
      totalFaculty: Number,
      successRate: Number,
      yearsOfExperience: Number,
    },
  })
  statistics: {
    totalStudents: number;
    totalCourses: number;
    totalEvents: number;
    totalFaculty: number;
    successRate: number;
    yearsOfExperience: number;
  };

  @Prop({
    type: {
      title: String,
      description: String,
      keywords: [String],
    },
  })
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const HomepageSchema = SchemaFactory.createForClass(Homepage);
