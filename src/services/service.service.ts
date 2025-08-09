import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from './schemas/service.schema';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServiceService {
  constructor(@InjectModel(Service.name) private serviceModel: Model<ServiceDocument>) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const createdService = new this.serviceModel(createServiceDto);
    return createdService.save();
  }

  async findAll(): Promise<Service[]> {
    return this.serviceModel.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Service> {
    const service = await this.serviceModel.findById(id).exec();
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  async update(id: string, updateServiceDto: Partial<CreateServiceDto>): Promise<Service> {
    const updatedService = await this.serviceModel
      .findByIdAndUpdate(id, updateServiceDto, { new: true })
      .exec();
    if (!updatedService) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return updatedService;
  }

  async remove(id: string): Promise<Service> {
    const deletedService = await this.serviceModel
      .findByIdAndUpdate(id, { isActive: false }, { new: true })
      .exec();
    if (!deletedService) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return deletedService;
  }

  async findByLevel(level: string): Promise<Service[]> {
    return this.serviceModel
      .find({ level, isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .exec();
  }

  async reorder(id: string, newOrder: number): Promise<Service> {
    const service = await this.serviceModel.findById(id).exec();
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    service.order = newOrder;
    return service.save();
  }
}
