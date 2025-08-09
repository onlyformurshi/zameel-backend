import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './schemas/service.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Services')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new service' })
  @ApiResponse({
    status: 201,
    description: 'Service has been successfully created.',
    type: Service,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all services' })
  @ApiResponse({ status: 200, description: 'Return all active services.', type: [Service] })
  findAll() {
    return this.serviceService.findAll();
  }

  @Public()
  @Get('level/:level')
  @ApiOperation({ summary: 'Get services by level' })
  @ApiParam({
    name: 'level',
    description: 'Service level',
    enum: ['Foundation', 'Advanced', 'Professional', 'Specialized'],
  })
  @ApiResponse({ status: 200, description: 'Return services of specified level.', type: [Service] })
  findByLevel(@Param('level') level: string) {
    return this.serviceService.findByLevel(level);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific service' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse({ status: 200, description: 'Return the service.', type: Service })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a service' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse({
    status: 200,
    description: 'Service has been successfully updated.',
    type: Service,
  })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  update(@Param('id') id: string, @Body() updateServiceDto: Partial<CreateServiceDto>) {
    return this.serviceService.update(id, updateServiceDto);
  }

  @Patch(':id/reorder')
  @ApiOperation({ summary: 'Update the display order of a service' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse({
    status: 200,
    description: 'Service order has been successfully updated.',
    type: Service,
  })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  reorder(@Param('id') id: string, @Body('order') order: number) {
    return this.serviceService.reorder(id, order);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a service' })
  @ApiParam({ name: 'id', description: 'Service ID' })
  @ApiResponse({
    status: 200,
    description: 'Service has been successfully deleted.',
    type: Service,
  })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }
}
