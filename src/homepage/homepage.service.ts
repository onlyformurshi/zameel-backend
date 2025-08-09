import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HeroSection, HeroSectionDocument } from './schemas/hero-section.schema';
import { WhyChooseUs, WhyChooseUsDocument } from './schemas/why-choose-us.schema';
import { CreateHeroSectionDto, UpdateHeroSectionDto } from './dto/hero-section.dto';
import { CreateWhyChooseUsDto, UpdateWhyChooseUsDto } from './dto/why-choose-us.dto';

@Injectable()
export class HomepageService {
  constructor(
    @InjectModel(HeroSection.name)
    private readonly heroSectionModel: Model<HeroSectionDocument>,
    @InjectModel(WhyChooseUs.name)
    private readonly whyChooseUsModel: Model<WhyChooseUsDocument>,
  ) {}

  async getHomePageData() {
    try {
      const [heroSection, whyChooseUs] = await Promise.all([
        this.heroSectionModel.findOne().exec(),
        this.whyChooseUsModel.find().exec(),
      ]);
      return {
        heroSection: heroSection || null,
        whyChooseUs: whyChooseUs || [],
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch homepage data');
    }
  }

  // Hero Section Methods
  async createHeroSection(createHeroSectionDto: CreateHeroSectionDto) {
    try {
      // Delete any existing hero section first
      await this.heroSectionModel.deleteMany({});

      // Create new hero section
      const heroSection = new this.heroSectionModel(createHeroSectionDto);
      return await heroSection.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to create hero section');
    }
  }

  async updateHeroSection(id: string, updateHeroSectionDto: UpdateHeroSectionDto) {
    try {
      const heroSection = await this.heroSectionModel.findById(id).exec();

      if (!heroSection) {
        throw new NotFoundException(`Hero section with ID ${id} not found`);
      }

      Object.assign(heroSection, updateHeroSectionDto);
      return await heroSection.save();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update hero section');
    }
  }

  // Why Choose Us Methods
  async createWhyChooseUs(createWhyChooseUsDto: CreateWhyChooseUsDto) {
    try {
      const whyChooseUs = new this.whyChooseUsModel(createWhyChooseUsDto);
      return await whyChooseUs.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to create Why Choose Us item');
    }
  }

  async updateWhyChooseUs(id: string, updateWhyChooseUsDto: UpdateWhyChooseUsDto) {
    try {
      const whyChooseUs = await this.whyChooseUsModel.findById(id).exec();

      if (!whyChooseUs) {
        throw new NotFoundException(`Why Choose Us item with ID ${id} not found`);
      }

      Object.assign(whyChooseUs, updateWhyChooseUsDto);
      return await whyChooseUs.save();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update Why Choose Us item');
    }
  }

  async deleteWhyChooseUs(id: string) {
    try {
      const whyChooseUs = await this.whyChooseUsModel.findByIdAndDelete(id).exec();

      if (!whyChooseUs) {
        throw new NotFoundException(`Why Choose Us item with ID ${id} not found`);
      }

      return whyChooseUs;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete Why Choose Us item');
    }
  }
}
