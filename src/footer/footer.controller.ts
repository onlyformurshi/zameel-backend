import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { FooterService } from './footer.service';
import { CreateFooterDto } from './dto/create-footer.dto';
import { Footer } from './schemas/footer.schema';
import { CreateSocialLinkDto } from './dto/create-social-link.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('Footer')
@ApiBearerAuth('JWT-auth')
@Controller('footer')
export class FooterController {
  constructor(private readonly footerService: FooterService) {}

  // Basic Footer Content Operations
  @Post()
  @ApiOperation({
    summary: 'Create or update footer description',
    description:
      'Creates a new footer if none exists, or updates the existing one. Only one footer can exist at a time.',
  })
  @ApiResponse({
    status: 201,
    description: 'Footer has been successfully created or updated.',
    type: Footer,
  })
  @ApiBody({ type: CreateFooterDto })
  createFooter(@Body() createFooterDto: CreateFooterDto) {
    return this.footerService.createFooter(createFooterDto);
  }

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Get footer content',
    description:
      'Retrieves the single footer instance with all its content including social links.',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the footer content.',
    type: Footer,
  })
  getFooter() {
    return this.footerService.getFooter();
  }

  @Patch('description')
  @ApiOperation({
    summary: 'Update footer descriptions',
    description: 'Updates either English or Arabic description, or both. Fields are optional.',
  })
  @ApiResponse({
    status: 200,
    description: 'Footer descriptions updated successfully.',
    type: Footer,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        description: {
          type: 'string',
          example: 'Zameel Academy is a leading educational institution...',
          description: 'English description',
        },
        arabicDescription: {
          type: 'string',
          example: 'أكاديمية زميل هي مؤسسة تعليمية رائدة...',
          description: 'Arabic description',
        },
      },
    },
  })
  updateDescription(@Body() updateDesc: { description?: string; arabicDescription?: string }) {
    return this.footerService.updateDescription(updateDesc);
  }

  // Social Links Operations
  @Post('social-links')
  @ApiOperation({
    summary: 'Add a social link',
    description: 'Adds a new social media link to the footer.',
  })
  @ApiResponse({
    status: 201,
    description: 'Social link added successfully.',
    type: Footer,
  })
  @ApiBody({ type: CreateSocialLinkDto })
  addSocialLink(@Body() socialLink: CreateSocialLinkDto) {
    return this.footerService.addSocialLink(socialLink);
  }

  @Get('social-links')
  @ApiOperation({
    summary: 'Get all social links',
    description: 'Retrieves all social media links from the footer.',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns array of social links.',
    type: [CreateSocialLinkDto],
  })
  getSocialLinks() {
    return this.footerService.getSocialLinks();
  }

  @Patch('social-links/:linkId')
  @ApiOperation({
    summary: 'Update a social link',
    description: 'Updates an existing social media link by its ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Social link updated successfully.',
    type: Footer,
  })
  @ApiBody({
    type: CreateSocialLinkDto,
    description: 'Fields are optional. Only provided fields will be updated.',
  })
  updateSocialLink(
    @Param('linkId') linkId: string,
    @Body() updateData: Partial<CreateSocialLinkDto>,
  ) {
    return this.footerService.updateSocialLink(linkId, updateData);
  }

  @Delete('social-links/:linkId')
  @ApiOperation({
    summary: 'Delete a social link',
    description: 'Removes a social media link from the footer by its ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Social link deleted successfully.',
    type: Footer,
  })
  deleteSocialLink(@Param('linkId') linkId: string) {
    return this.footerService.deleteSocialLink(linkId);
  }
}
