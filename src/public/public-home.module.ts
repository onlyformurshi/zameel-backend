import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublicHomeController } from './public-home.controller';
import { PublicHomeService } from './public-home.service';
import { HeroSection, HeroSectionSchema } from '../homepage/schemas/hero-section.schema';
import { WhyChooseUs, WhyChooseUsSchema } from '../homepage/schemas/why-choose-us.schema';
import { Course, CourseSchema } from '../courses/schemas/course.schema';
import { Event, EventSchema } from '../events/schemas/event.schema';
import { Gallery, GallerySchema } from '../gallery/schemas/gallery.schema';
import { Faculty, FacultySchema } from 'src/faculty/schemas/faculty.schema';
import { EventCategory, EventCategorySchema } from 'src/events/schemas/event-category';
import { FAQCategory, FAQCategorySchema } from 'src/faq/schemas/faq-category.schema';
import { FAQ, FAQSchema } from 'src/faq/schemas/faq.schema';
import { ContactInfo, ContactInfoSchema } from 'src/contact/schemas/contact-info.schema';
import { GalleryCategory, GalleryCategorySchema } from 'src/gallery/schemas/gallery-category';
import { Footer, FooterSchema } from 'src/footer/schemas/footer.schema';
import { About, AboutSchema } from 'src/about/schemas/about.schema';
import { CourseCategory, CourseCategorySchema } from 'src/courses/schemas/course-category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HeroSection.name, schema: HeroSectionSchema },
      { name: WhyChooseUs.name, schema: WhyChooseUsSchema },
      { name: Course.name, schema: CourseSchema },
      { name: Event.name, schema: EventSchema },
      { name: Gallery.name, schema: GallerySchema },
      { name: Faculty.name, schema: FacultySchema },
      { name: EventCategory.name, schema: EventCategorySchema },
      { name: FAQ.name, schema: FAQSchema },
      { name: FAQCategory.name, schema: FAQCategorySchema },
      { name: ContactInfo.name, schema: ContactInfoSchema },
      { name: GalleryCategory.name, schema: GalleryCategorySchema },
      { name: Footer.name, schema: FooterSchema },
      { name: About.name, schema: AboutSchema },
      { name: CourseCategory.name, schema: CourseCategorySchema },
    ]),
  ],
  controllers: [PublicHomeController],
  providers: [PublicHomeService],
})
export class PublicHomeModule {}
