import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { ContactSubmission, ContactSubmissionSchema } from './schemas/contact-submission.schema';
import { ContactInfo, ContactInfoSchema } from './schemas/contact-info.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ContactSubmission.name, schema: ContactSubmissionSchema },
      { name: ContactInfo.name, schema: ContactInfoSchema },
    ]),
  ],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
