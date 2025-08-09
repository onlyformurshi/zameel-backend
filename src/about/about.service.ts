import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { About } from './schemas/about.schema';

@Injectable()
export class AboutService {
  constructor(@InjectModel(About.name) private readonly aboutModel: Model<About>) {}

  async upsert(aboutData: {
    title: string;
    description: string;
    stats: {
      studentsEnrolled: number;
      successRate: number;
      expertEducators: number;
      yearsOfExcellence: number;
    };
    mission: string;
    vision: string;
  }): Promise<About> {
    const about = await this.aboutModel.findOneAndUpdate({}, aboutData, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
      runValidators: true,
    });
    return about;
  }

  async find(): Promise<About> {
    const about = await this.aboutModel.findOne();
    if (!about) {
      return {
        title: 'Welcome to Zameel Academy',
        description: 'Your journey to excellence starts here.',
        stats: {
          studentsEnrolled: 0,
          successRate: 0,
          expertEducators: 0,
          yearsOfExcellence: 0,
        },
        mission: 'Our mission is to provide quality education.',
        vision: 'Our vision is to become a leading educational institution.',
      } as About;
    }
    return about;
  }
}
