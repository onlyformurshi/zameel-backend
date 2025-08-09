import { IsString, IsOptional, IsArray, ValidateNested, IsNumber, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

class WhyChooseUsDto {
  @IsString()
  icon: string;

  @IsString()
  title: string;

  @IsString()
  description: string;
}

class CourseDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  description: string;
}

class EventDto {
  @IsNumber()
  id: number;

  @IsString()
  category: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsUrl()
  image: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;

  @IsString()
  location: string;
}

class GalleryDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsUrl()
  image: string;
}

class StatisticsDto {
  @IsNumber()
  totalStudents: number;

  @IsNumber()
  totalCourses: number;

  @IsNumber()
  totalEvents: number;

  @IsNumber()
  totalFaculty: number;

  @IsNumber()
  successRate: number;

  @IsNumber()
  yearsOfExperience: number;
}

class SeoDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  keywords: string[];
}

export class CreateHomepageDto {
  @IsString()
  title: string;

  @IsString()
  subtitle: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsUrl()
  backgroundImage?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WhyChooseUsDto)
  whyChooseUs: WhyChooseUsDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CourseDto)
  courses: CourseDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EventDto)
  events: EventDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GalleryDto)
  gallery: GalleryDto[];

  @ValidateNested()
  @Type(() => StatisticsDto)
  statistics: StatisticsDto;

  @ValidateNested()
  @Type(() => SeoDto)
  seo: SeoDto;
}
