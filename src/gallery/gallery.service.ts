import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Error as MongooseError } from 'mongoose';
import { Gallery, GalleryDocument } from './schemas/gallery.schema';
import { GalleryCategory, GalleryCategoryDocument } from './schemas/gallery-category';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { CreateGalleryCategoryDto } from './dto/create-galler-category.dto';
import { UploadService } from '../upload/upload.service';
@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(Gallery.name) private galleryModel: Model<GalleryDocument>,
    @InjectModel(GalleryCategory.name) private galleryCategoryModel: Model<GalleryCategoryDocument>,
    private uploadService: UploadService,
  ) {}

  async create(createGalleryDto: CreateGalleryDto, file?: any): Promise<Gallery> {
    try {
      if (!file) {
        throw new BadRequestException('Image file is required');
      }

      // Convert file to base64
      const fileBuffer = file.buffer;
      const base64Image = `data:${file.mimetype};base64,${fileBuffer.toString('base64')}`;

      const createdGallery = new this.galleryModel({
        ...createGalleryDto,
        image: base64Image,
      });

      const savedGallery = await createdGallery.save();
      return this.galleryModel
        .findById(savedGallery._id)
        .populate('category', 'name')
        .populate('arabicCategory', 'arabicName')
        .exec();
    } catch (error) {
      if (error instanceof MongooseError.ValidationError) {
        throw new BadRequestException('Invalid gallery data provided');
      }
      throw error;
    }
  }

  async findAll(): Promise<Gallery[]> {
    try {
      return await this.galleryModel
        .find()
        .populate('category', 'name')
        .populate('arabicCategory', 'arabicName')
        .sort({ createdAt: -1 })
        .exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch gallery items');
    }
  }

  async findOne(id: string): Promise<Gallery> {
    try {
      const gallery = await this.galleryModel
        .findById(id)
        .populate(['category', 'arabicCategory'])
        .exec();
      if (!gallery) {
        throw new NotFoundException(`Gallery item with ID ${id} not found`);
      }
      return gallery;
    } catch (error) {
      if (error instanceof MongooseError.CastError) {
        throw new BadRequestException(`Invalid gallery ID format: ${id}`);
      }
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch gallery item');
    }
  }

  async update(
    id: string,
    updateGalleryDto: Partial<CreateGalleryDto>,
    file?: any,
  ): Promise<Gallery> {
    try {
      const updateData = {
        ...updateGalleryDto,
      };

      if (file) {
        // Convert file to base64
        const fileBuffer = file.buffer;
        const base64Image = `data:${file.mimetype};base64,${fileBuffer.toString('base64')}`;
        updateData['image'] = base64Image;
      }

      const updatedGallery = await this.galleryModel
        .findByIdAndUpdate(id, updateData, { new: true })
        .populate('category', 'name')
        .populate('arabicCategory', 'arabicName')
        .exec();

      if (!updatedGallery) {
        throw new NotFoundException(`Gallery item with ID ${id} not found`);
      }
      return updatedGallery;
    } catch (error) {
      if (error instanceof MongooseError.CastError) {
        throw new BadRequestException(`Invalid gallery ID format: ${id}`);
      }
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw error;
    }
  }

  async remove(id: string): Promise<Gallery> {
    try {
      const deletedGallery = await this.galleryModel.findByIdAndDelete(id).exec();
      if (!deletedGallery) {
        throw new NotFoundException(`Gallery item with ID ${id} not found`);
      }
      return deletedGallery;
    } catch (error) {
      if (error instanceof MongooseError.CastError) {
        throw new BadRequestException(`Invalid gallery ID format: ${id}`);
      }
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to remove gallery item');
    }
  }

  async getGalleryCategories(): Promise<GalleryCategory[]> {
    try {
      return await this.galleryCategoryModel.find().sort({ order: 1, createdAt: -1 }).exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch gallery categories');
    }
  }

  async createGalleryCategory(
    createGalleryCategoryDto: CreateGalleryCategoryDto,
  ): Promise<GalleryCategory> {
    try {
      const createdCategory = new this.galleryCategoryModel(createGalleryCategoryDto);
      return await createdCategory.save();
    } catch (error) {
      if (error instanceof MongooseError.ValidationError) {
        throw new BadRequestException('Invalid gallery category data provided');
      }
      throw new InternalServerErrorException('Failed to create gallery category');
    }
  }

  async updateGalleryCategory(
    id: string,
    updateGalleryCategoryDto: Partial<CreateGalleryCategoryDto>,
  ): Promise<GalleryCategory> {
    try {
      const updatedCategory = await this.galleryCategoryModel
        .findByIdAndUpdate(id, updateGalleryCategoryDto, { new: true })
        .exec();
      if (!updatedCategory) {
        throw new NotFoundException(`Gallery category with ID ${id} not found`);
      }
      return updatedCategory;
    } catch (error) {
      if (error instanceof MongooseError.CastError) {
        throw new BadRequestException(`Invalid gallery category ID format: ${id}`);
      }
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update gallery category');
    }
  }

  async deleteGalleryCategory(id: string): Promise<void> {
    try {
      await this.galleryCategoryModel.findByIdAndDelete(id).exec();
    } catch (error) {
      if (error instanceof MongooseError.CastError) {
        throw new BadRequestException(`Invalid gallery category ID format: ${id}`);
      }
      throw new InternalServerErrorException('Failed to delete gallery category');
    }
  }
}
