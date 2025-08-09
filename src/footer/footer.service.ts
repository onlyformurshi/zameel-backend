// footer.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFooterDto } from './dto/create-footer.dto';
import { Footer } from './schemas/footer.schema';
import { CreateSocialLinkDto } from './dto/create-social-link.dto';

@Injectable()
export class FooterService {
  constructor(@InjectModel(Footer.name) private readonly footerModel: Model<Footer>) {}

  async createFooter(createFooterDto: CreateFooterDto): Promise<Footer> {
    // Use findOneAndUpdate with upsert to ensure only one footer exists
    const footer = await this.footerModel.findOneAndUpdate(
      {}, // Empty filter to match any document
      {
        description: createFooterDto.description,
        arabicDescription: createFooterDto.arabicDescription,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
        // Don't modify existing social links when updating description
        runValidators: true,
      },
    );
    return footer;
  }

  async getFooter(): Promise<Footer> {
    const footer = await this.footerModel.findOne();
    if (!footer) {
      throw new NotFoundException('No footer content found');
    }
    return footer;
  }

  async updateDescription(updateDesc: {
    description?: string;
    arabicDescription?: string;
  }): Promise<Footer> {
    const footer = await this.footerModel.findOneAndUpdate(
      {},
      {
        ...(updateDesc.description && { description: updateDesc.description }),
        ...(updateDesc.arabicDescription && { arabicDescription: updateDesc.arabicDescription }),
      },
      { new: true },
    );
    if (!footer) {
      throw new NotFoundException('No footer found');
    }
    return footer;
  }

  async addSocialLink(socialLink: CreateSocialLinkDto): Promise<Footer> {
    const footer = await this.footerModel.findOne();
    if (!footer) {
      throw new NotFoundException('No footer found');
    }

    footer.socialLinks.push(socialLink);
    return footer.save();
  }

  async getSocialLinks(): Promise<CreateSocialLinkDto[]> {
    const footer = await this.footerModel.findOne();
    if (!footer) {
      throw new NotFoundException('No footer found');
    }
    return footer.socialLinks;
  }

  async updateSocialLink(
    linkId: string,
    updateData: Partial<CreateSocialLinkDto>,
  ): Promise<Footer> {
    const footer = await this.footerModel.findOne();
    if (!footer) {
      throw new NotFoundException('No footer found');
    }

    const linkIndex = footer.socialLinks.findIndex(link => link._id.toString() === linkId);
    if (linkIndex === -1) {
      throw new NotFoundException('Social link not found');
    }

    footer.socialLinks[linkIndex] = {
      ...footer.socialLinks[linkIndex],
      ...updateData,
    };

    return footer.save();
  }

  async deleteSocialLink(linkId: string): Promise<Footer> {
    const footer = await this.footerModel.findOne();
    if (!footer) {
      throw new NotFoundException('No footer found');
    }

    const linkIndex = footer.socialLinks.findIndex(link => link._id.toString() === linkId);
    if (linkIndex === -1) {
      throw new NotFoundException('Social link not found');
    }

    footer.socialLinks.splice(linkIndex, 1);
    return footer.save();
  }
}
