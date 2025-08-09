import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FAQController } from './faq.controller';
import { FAQService } from './faq.service';
import { FAQ, FAQSchema } from './schemas/faq.schema';
import { FAQCategory, FAQCategorySchema } from './schemas/faq-category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FAQ.name, schema: FAQSchema },
      { name: FAQCategory.name, schema: FAQCategorySchema },
    ]),
  ],
  controllers: [FAQController],
  providers: [FAQService],
  exports: [FAQService],
})
export class FAQModule {}
