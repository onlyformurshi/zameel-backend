import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HeroSection } from '../homepage/schemas/hero-section.schema';
import { WhyChooseUs } from '../homepage/schemas/why-choose-us.schema';
import { Course } from '../courses/schemas/course.schema';
import { Event, EventDocument } from '../events/schemas/event.schema';
import { Gallery, GalleryDocument } from '../gallery/schemas/gallery.schema';
import { Faculty, FacultyDocument } from 'src/faculty/schemas/faculty.schema';
import { FAQCategory, FAQCategoryDocument } from 'src/faq/schemas/faq-category.schema';
import { FAQ, FAQDocument } from 'src/faq/schemas/faq.schema';
import { ContactInfo, ContactInfoDocument } from 'src/contact/schemas/contact-info.schema';
import { GalleryCategory, GalleryCategoryDocument } from 'src/gallery/schemas/gallery-category';
import { Footer, FooterDocument } from 'src/footer/schemas/footer.schema';
import { About, AboutDocument } from 'src/about/schemas/about.schema';
import { CourseCategory, CourseCategoryDocument } from 'src/courses/schemas/course-category.schema';

@Injectable()
export class PublicHomeService {
  private courseIcons = ['🎓', '🌍', '💼', '🖥️', '📚', '🔬', '🎨', '📊', '🌟', '🚀'];

  constructor(
    @InjectModel(HeroSection.name) private heroSectionModel: Model<HeroSection>,
    @InjectModel(WhyChooseUs.name) private whyChooseUsModel: Model<WhyChooseUs>,
    @InjectModel(Course.name) private courseModel: Model<Course>,
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
    @InjectModel(Gallery.name) private readonly galleryModel: Model<GalleryDocument>,
    @InjectModel(Faculty.name) private readonly facultyModel: Model<FacultyDocument>,
    @InjectModel(FAQCategory.name) private faqCategoryModel: Model<FAQCategoryDocument>,
    @InjectModel(FAQ.name) private faqModel: Model<FAQDocument>,
    @InjectModel(ContactInfo.name) private contactModel: Model<ContactInfoDocument>,
    @InjectModel(GalleryCategory.name) private galleryCategoryModel: Model<GalleryCategoryDocument>,
    @InjectModel(Footer.name) private footerModel: Model<FooterDocument>,
    @InjectModel(About.name) private aboutModel: Model<AboutDocument>,
    @InjectModel(CourseCategory.name) private courseCategoryModel: Model<CourseCategoryDocument>,
  ) {}

  async getPublicHomeData() {
    try {
      const heroSection = await this.heroSectionModel.findOne().exec();
      const whyChooseUs = await this.whyChooseUsModel.find().exec();
      const latestCourses = await this.courseModel.find().sort({ createdAt: -1 }).limit(4).exec();
      const upcomingEvents = await this.eventModel
        .find({ isActive: true, date: { $gte: new Date() } })
        .sort({ date: 1 })
        .limit(4)
        .exec();
      const galleryImages = await this.galleryModel.find().sort({ createdAt: -1 }).limit(6).exec();

      return {
        status: 'success',
        data: {
          heroSection: heroSection || null,
          whyChooseUs: whyChooseUs || [],
          latestCourses: latestCourses || [],
          upcomingEvents: upcomingEvents || [],
          galleryImages: galleryImages || [],
        },
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch homepage data: ' + error.message);
    }
  }

  private getRandomIcon(): string {
    const randomIndex = Math.floor(Math.random() * this.courseIcons.length);
    return this.courseIcons[randomIndex];
  }

  async getAllCourses() {
    try {
      const courses = await this.courseModel.find().populate('category').sort({ order: 1 }).exec();
      return courses.map(course => ({
        ...course.toObject(),
        icon: this.getRandomIcon(),
      }));
    } catch (error) {
      throw new Error('Error fetching courses: ' + error.message);
    }
  }

  async getFaculties() {
    try {
      const faculties = await this.facultyModel.find({ isLeadershipTeam: 'false' }).exec();
      return faculties;
    } catch (error) {
      throw new Error('Error fetching faculties: ' + error.message);
    }
  }

  async getGallery() {
    try {
      const gallery = await this.galleryModel.find().exec();
      return gallery;
    } catch (error) {
      throw new Error('Error fetching gallery: ' + error.message);
    }
  }

  async getEvents() {
    try {
      const events = await this.eventModel.find();
      return events;
    } catch (error) {
      throw new Error('Error fetching events: ' + error.message);
    }
  }
  async getFAQCategories() {
    try {
      const categories = await this.faqCategoryModel.find().exec();
      return categories;
    } catch (error) {
      throw new Error('Error fetching FAQ categories: ' + error.message);
    }
  }

  async getFAQ() {
    try {
      const faq = await this.faqModel.find().exec();
      return faq;
    } catch (error) {
      throw new Error('Error fetching FAQ: ' + error.message);
    }
  }

  async getContact() {
    try {
      const contact = await this.contactModel.find().exec();
      return contact;
    } catch (error) {
      throw new Error('Error fetching contact: ' + error.message);
    }
  }

  async getGalleryCategories() {
    try {
      const categories = await this.galleryCategoryModel.find().exec();
      return categories;
    } catch (error) {
      throw new Error('Error fetching gallery categories: ' + error.message);
    }
  }

  async getFooter() {
    try {
      const footer = await this.footerModel.find().exec();
      const contact = await this.contactModel.find().exec();
      return { footer, contact };
    } catch (error) {
      throw new Error('Error fetching footer: ' + error.message);
    }
  }

  async getFaculty() {
    try {
      const faculty = await this.facultyModel.find({ isLeadershipTeam: 'true' }).exec();
      return faculty;
    } catch (error) {
      throw new Error('Error fetching faculty: ' + error.message);
    }
  }

  async getAboutUs() {
    try {
      const aboutUs = await this.aboutModel.find().exec();
      return aboutUs;
    } catch (error) {
      throw new Error('Error fetching about us: ' + error.message);
    }
  }

  async getCourseCategories() {
    try {
      const categories = await this.courseCategoryModel.find().exec();
      return categories;
    } catch (error) {
      throw new Error('Error fetching course categories: ' + error.message);
    }
  }
}
