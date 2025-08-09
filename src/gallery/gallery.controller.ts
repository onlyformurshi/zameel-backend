import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { Gallery } from './schemas/gallery.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';
import { GalleryCategory } from './schemas/gallery-category';
import { CreateGalleryCategoryDto } from './dto/create-galler-category.dto';
import { memoryStorage } from 'multer';

@ApiTags('Gallery')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new gallery item' })
  @ApiResponse({
    status: 201,
    description: 'Gallery item has been successfully created.',
    type: Gallery,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  create(@Body() createGalleryDto: CreateGalleryDto, @UploadedFile() file: any) {
    try {
      if (!file) {
        throw new BadRequestException('Image is required');
      }
      return this.galleryService.create(createGalleryDto, file);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create gallery item');
    }
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all gallery items' })
  @ApiResponse({
    status: 200,
    description: 'Return all gallery items.',
    type: [Gallery],
  })
  findAll() {
    try {
      return this.galleryService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch gallery items');
    }
  }

  @Public()
  @Get('category')
  @ApiOperation({ summary: 'Get all gallery categories' })
  @ApiResponse({
    status: 200,
    description: 'Return all gallery categories.',
    type: [GalleryCategory],
  })
  getGalleryCategory() {
    try {
      return this.galleryService.getGalleryCategories();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch gallery categories');
    }
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific gallery item' })
  @ApiParam({ name: 'id', description: 'Gallery item ID' })
  @ApiResponse({ status: 200, description: 'Return the gallery item.', type: Gallery })
  @ApiResponse({ status: 404, description: 'Gallery item not found.' })
  findOne(@Param('id') id: string) {
    try {
      return this.galleryService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch gallery item');
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a gallery item' })
  @ApiParam({ name: 'id', description: 'Gallery item ID' })
  @ApiResponse({
    status: 200,
    description: 'Gallery item has been successfully updated.',
    type: Gallery,
  })
  @ApiResponse({ status: 404, description: 'Gallery item not found.' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateGalleryDto: Partial<CreateGalleryDto>,
    @UploadedFile() file: any,
  ) {
    try {
      return this.galleryService.update(id, updateGalleryDto, file);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update gallery item');
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a gallery item' })
  @ApiParam({ name: 'id', description: 'Gallery item ID' })
  @ApiResponse({
    status: 200,
    description: 'Gallery item has been successfully deleted.',
    type: Gallery,
  })
  @ApiResponse({ status: 404, description: 'Gallery item not found.' })
  remove(@Param('id') id: string) {
    try {
      return this.galleryService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete gallery item');
    }
  }

  @Delete('category/:id')
  @ApiOperation({ summary: 'Delete a gallery category' })
  @ApiParam({ name: 'id', description: 'Gallery category ID' })
  @ApiResponse({
    status: 200,
    description: 'Gallery category has been successfully deleted.',
    type: GalleryCategory,
  })
  deleteGalleryCategory(@Param('id') id: string) {
    try {
      return this.galleryService.deleteGalleryCategory(id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete gallery category');
    }
  }

  @Patch('category/:id')
  @ApiOperation({ summary: 'Update a gallery category' })
  @ApiParam({ name: 'id', description: 'Gallery category ID' })
  @ApiResponse({
    status: 200,
    description: 'Gallery category has been successfully updated.',
    type: GalleryCategory,
  })
  updateGalleryCategory(
    @Param('id') id: string,
    @Body() updateGalleryCategoryDto: Partial<CreateGalleryCategoryDto>,
  ) {
    try {
      return this.galleryService.updateGalleryCategory(id, updateGalleryCategoryDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update gallery category');
    }
  }

  @Post('category')
  @ApiOperation({ summary: 'Create a new gallery category' })
  @ApiResponse({
    status: 201,
    description: 'Gallery category has been successfully created.',
    type: GalleryCategory,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  createGalleryCategory(@Body() createGalleryCategoryDto: CreateGalleryCategoryDto) {
    try {
      return this.galleryService.createGalleryCategory(createGalleryCategoryDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create gallery category');
    }
  }
}
