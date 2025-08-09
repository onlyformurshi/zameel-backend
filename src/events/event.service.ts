import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<EventDocument>) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = new this.eventModel({
      ...createEventDto,
      eventImages: createEventDto.eventImages || [],
    });
    return createdEvent.save();
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id).exec();
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }

  async update(id: string, updateEventDto: Partial<CreateEventDto>): Promise<Event> {
    const updateData = {
      ...updateEventDto,
      eventImages: updateEventDto.eventImages || [],
    };

    const updatedEvent = await this.eventModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!updatedEvent) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return updatedEvent;
  }

  async remove(id: string): Promise<Event> {
    const deletedEvent = await this.eventModel.findByIdAndDelete(id).exec();
    if (!deletedEvent) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return deletedEvent;
  }

  async getUpcomingEvents(): Promise<Event[]> {
    const today = new Date();
    return this.eventModel
      .find({
        date: { $gte: today.toISOString().split('T')[0] },
      })
      .sort({ date: 1 })
      .exec();
  }

  async getPastEvents(): Promise<Event[]> {
    const today = new Date();
    return this.eventModel
      .find({
        date: { $lt: today.toISOString().split('T')[0] },
      })
      .sort({ date: -1 })
      .exec();
  }
}
