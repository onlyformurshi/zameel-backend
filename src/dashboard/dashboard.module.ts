import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Course, CourseSchema } from '../courses/schemas/course.schema';
import { Event, EventSchema } from '../events/schemas/event.schema';
import { Faculty, FacultySchema } from '../faculty/schemas/faculty.schema';
import { Gallery, GallerySchema } from '../gallery/schemas/gallery.schema';
import {
  ContactSubmission,
  ContactSubmissionSchema,
} from '../contact/schemas/contact-submission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Course.name, schema: CourseSchema },
      { name: Event.name, schema: EventSchema },
      { name: Faculty.name, schema: FacultySchema },
      { name: Gallery.name, schema: GallerySchema },
      { name: ContactSubmission.name, schema: ContactSubmissionSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
