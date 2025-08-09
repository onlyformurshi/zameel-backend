import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { FacultyService } from './faculty.service';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { Public } from '../auth/decorators/public.decorator';
import { Faculty } from './schemas/faculty.schema';

@ApiTags('Faculty')
@Controller('faculty')
@ApiBearerAuth('JWT-auth')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a new faculty member' })
  @ApiBody({ type: CreateFacultyDto })
  @ApiResponse({
    status: 201,
    description: 'Faculty member has been successfully created.',
    type: Faculty,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires admin role.' })
  async create(@Body() createFacultyDto: CreateFacultyDto) {
    try {
      return this.facultyService.create(createFacultyDto);
    } catch (error) {
      console.error('Error creating faculty member:', error);
      throw new Error('Failed to create faculty member');
    }
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all faculty members' })
  @ApiQuery({
    name: 'department',
    required: false,
    description: 'Filter faculty by department',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search faculty by name, position, or department',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns all faculty members.',
    type: [Faculty],
  })
  async findAll(@Query('department') department?: string, @Query('search') search?: string) {
    try {
      return this.facultyService.findAll({
        department,
        search,
      });
    } catch (error) {
      console.error('Error fetching faculty members:', error);
      throw new Error('Failed to fetch faculty members');
    }
  }

  @Public()
  @Get('search')
  @ApiOperation({ summary: 'Search faculty members' })
  @ApiQuery({
    name: 'query',
    required: true,
    description: 'Search query string',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns matching faculty members.',
    type: [Faculty],
  })
  async search(@Query('query') query: string) {
    try {
      return this.facultyService.searchFaculty(query);
    } catch (error) {
      console.error('Error searching faculty members:', error);
      throw new Error('Failed to search faculty members');
    }
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific faculty member' })
  @ApiParam({
    name: 'id',
    description: 'Faculty member ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the faculty member.',
    type: Faculty,
  })
  @ApiResponse({ status: 404, description: 'Faculty member not found.' })
  async findOne(@Param('id') id: string) {
    try {
      return this.facultyService.findById(id);
    } catch (error) {
      console.error('Error fetching faculty member:', error);
      throw new Error('Failed to fetch faculty member');
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update a faculty member' })
  @ApiParam({
    name: 'id',
    description: 'Faculty member ID',
  })
  @ApiBody({ type: UpdateFacultyDto })
  @ApiResponse({
    status: 200,
    description: 'Faculty member has been successfully updated.',
    type: Faculty,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires admin role.' })
  @ApiResponse({ status: 404, description: 'Faculty member not found.' })
  async update(@Param('id') id: string, @Body() updateFacultyDto: UpdateFacultyDto) {
    try {
      return this.facultyService.update(id, updateFacultyDto);
    } catch (error) {
      console.error('Error updating faculty member:', error);
      throw new Error('Failed to update faculty member');
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a faculty member' })
  @ApiParam({
    name: 'id',
    description: 'Faculty member ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Faculty member has been successfully deleted.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden - Requires admin role.' })
  @ApiResponse({ status: 404, description: 'Faculty member not found.' })
  async remove(@Param('id') id: string) {
    try {
      return this.facultyService.remove(id);
    } catch (error) {
      console.error('Error deleting faculty member:', error);
      throw new Error('Failed to delete faculty member');
    }
  }
}
