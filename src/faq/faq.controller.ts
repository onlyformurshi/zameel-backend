import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Logger,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FAQService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { CreateFaqCategoryDto } from './dto/create-faq-category.dto';
import { FAQ } from './schemas/faq.schema';
import { FAQCategory } from './schemas/faq-category.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('FAQ')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('faq')
export class FAQController {
  private readonly logger = new Logger(FAQController.name);

  constructor(private readonly faqService: FAQService) {}

  // Category Endpoints (Moving these before FAQ endpoints)
  @Public()
  @Get('categories')
  @ApiOperation({ summary: 'Get all FAQ categories' })
  @ApiResponse({ status: 200, description: 'Return all FAQ categories.', type: [FAQCategory] })
  async findAllCategories() {
    this.logger.log('Received request for findAllCategories');
    try {
      const categories = await this.faqService.findAllCategories();
      this.logger.log(`Found ${categories.length} categories`);
      return categories;
    } catch (error) {
      this.logger.error('Error in findAllCategories:', error);
      throw error;
    }
  }

  @Post('categories')
  @ApiOperation({ summary: 'Create a new FAQ category' })
  @ApiResponse({
    status: 201,
    description: 'Category has been successfully created.',
    type: FAQCategory,
  })
  async createCategory(@Body() createCategoryDto: CreateFaqCategoryDto) {
    return this.faqService.createCategory(createCategoryDto);
  }

  @Patch('categories/:id')
  @ApiOperation({ summary: 'Update FAQ category' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: Partial<CreateFaqCategoryDto>,
  ) {
    return this.faqService.updateCategory(id, updateCategoryDto);
  }

  @Delete('categories/:id')
  @ApiOperation({ summary: 'Delete FAQ category' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  async removeCategory(@Param('id') id: string) {
    return this.faqService.removeCategory(id);
  }

  // FAQ Endpoints
  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all FAQs' })
  @ApiResponse({ status: 200, description: 'Return all active FAQs.', type: [FAQ] })
  async findAll() {
    this.logger.log('Received request for findAll FAQs');
    return this.faqService.findAll();
  }

  @Public()
  @Get('search')
  @ApiOperation({ summary: 'Search FAQs' })
  @ApiQuery({ name: 'query', description: 'Search query' })
  async search(@Query('query') query: string) {
    return this.faqService.search(query);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new FAQ' })
  @ApiResponse({ status: 201, description: 'FAQ has been successfully created.', type: FAQ })
  async create(@Body() createFaqDto: CreateFaqDto) {
    return this.faqService.create(createFaqDto);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get FAQ by ID' })
  @ApiParam({ name: 'id', description: 'FAQ ID' })
  async findOne(@Param('id') id: string) {
    return this.faqService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update FAQ' })
  @ApiParam({ name: 'id', description: 'FAQ ID' })
  async update(@Param('id') id: string, @Body() updateFaqDto: Partial<CreateFaqDto>) {
    return this.faqService.update(id, updateFaqDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete FAQ' })
  @ApiParam({ name: 'id', description: 'FAQ ID' })
  async remove(@Param('id') id: string) {
    return this.faqService.remove(id);
  }

  @Patch(':id/reorder')
  @ApiOperation({ summary: 'Update FAQ order' })
  @ApiParam({ name: 'id', description: 'FAQ ID' })
  async updateOrder(@Param('id') id: string, @Body('order') order: number) {
    return this.faqService.updateOrder(id, order);
  }

  // Bulk Operations
  @Post('bulk-delete')
  @ApiOperation({ summary: 'Bulk delete FAQs' })
  async bulkDelete(@Body('ids') ids: string[]) {
    return this.faqService.bulkDelete(ids);
  }

  @Post('bulk-status-update')
  @ApiOperation({ summary: 'Bulk update FAQ status' })
  async bulkUpdateStatus(@Body('ids') ids: string[], @Body('isActive') isActive: boolean) {
    return this.faqService.bulkUpdateStatus(ids, isActive);
  }
}
