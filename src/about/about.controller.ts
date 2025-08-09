import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AboutService } from './about.service';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('About')
@ApiBearerAuth('JWT-auth')
@Controller('aboutus')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Post()
  @ApiOperation({
    summary: 'Create or update about us content',
    description: 'Creates or updates the about us content. Only one entry is maintained.',
  })
  @ApiResponse({
    status: 200,
    description: 'About us content has been successfully created or updated.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'About Zameel Academy' },
        description: { type: 'string', example: 'Leading educational institution...' },
        stats: {
          type: 'object',
          properties: {
            studentsEnrolled: { type: 'number', example: 1000 },
            successRate: { type: 'number', example: 95 },
            expertEducators: { type: 'number', example: 50 },
            yearsOfExcellence: { type: 'number', example: 10 },
          },
        },
        mission: { type: 'string', example: 'Our mission is to...' },
        vision: { type: 'string', example: 'Our vision is to become...' },
      },
    },
  })
  async upsertAbout(
    @Body()
    aboutData: {
      title: string;
      description: string;
      stats: {
        studentsEnrolled: number;
        successRate: number;
        expertEducators: number;
        yearsOfExcellence: number;
      };
      mission: string;
      vision: string;
    },
  ) {
    return this.aboutService.upsert(aboutData);
  }

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Get about us content',
    description: 'Retrieves the about us content.',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the about us content.',
  })
  async getAbout() {
    console.log('getAbout');
    return this.aboutService.find();
  }
}
