import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PublicHomeService } from './public-home.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Public Homepage')
@Controller('public')
export class PublicHomeController {
  constructor(private readonly publicHomeService: PublicHomeService) {}

  @Public()
  @Get('home')
  @ApiOperation({ summary: 'Get public homepage data' })
  @ApiResponse({
    status: 200,
    description:
      'Returns the public homepage data including hero section and why choose us section',
  })
  getPublicHomeData() {
    try {
      return this.publicHomeService.getPublicHomeData();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch homepage data');
    }
  }

  @Public()
  @Get('home/courses')
  @ApiOperation({ summary: 'Get all active courses' })
  @ApiResponse({
    status: 200,
    description: 'Returns all active courses',
  })
  async getAllCourses() {
    try {
      const courses = await this.publicHomeService.getAllCourses();
      return {
        status: 'success',
        data: courses,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch courses: ' + error.message);
    }
  }

  @Public()
  @Get('/faculties')
  @ApiOperation({ summary: 'Get all faculties' })
  @ApiResponse({
    status: 200,
    description: 'Returns all faculties',
  })
  getFaculties() {
    try {
      return this.publicHomeService.getFaculties();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch faculties: ' + error.message);
    }
  }

  @Public()
  @Get('/gallery')
  @ApiOperation({ summary: 'Get all gallery images' })
  @ApiResponse({
    status: 200,
    description: 'Returns all gallery images',
  })
  getGallery() {
    try {
      return this.publicHomeService.getGallery();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch gallery: ' + error.message);
    }
  }

  @Public()
  @Get('/events')
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({
    status: 200,
    description: 'Returns all events',
  })
  getEvents() {
    try {
      return this.publicHomeService.getEvents();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch events: ' + error.message);
    }
  }

  @Public()
  @Get('/faq/categories')
  @ApiOperation({ summary: 'Get all FAQ categories' })
  @ApiResponse({
    status: 200,
    description: 'Returns all FAQ categories',
  })
  getFAQCategories() {
    try {
      return this.publicHomeService.getFAQCategories();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch FAQ categories: ' + error.message);
    }
  }

  @Public()
  @Get('/faq')
  @ApiOperation({ summary: 'Get all FAQ' })
  @ApiResponse({
    status: 200,
    description: 'Returns all FAQ',
  })
  getFAQ() {
    try {
      return this.publicHomeService.getFAQ();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch FAQ: ' + error.message);
    }
  }

  @Public()
  @Get('/contact')
  @ApiOperation({ summary: 'Get all contact' })
  @ApiResponse({
    status: 200,
    description: 'Returns all contact',
  })
  getContact() {
    try {
      return this.publicHomeService.getContact();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch contact: ' + error.message);
    }
  }

  @Public()
  @Get('/gallery/categories')
  @ApiOperation({ summary: 'Get all gallery categories' })
  @ApiResponse({
    status: 200,
    description: 'Returns all gallery categories',
  })
  getGalleryCategories() {
    try {
      return this.publicHomeService.getGalleryCategories();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch gallery categories: ' + error.message,
      );
    }
  }

  @Public()
  @Get('/footer')
  @ApiOperation({ summary: 'Get footer' })
  @ApiResponse({
    status: 200,
    description: 'Returns footer',
  })
  getFooter() {
    try {
      return this.publicHomeService.getFooter();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch footer: ' + error.message);
    }
  }

  @Public()
  @Get('/faculty')
  @ApiOperation({ summary: 'Get all faculty' })
  @ApiResponse({
    status: 200,
    description: 'Returns all faculty',
  })
  getFaculty() {
    try {
      return this.publicHomeService.getFaculty();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch faculty: ' + error.message);
    }
  }

  @Public()
  @Get('/about-us')
  @ApiOperation({ summary: 'Get about us' })
  @ApiResponse({
    status: 200,
    description: 'Returns about us',
  })
  getAboutUs() {
    try {
      return this.publicHomeService.getAboutUs();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch about us: ' + error.message);
    }
  }

  @Public()
  @Get('/courses/categories')
  @ApiOperation({ summary: 'Get all course categories' })
  @ApiResponse({
    status: 200,
    description: 'Returns all course categories',
  })
  getCourseCategories() {
    return this.publicHomeService.getCourseCategories();
  }
}
