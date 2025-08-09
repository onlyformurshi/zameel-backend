import { Controller, Get, Post, Patch, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { HomepageService } from './homepage.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateHeroSectionDto, UpdateHeroSectionDto } from './dto/hero-section.dto';
import { CreateWhyChooseUsDto, UpdateWhyChooseUsDto } from './dto/why-choose-us.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Admin Homepage')
@ApiBearerAuth('JWT-auth')
@Controller('admin')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class HomepageController {
  constructor(private readonly homepageService: HomepageService) {}

  @Public()
  @Get('home')
  @ApiOperation({ summary: 'Get all homepage sections data' })
  @ApiResponse({
    status: 200,
    description: 'Returns the hero section, why choose us section, and programs section data',
  })
  getHomeSections() {
    console.log('reacing here');
    return this.homepageService.getHomePageData();
  }

  // Hero Section endpoints
  @Post('hero-section')
  @ApiOperation({
    summary: 'Create a new hero section',
    description: 'Creates a new hero section and deletes any existing ones. Requires JWT token.',
  })
  @ApiResponse({
    status: 201,
    description: 'The hero section has been successfully created',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - JWT token is missing or invalid',
  })
  createHeroSection(@Body() createHeroSectionDto: CreateHeroSectionDto) {
    return this.homepageService.createHeroSection(createHeroSectionDto);
  }

  @Patch('hero-section/:id')
  @ApiOperation({
    summary: 'Update a hero section',
    description: 'Updates the hero section. Requires JWT token.',
  })
  @ApiResponse({
    status: 200,
    description: 'The hero section has been successfully updated',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - JWT token is missing or invalid',
  })
  updateHeroSection(@Param('id') id: string, @Body() updateHeroSectionDto: UpdateHeroSectionDto) {
    return this.homepageService.updateHeroSection(id, updateHeroSectionDto);
  }

  // Why Choose Us endpoints
  @Post('why-choose-us')
  @ApiOperation({
    summary: 'Create a new why choose us item',
    description: 'Creates a new why choose us item. Requires JWT token.',
  })
  @ApiResponse({
    status: 201,
    description: 'The why choose us item has been successfully created',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - JWT token is missing or invalid',
  })
  createWhyChooseUs(@Body() createWhyChooseUsDto: CreateWhyChooseUsDto) {
    return this.homepageService.createWhyChooseUs(createWhyChooseUsDto);
  }

  @Patch('why-choose-us/:id')
  @ApiOperation({
    summary: 'Update a why choose us item',
    description: 'Updates a why choose us item. Requires JWT token.',
  })
  @ApiResponse({
    status: 200,
    description: 'The why choose us item has been successfully updated',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - JWT token is missing or invalid',
  })
  updateWhyChooseUs(@Param('id') id: string, @Body() updateWhyChooseUsDto: UpdateWhyChooseUsDto) {
    return this.homepageService.updateWhyChooseUs(id, updateWhyChooseUsDto);
  }

  @Delete('why-choose-us/:id')
  @ApiOperation({
    summary: 'Soft delete a why choose us item',
    description: 'Deactivates a why choose us item. Requires JWT token.',
  })
  @ApiResponse({
    status: 200,
    description: 'The why choose us item has been successfully deactivated',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - JWT token is missing or invalid',
  })
  deleteWhyChooseUs(@Param('id') id: string) {
    return this.homepageService.deleteWhyChooseUs(id);
  }
}
