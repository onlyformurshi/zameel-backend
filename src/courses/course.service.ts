import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { CourseCategory, CourseCategoryDocument } from './schemas/course-category.schema';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<CourseDocument>,
    @InjectModel(CourseCategory.name)
    private courseCategoryModel: Model<CourseCategoryDocument>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const createdCourse = new this.courseModel(createCourseDto);
    return createdCourse.save();
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().sort({ order: 1, createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseModel.findOne({ _id: id }).exec();
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found or is inactive`);
    }
    return course;
  }

  async update(id: string, updateCourseDto: Partial<CreateCourseDto>): Promise<Course> {
    const updatedCourse = await this.courseModel
      .findByIdAndUpdate(id, updateCourseDto, { new: true })
      .exec();
    if (!updatedCourse) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return updatedCourse;
  }

  async remove(id: string): Promise<Course> {
    const deletedCourse = await this.courseModel.findByIdAndDelete(id).exec();
    if (!deletedCourse) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }
    return deletedCourse;
  }

  async findByLevel(level: string): Promise<Course[]> {
    return this.courseModel
      .find({ level, isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .exec();
  }

  async search(query: string): Promise<Course[]> {
    const searchRegex = new RegExp(query, 'i');
    return this.courseModel
      .find({
        isActive: true,
        $or: [{ title: searchRegex }, { description: searchRegex }, { arabicTitle: searchRegex }],
      })
      .sort({ order: 1, createdAt: -1 })
      .exec();
  }

  async getCourseCategories(): Promise<CourseCategory[]> {
    return this.courseCategoryModel.find().exec();
  }

  async updateCourseCategory(
    id: string,
    updateCourseDto: Partial<CourseCategory>,
  ): Promise<CourseCategory> {
    const updatedCourse = await this.courseCategoryModel
      .findByIdAndUpdate(id, updateCourseDto, { new: true })
      .exec();
    if (!updatedCourse) {
      throw new NotFoundException(`Course category with ID ${id} not found`);
    }
    return updatedCourse;
  }

  async createCourseCategory(createCourseCategoryDto: CourseCategory): Promise<CourseCategory> {
    const createdCourseCategory = new this.courseCategoryModel(createCourseCategoryDto);
    return createdCourseCategory.save();
  }

  async deleteCourseCategory(id: string): Promise<void> {
    await this.courseCategoryModel.findByIdAndDelete(id).exec();
  }
}
