import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { FAQ, FAQDocument } from './schemas/faq.schema';
import { FAQCategory, FAQCategoryDocument } from './schemas/faq-category.schema';
import { CreateFaqDto } from './dto/create-faq.dto';
import { CreateFaqCategoryDto } from './dto/create-faq-category.dto';

@Injectable()
export class FAQService {
  private readonly logger = new Logger(FAQService.name);

  constructor(
    @InjectModel(FAQ.name) private faqModel: Model<FAQDocument>,
    @InjectModel(FAQCategory.name) private categoryModel: Model<FAQCategoryDocument>,
  ) {}

  // FAQ Methods
  async create(createFaqDto: CreateFaqDto): Promise<FAQ> {
    // Validate category ID
    if (!isValidObjectId(createFaqDto.category)) {
      throw new BadRequestException('Invalid category ID');
    }

    // Check if category exists
    const category = await this.categoryModel.findById(createFaqDto.category).exec();
    if (!category) {
      throw new BadRequestException('Category not found');
    }

    const createdFaq = new this.faqModel(createFaqDto);
    const savedFaq = await createdFaq.save();
    return this.faqModel
      .findById(savedFaq._id)
      .populate('category', 'name arabicName')
      .exec();
  }

  async findAll(): Promise<FAQ[]> {
    this.logger.log('Finding all FAQs');
    try {
      const faqs = await this.faqModel
        .find()
        .populate('category', 'name arabicName')
        .sort({ order: 1 })
        .exec();
      
      this.logger.log(`Found ${faqs.length} FAQs`);
      return faqs.map(faq => {
        // If category is not found, return FAQ with null category
        if (!faq.category) {
          return {
            ...faq.toObject(),
            category: null
          };
        }
        return faq;
      });
    } catch (error) {
      this.logger.error('Error finding FAQs:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<FAQ> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid FAQ ID');
    }

    const faq = await this.faqModel
      .findById(id)
      .populate('category', 'name arabicName')
      .exec();
    if (!faq) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }
    return faq;
  }

  async update(id: string, updateFaqDto: Partial<CreateFaqDto>): Promise<FAQ> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid FAQ ID');
    }

    // If category is being updated, validate it
    if (updateFaqDto.category) {
      if (!isValidObjectId(updateFaqDto.category)) {
        throw new BadRequestException('Invalid category ID');
      }

      // Check if category exists
      const category = await this.categoryModel.findById(updateFaqDto.category).exec();
      if (!category) {
        throw new BadRequestException('Category not found');
      }
    }

    const updatedFaq = await this.faqModel
      .findByIdAndUpdate(id, updateFaqDto, { new: true })
      .populate('category', 'name arabicName')
      .exec();
    if (!updatedFaq) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }
    return updatedFaq;
  }

  async remove(id: string): Promise<FAQ> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid FAQ ID');
    }

    const deletedFaq = await this.faqModel
      .findByIdAndDelete(id)
      .populate('category', 'name arabicName')
      .exec();
    if (!deletedFaq) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }
    return deletedFaq;
  }

  async updateOrder(id: string, order: number): Promise<FAQ> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid FAQ ID');
    }

    const faq = await this.faqModel
      .findByIdAndUpdate(id, { order }, { new: true })
      .populate('category', 'name arabicName')
      .exec();
    if (!faq) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }
    return faq;
  }

  async search(query: string): Promise<FAQ[]> {
    const searchRegex = new RegExp(query, 'i');
    return this.faqModel
      .find({
        $or: [{ question: searchRegex }, { answer: searchRegex }],
      })
      .populate('category', 'name arabicName')
      .sort({ order: 1 })
      .exec();
  }

  // Category Methods
  async createCategory(createCategoryDto: CreateFaqCategoryDto): Promise<FAQCategory> {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAllCategories(): Promise<FAQCategory[]> {
    this.logger.log('Finding all FAQ categories');
    try {
      const categories = await this.categoryModel.find().sort({ order: 1 }).exec();
      this.logger.log(`Found ${categories.length} categories`);
      return categories;
    } catch (error) {
      this.logger.error('Error finding FAQ categories:', error);
      throw error;
    }
  }

  async updateCategory(
    id: string,
    updateCategoryDto: Partial<CreateFaqCategoryDto>,
  ): Promise<FAQCategory> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid category ID');
    }

    const updatedCategory = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();
    if (!updatedCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return updatedCategory;
  }

  async removeCategory(id: string): Promise<FAQCategory> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid category ID');
    }

    // Check if category is being used by any FAQ
    const faqsUsingCategory = await this.faqModel.findOne({ category: id }).exec();
    if (faqsUsingCategory) {
      throw new BadRequestException('Cannot delete category that is being used by FAQs');
    }

    const deletedCategory = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!deletedCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return deletedCategory;
  }

  // Bulk Operations
  async bulkDelete(ids: string[]): Promise<{ message: string }> {
    // Validate all IDs
    if (!ids.every(id => isValidObjectId(id))) {
      throw new BadRequestException('Invalid FAQ ID in bulk delete request');
    }

    await this.faqModel.deleteMany({ _id: { $in: ids } }).exec();
    return { message: `Successfully deleted ${ids.length} FAQs` };
  }

  async bulkUpdateStatus(ids: string[], isActive: boolean): Promise<{ message: string }> {
    // Validate all IDs
    if (!ids.every(id => isValidObjectId(id))) {
      throw new BadRequestException('Invalid FAQ ID in bulk update request');
    }

    await this.faqModel.updateMany({ _id: { $in: ids } }, { $set: { isActive } }).exec();
    return { message: `Successfully updated status of ${ids.length} FAQs` };
  }
}
