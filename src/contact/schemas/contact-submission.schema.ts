import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactSubmissionDocument = ContactSubmission & Document;

@Schema({ timestamps: true })
export class ContactSubmission {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone: string;

  @Prop({ required: true })
  message: string;

  @Prop({ type: Object })
  response?: {
    message: string;
    respondedAt: Date;
    respondedBy: string;
  };

  @Prop({ default: 'pending', enum: ['pending', 'replied', 'archived'] })
  status: string;

  @Prop([String])
  tags?: string[];

  @Prop({
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  })
  priority: string;

  @Prop([
    {
      note: String,
      addedBy: String,
      addedAt: { type: Date, default: Date.now },
    },
  ])
  internalNotes?: {
    note: string;
    addedBy: string;
    addedAt: Date;
  }[];

  @Prop()
  assignedTo?: string;

  createdAt: Date;
  updatedAt: Date;
}

export const ContactSubmissionSchema = SchemaFactory.createForClass(ContactSubmission);
