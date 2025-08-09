import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from '../courses/schemas/course.schema';
import { Event } from '../events/schemas/event.schema';
import { Faculty } from '../faculty/schemas/faculty.schema';
import { Gallery } from '../gallery/schemas/gallery.schema';
import { ContactSubmission } from '../contact/schemas/contact-submission.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(Event.name) private eventModel: Model<Event>,
    @InjectModel(Faculty.name) private facultyModel: Model<Faculty>,
    @InjectModel(Gallery.name) private galleryModel: Model<Gallery>,
    @InjectModel(ContactSubmission.name) private contactModel: Model<ContactSubmission>,
  ) {}

  async getAllStats() {
    const [facultyCount, activeCourses, upcomingEvents, galleryCount] = await Promise.all([
      this.facultyModel.countDocuments(),
      this.courseModel.countDocuments(),
      this.eventModel.countDocuments({
        date: { $gt: new Date().toISOString() },
      }),
      this.galleryModel.countDocuments(),
    ]);

    return {
      facultyCount,
      activeCourses,
      upcomingEvents,
      galleryCount,
    };
  }

  async getRecentActivity(limit = 10) {
    const [courses, events, faculty, gallery] = await Promise.all([
      this.courseModel.find().sort({ createdAt: -1 }).limit(limit).select('title').exec(),
      this.eventModel.find().sort({ createdAt: -1 }).limit(limit).select('title').exec(),
      this.facultyModel.find().sort({ createdAt: -1 }).limit(limit).select('name').exec(),
      this.galleryModel.find().sort({ createdAt: -1 }).limit(limit).select('title').exec(),
    ]);

    const activities = [
      ...courses.map(course => ({
        type: 'course',
        title: course.title,
        timestamp: course['_id'].getTimestamp(),
      })),
      ...events.map(event => ({
        type: 'event',
        title: event.title,
        timestamp: event['_id'].getTimestamp(),
      })),
      ...faculty.map(f => ({
        type: 'faculty',
        title: f.name,
        timestamp: f['_id'].getTimestamp(),
      })),
      ...gallery.map(g => ({
        type: 'gallery',
        title: g.title,
        timestamp: g['_id'].getTimestamp(),
      })),
    ];

    return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, limit);
  }
}
