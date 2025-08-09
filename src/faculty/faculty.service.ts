import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Faculty, FacultyDocument } from './schemas/faculty.schema';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';

@Injectable()
export class FacultyService {
  constructor(@InjectModel(Faculty.name) private facultyModel: Model<FacultyDocument>) {}

  async create(createFacultyDto: CreateFacultyDto): Promise<Faculty> {
    // Check if email already exists
    const existingFaculty = await this.facultyModel.findOne({ email: createFacultyDto.email });
    if (existingFaculty) {
      throw new ConflictException('Faculty member with this email already exists');
    }

    const faculty = new this.facultyModel(createFacultyDto);
    return faculty.save();
  }

  async findAll(filters: { department?: string; search?: string }): Promise<Faculty[]> {
    const query: any = {};

    if (filters.department) {
      query.department = filters.department;
    }

    if (filters.search) {
      query.$text = { $search: filters.search };
    }

    return this.facultyModel.find(query).sort({ order: 1, name: 1 }).exec();
  }

  async findById(id: string): Promise<Faculty> {
    const faculty = await this.facultyModel.findById(id);
    if (!faculty) {
      throw new NotFoundException('Faculty member not found');
    }
    return faculty;
  }

  async findByDepartment(department: string): Promise<Faculty[]> {
    return this.facultyModel
      .find({ department, status: 'active' })
      .sort({ order: 1, name: 1 })
      .exec();
  }

  async update(id: string, updateFacultyDto: UpdateFacultyDto): Promise<Faculty> {
    // Check if email is being updated and if it already exists
    if (updateFacultyDto.email) {
      const existingFaculty = await this.facultyModel.findOne({
        email: updateFacultyDto.email,
        _id: { $ne: id },
      });
      if (existingFaculty) {
        throw new ConflictException('Faculty member with this email already exists');
      }
    }

    const faculty = await this.facultyModel.findByIdAndUpdate(id, updateFacultyDto, { new: true });

    if (!faculty) {
      throw new NotFoundException('Faculty member not found');
    }

    return faculty;
  }

  async remove(id: string): Promise<void> {
    const result = await this.facultyModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Faculty member not found');
    }
  }

  async updateOrder(id: string, order: number): Promise<Faculty> {
    const faculty = await this.facultyModel.findByIdAndUpdate(id, { order }, { new: true });

    if (!faculty) {
      throw new NotFoundException('Faculty member not found');
    }

    return faculty;
  }

  async searchFaculty(query: string): Promise<Faculty[]> {
    return this.facultyModel
      .find({ $text: { $search: query } }, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } })
      .exec();
  }
}
