import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContactSubmission, ContactSubmissionDocument } from './schemas/contact-submission.schema';
import { ContactInfo } from './schemas/contact-info.schema';
import { CreateContactSubmissionDto } from './dto/create-contact-submission.dto';
import { UpdateContactSubmissionDto } from './dto/update-contact-submission.dto';
import { CreateContactInfoDto } from './dto/create-contact-info.dto';
import { UpdateContactInfoDto } from './dto/update-contact-info.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(ContactSubmission.name)
    private contactSubmissionModel: Model<ContactSubmissionDocument>,
    @InjectModel(ContactInfo.name)
    private contactInfoModel: Model<ContactInfo>,
  ) {}

  // Contact Info Methods
  async createOrUpdateInfo(createContactInfoDto: CreateContactInfoDto): Promise<ContactInfo> {
    const contactInfo = await this.contactInfoModel.findOneAndUpdate(
      {}, // Empty filter to match any document
      createContactInfoDto,
      {
        upsert: true, // Create if doesn't exist
        new: true, // Return the updated document
        setDefaultsOnInsert: true, // Apply schema defaults on insert
      },
    );
    return contactInfo;
  }

  async findInfo(): Promise<ContactInfo | null> {
    return this.contactInfoModel.findOne().exec();
  }

  async updateInfo(updateContactInfoDto: UpdateContactInfoDto): Promise<ContactInfo> {
    const contactInfo = await this.contactInfoModel.findOneAndUpdate({}, updateContactInfoDto, {
      new: true,
    });
    return contactInfo;
  }

  // Contact Submission Methods
  async create(createContactDto: CreateContactSubmissionDto): Promise<ContactSubmission> {
    const submission = new this.contactSubmissionModel(createContactDto);
    return submission.save();
  }

  async findAll(filters: {
    status?: string;
    priority?: string;
    assignedTo?: string;
    startDate?: Date;
    endDate?: Date;
    search?: string;
  }): Promise<ContactSubmission[]> {
    const query: any = {};

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.priority) {
      query.priority = filters.priority;
    }

    if (filters.assignedTo) {
      query.assignedTo = filters.assignedTo;
    }

    if (filters.startDate || filters.endDate) {
      query.createdAt = {};
      if (filters.startDate) {
        query.createdAt.$gte = filters.startDate;
      }
      if (filters.endDate) {
        query.createdAt.$lte = filters.endDate;
      }
    }

    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { email: { $regex: filters.search, $options: 'i' } },
        { subject: { $regex: filters.search, $options: 'i' } },
        { message: { $regex: filters.search, $options: 'i' } },
      ];
    }

    return this.contactSubmissionModel.find(query).sort({ createdAt: -1 }).exec();
  }

  async findById(id: string): Promise<ContactSubmission> {
    const submission = await this.contactSubmissionModel.findById(id);
    if (!submission) {
      throw new NotFoundException(`Contact submission with ID ${id} not found`);
    }
    return submission;
  }

  async update(
    id: string,
    updateData: UpdateContactSubmissionDto,
    userId: string,
  ): Promise<ContactSubmission> {
    const submission = await this.contactSubmissionModel.findById(id);
    if (!submission) {
      throw new NotFoundException(`Contact submission with ID ${id} not found`);
    }

    // Handle response message if provided
    if (updateData.responseMessage) {
      submission.response = {
        message: updateData.responseMessage,
        respondedAt: new Date(),
        respondedBy: userId,
      };
      submission.status = 'replied';
    }

    // Handle internal note if provided
    if (updateData.internalNote) {
      if (!submission.internalNotes) {
        submission.internalNotes = [];
      }
      submission.internalNotes.push({
        note: updateData.internalNote,
        addedBy: userId,
        addedAt: new Date(),
      });
    }

    // Update other fields
    Object.assign(submission, {
      ...updateData,
      updatedAt: new Date(),
    });

    return submission.save();
  }

  async delete(id: string): Promise<void> {
    const result = await this.contactSubmissionModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Contact submission with ID ${id} not found`);
    }
  }

  async getStats(startDate?: Date, endDate?: Date): Promise<any> {
    const query: any = {};
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = startDate;
      }
      if (endDate) {
        query.createdAt.$lte = endDate;
      }
    }

    const [
      totalCount,
      pendingCount,
      repliedCount,
      archivedCount,
      urgentCount,
      highCount,
      mediumCount,
      lowCount,
    ] = await Promise.all([
      this.contactSubmissionModel.countDocuments(query),
      this.contactSubmissionModel.countDocuments({ ...query, status: 'pending' }),
      this.contactSubmissionModel.countDocuments({ ...query, status: 'replied' }),
      this.contactSubmissionModel.countDocuments({ ...query, status: 'archived' }),
      this.contactSubmissionModel.countDocuments({ ...query, priority: 'urgent' }),
      this.contactSubmissionModel.countDocuments({ ...query, priority: 'high' }),
      this.contactSubmissionModel.countDocuments({ ...query, priority: 'medium' }),
      this.contactSubmissionModel.countDocuments({ ...query, priority: 'low' }),
    ]);

    return {
      total: totalCount,
      byStatus: {
        pending: pendingCount,
        replied: repliedCount,
        archived: archivedCount,
      },
      byPriority: {
        urgent: urgentCount,
        high: highCount,
        medium: mediumCount,
        low: lowCount,
      },
    };
  }
}
