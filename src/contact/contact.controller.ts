import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { CreateContactSubmissionDto } from './dto/create-contact-submission.dto';
import { UpdateContactSubmissionDto } from './dto/update-contact-submission.dto';
import { CreateContactInfoDto } from './dto/create-contact-info.dto';
import { UpdateContactInfoDto } from './dto/update-contact-info.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { Public } from '../auth/decorators/public.decorator';
import { ContactInfo } from './schemas/contact-info.schema';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // Contact Info Endpoints
  @Post('info')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Create or update contact information',
    description: `Creates new contact info if none exists, or updates the existing one. 
    Only one contact info record can exist at a time.
    The contact info includes:
    - WhatsApp number
    - Address (with English and Arabic versions)
    - Phone (with English and Arabic versions)
    - Email (with English and Arabic versions)
    - Office Hours (with English and Arabic versions)
    Each section (except WhatsApp) contains label and value in both languages.`,
  })
  @ApiResponse({
    status: 201,
    description: 'Contact information has been successfully created or updated.',
    type: ContactInfo,
  })
  createOrUpdateInfo(@Body() createContactInfoDto: CreateContactInfoDto) {
    return this.contactService.createOrUpdateInfo(createContactInfoDto);
  }

  @Public()
  @Get('info')
  @ApiOperation({
    summary: 'Get contact information',
    description: `Retrieves the contact information including WhatsApp number and all bilingual sections 
    (address, phone, email, office hours) with their labels and values in both English and Arabic.`,
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the contact information.',
    type: ContactInfo,
  })
  getInfo() {
    return this.contactService.findInfo();
  }

  @Patch('info')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Update contact information',
    description: `Updates the existing contact information. Can update:
    - WhatsApp number
    - Address section (English/Arabic label and value)
    - Phone section (English/Arabic label and value)
    - Email section (English/Arabic label and value)
    - Office Hours section (English/Arabic label and value)
    All fields are optional - only provided fields will be updated.`,
  })
  @ApiResponse({
    status: 200,
    description: 'Contact information has been successfully updated.',
    type: ContactInfo,
  })
  updateInfo(@Body() updateContactInfoDto: UpdateContactInfoDto) {
    return this.contactService.updateInfo(updateContactInfoDto);
  }

  // Contact Submission Endpoints
  @Post('submit')
  @Public()
  @ApiOperation({ summary: 'Submit a contact form' })
  async submitContact(@Body() createContactDto: CreateContactSubmissionDto) {
    return this.contactService.create(createContactDto);
  }

  @Get('submissions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all contact submissions' })
  async getAllSubmissions(
    @Query('status') status?: string,
    @Query('priority') priority?: string,
    @Query('assignedTo') assignedTo?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('search') search?: string,
  ) {
    return this.contactService.findAll({
      status,
      priority,
      assignedTo,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      search,
    });
  }

  @Get('submissions/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get a specific contact submission' })
  async getSubmission(@Param('id') id: string) {
    return this.contactService.findById(id);
  }

  @Put('submissions/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update a contact submission' })
  async updateSubmission(
    @Param('id') id: string,
    @Body() updateData: UpdateContactSubmissionDto,
    @Req() req,
  ) {
    return this.contactService.update(id, updateData, req.user.id);
  }

  @Delete('submissions/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete a contact submission' })
  async deleteSubmission(@Param('id') id: string) {
    return this.contactService.delete(id);
  }

  @Get('submissions/stats/overview')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get contact submission statistics' })
  async getStats(@Query('startDate') startDate?: string, @Query('endDate') endDate?: string) {
    return this.contactService.getStats(
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }
}
