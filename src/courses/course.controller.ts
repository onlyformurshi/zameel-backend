import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './schemas/course.schema';
import { Public } from '../auth/decorators/public.decorator';
import { CourseCategory } from './schemas/course-category.schema';
import { CourseCategoryDto } from './dto/course-category.dto';

@ApiTags('Courses')
@Controller('courses')
@ApiBearerAuth('JWT-auth')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new course' })
  @ApiBody({ type: CreateCourseDto })
  @ApiResponse({ status: 201, description: 'Course has been successfully created.', type: Course })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing token.' })
  create(@Body() createCourseDto: CreateCourseDto) {
    try {
      return this.courseService.create(createCourseDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create course: ' + error.message);
    }
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all active courses' })
  @ApiResponse({ status: 200, description: 'Return all active courses.', type: [Course] })
  findAll() {
    try {
      return this.courseService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch courses: ' + error.message);
    }
  }

  @Public()
  @Get('search')
  @ApiOperation({ summary: 'Search active courses by query string' })
  @ApiQuery({ name: 'query', description: 'Search query string' })
  @ApiResponse({ status: 200, description: 'Return matching courses.', type: [Course] })
  search(@Query('query') query: string) {
    try {
      return this.courseService.search(query);
    } catch (error) {
      throw new InternalServerErrorException('Failed to search courses: ' + error.message);
    }
  }

  @Public()
  @Get('level/:level')
  @ApiOperation({ summary: 'Get active courses by difficulty level' })
  @ApiParam({
    name: 'level',
    description: 'Course difficulty level',
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  })
  @ApiResponse({ status: 200, description: 'Return courses of specified level.', type: [Course] })
  findByLevel(@Param('level') level: string) {
    try {
      return this.courseService.findByLevel(level);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch courses: ' + error.message);
    }
  }

  @Public()
  @Get('course-categories')
  @ApiOperation({ summary: 'Get all course categories' })
  @ApiResponse({
    status: 200,
    description: 'Return all course categories.',
    type: [CourseCategory],
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findAllCourseCategories() {
    try {
      const categories = await this.courseService.getCourseCategories();
      return categories;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch course categories: ' + error.message);
    }
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific active course by ID' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiResponse({ status: 200, description: 'Return the course.', type: Course })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  findOne(@Param('id') id: string) {
    try {
      return this.courseService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch course: ' + error.message);
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a course' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiBody({ type: CreateCourseDto })
  @ApiResponse({ status: 200, description: 'Course has been successfully updated.', type: Course })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  update(@Param('id') id: string, @Body() updateCourseDto: Partial<CreateCourseDto>) {
    try {
      return this.courseService.update(id, updateCourseDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update course: ' + error.message);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a course' })
  @ApiParam({ name: 'id', description: 'Course ID' })
  @ApiResponse({ status: 200, description: 'Course has been successfully deleted.', type: Course })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  remove(@Param('id') id: string) {
    try {
      return this.courseService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete course: ' + error.message);
    }
  }

  @Post('course-categories')
  @ApiOperation({ summary: 'Create a new course category' })
  @ApiBody({ type: CourseCategoryDto })
  createCourseCategory(@Body() createCourseCategoryDto: CourseCategoryDto) {
    return this.courseService.createCourseCategory(createCourseCategoryDto);
  }

  @Patch('course-categories/:id')
  @ApiOperation({ summary: 'Update a course category' })
  @ApiParam({ name: 'id', description: 'Course category ID' })
  @ApiBody({ type: CourseCategoryDto })
  updateCourseCategory(
    @Param('id') id: string,
    @Body() updateCourseDto: Partial<CourseCategoryDto>,
  ) {
    try {
      return this.courseService.updateCourseCategory(id, updateCourseDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update course category: ' + error.message);
    }
  }

  @Delete('course-categories/:id')
  @ApiOperation({ summary: 'Delete a course category' })
  @ApiParam({ name: 'id', description: 'Course category ID' })
  deleteCourseCategory(@Param('id') id: string) {
    try {
      return this.courseService.deleteCourseCategory(id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete course category: ' + error.message);
    }
  }
}
