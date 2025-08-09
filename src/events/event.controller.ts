import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './schemas/event.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Events')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({ status: 201, description: 'Event has been successfully created.', type: Event })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponse({ status: 200, description: 'Return all active events.', type: [Event] })
  findAll() {
    return this.eventService.findAll();
  }

  @Public()
  @Get('upcoming')
  @ApiOperation({ summary: 'Get all upcoming events' })
  @ApiResponse({ status: 200, description: 'Return all upcoming events.', type: [Event] })
  getUpcomingEvents() {
    return this.eventService.getUpcomingEvents();
  }

  @Public()
  @Get('past')
  @ApiOperation({ summary: 'Get all past events' })
  @ApiResponse({ status: 200, description: 'Return all past events.', type: [Event] })
  getPastEvents() {
    return this.eventService.getPastEvents();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific event by ID' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiResponse({ status: 200, description: 'Return the event.', type: Event })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific event' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiResponse({ status: 200, description: 'Event has been successfully updated.', type: Event })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  update(@Param('id') id: string, @Body() updateEventDto: Partial<CreateEventDto>) {
    console.log(updateEventDto, 'updateEventDto');
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific event' })
  @ApiParam({ name: 'id', description: 'Event ID' })
  @ApiResponse({ status: 200, description: 'Event has been successfully deleted.', type: Event })
  @ApiResponse({ status: 404, description: 'Event not found.' })
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
